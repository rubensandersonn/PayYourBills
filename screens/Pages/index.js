import React, { Component, useCallback } from "react";

import { View, Image } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Icon from "react-native-vector-icons/FontAwesome";

import {
  actionAddPage,
  actionDeletePage,
  actionUpdatePage,
  actionUpdateAllPages
} from "../../store/pages";

import { Card, DeleteButton, ScrollList } from "./style";
import {
  setLocalStorageData,
  LocalTypeKeys,
  getLocalStorageData
} from "../../utils/LocalStorageHandler";
import { toast } from "../../utils/functions";
import Popup from "../../components/Popup";
import {
  TitlePopup,
  TextInputName,
  WrapperList,
  TitlePage
} from "../Home/styles";
import { RoundButton, TextWhite } from "../../utils/styled";

import Page from "../../components/Page";
import { white } from "../../utils/colors";

class Pages extends Component {
  constructor(props) {
    super(props);
  }

  state = { visiblePopupAdd: false, pageHolder: {} };

  componentWillMount() {
    const ls_key_pages = LocalTypeKeys.PAGES;
    getLocalStorageData(ls_key_pages)
      .then(Pages => {
        this.props.actionUpdateAllPages(Pages);
      })
      .catch(error => {});
  }

  /**
   * muda para a página de Bills (unica)
   */
  changePage = pageId => {
    this.props.navigation.navigate("Bills", { pageId: pageId });
  };

  /**
   * limpa o holder do state
   */
  clearPageHolder = () => {
    this.setState(state => ({
      ...state,
      billHolder: { title: "", id: -1 }
    }));
  };

  /**
   * Função que calcula o total das contas de uma conta
   */
  calcTotalBills = pageId => {
    // get page / bills from local storage
    const ls_key_money = LocalTypeKeys.BILLS + "/" + pageId;
    getLocalStorageData(ls_key_money)
      .then(bills => {
        let total = 0;
        if (bills) {
          bills.forEach(el => {
            total = total + el.bill;
          });
        }
        return total;
      })
      .catch(error => {
        console.log("contas vazias", error);
        return 0;
      });
  };

  /**
   * Função que calcula o saldo da página
   */
  calcSaldo = pageId => {
    // get page / money from localStorage
    const ls_key_money = LocalTypeKeys.MONEY + "/" + pageId;

    getLocalStorageData(ls_key_money)
      .then(money => {
        const total = this.calcTotalBills(pageId);
        return money - total;
      })
      .catch(error => {
        console.log("dinheiro vazio", error);
        return 0;
      });
  };

  /**
   * Função que deleta a página do contexto e do local storage
   */
  deletePage = pageId => {
    const { actionDeletePage, pages } = this.props;
    // delete page / bills from localStorage
    const ls_key_pages = LocalTypeKeys.PAGES;
    const ls_key_money = LocalTypeKeys.MONEY + "/" + pageId;
    const ls_key_bills = LocalTypeKeys.BILLS + "/" + pageId;

    // apagando pagina
    actionDeletePage(pageId);

    // *** APAGANDO PAGINA no localStorage***
    setLocalStorageData(ls_key_pages, pages).then(res => {
      console.log("Página apagada");
      toast("Página apagada");
    });

    // apagando dinheiro
    setLocalStorageData(ls_key_money, null).then(res => {
      console.log("dinheiro apagado");
    });

    // apagando contas
    setLocalStorageData(ls_key_bills, null).then(res => {
      console.log("contas apagadas");
    });
  };

  /**
   * Função que adiciona a página ao contexto e ao localStorage
   */
  addPage = () => {
    //validate bill
    const { pageHolder } = this.state;

    if (pageHolder.title && pageHolder.title !== "") {
      const { pages, actionAddPage } = this.props;
      const ls_key_pages = LocalTypeKeys.PAGES;

      setLocalStorageData(ls_key_pages, pages)
        .then(res => {
          actionAddPage({
            title: pageHolder.title,
            id: pages && pages.length !== 0 ? pages[pages.length - 1].id + 1 : 0
          });
        })
        .then(res => {
          this.clearPageHolder();
          this.changePage();
        })
        .catch(err => {
          toast("erro ao salvar a nova conta", err);
        });
    } else {
      toast("(o`´o) AM I JOKE TO YOU?");
    }

    this.setState(state => ({ ...state, visiblePopupAdd: false }));
  };

  /**
   * Função do conteudo do pop-up
   */
  ContentPopup = () =>
    useCallback(
      <View behavior="padding">
        <TitlePopup>Nome para a página:</TitlePopup>
        <TextInputName
          onChangeText={text => {
            this.setState(state => ({
              ...state,
              pageHolder: { ...state.pageHolder, title: text }
            }));
          }}
          value={this.state.pageHolder.title}
          autoFocus
        />
      </View>,
      [this.state.pageHolder]
    );

  render() {
    const { pages } = this.props;

    return (
      <View>
        <TitlePage>Páginas</TitlePage>
        <RoundButton
          style={{ position: "absolute", right: 10 }}
          onPress={() => {
            this.setState({ visiblePopupAdd: true });
          }}
        >
          <TextWhite>+</TextWhite>
        </RoundButton>

        <ScrollList>
          {pages &&
            pages.map((page, index) => {
              return (
                <Card key={index}>
                  <DeleteButton
                    onPress={() => {
                      this.deletePage(page.id);
                    }}
                  >
                    <Icon name="trash" size={12} color={white} />
                  </DeleteButton>
                  <Page
                    title={page.title}
                    totalBills={this.calcTotalBills(page.id)}
                    saldo={this.calcSaldo(page.id)}
                  />
                </Card>
              );
            })}
        </ScrollList>
        <Popup
          visible={this.state.visiblePopupAdd}
          onCancel={() => {
            this.setState(state => ({ ...state, visiblePopupAdd: false }));
          }}
          onConfirm={this.addPage}
          Content={this.ContentPopup}
        />
      </View>
    );
  }
}

Pages.navigationOptions = {
  headerTitle: <Titulo />
};

function Titulo() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
        marginBottom: 10
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/images/pig.png")}
          style={{ marginTop: 10, marginHorizontal: 10, resizeMode: "contain" }}
        />
        <TitlePage>PAY YOUR BILLS</TitlePage>
      </View>
    </View>
  );
}

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     { actionUpdateAllPages, actionAddPage, actionDeletePage },
//     dispatch
//   );

const mapDispatchToProps = {
  actionUpdateAllPages,
  actionAddPage,
  actionDeletePage,
  actionUpdatePage
};

const mapStateToProps = state => ({
  pages: state.pagesState
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pages);
