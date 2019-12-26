import React, { Component, useCallback } from "react";

import { View, Image, ActivityIndicator } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Icon from "react-native-vector-icons/FontAwesome";

import {
  actionAddPage,
  actionDeletePage,
  actionUpdatePage,
  actionUpdateAllPages
} from "../../store/pages";

import {
  Card,
  DeleteButton,
  WrapperPage,
  ScrollList,
  WrapperRow
} from "./style";
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
} from "../BillsScreen/styles";
import { RoundButton, TextWhite } from "../../utils/styled";

import Page from "../../components/Page";
import { white, secondary } from "../../utils/colors";
import AddButton from "../../components/AddButton";
import FadeInView from "../../components/FadeInView";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

/**
 * pages: [int]
 */

class PagesScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    visiblePopupAdd: false,
    pageHolder: {},
    isLoaded: false,
    isLoadingComplete: false
  };

  /**
   * muda para a página de Bills (unica)
   */
  changePage = (pageTitle, pageId) => {
    this.props.navigation.navigate("Bills", {
      pageTitle: pageTitle,
      pageId: pageId
    });
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
  calcTotalBills = bills => {
    // get page / bills from local storage
    let total = 0;
    if (bills) {
      bills.forEach(el => {
        total = total + el.bill;
      });
    }
    // console.log("há contas para somar", bills, total);
    return total;
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
    this.props.actionDeletePage(pageId);

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
    const ls_key_pages = LocalTypeKeys.PAGES;
    const ls_key_money = LocalTypeKeys.MONEY;
    const ls_key_bills = LocalTypeKeys.BILLS;

    if (pageHolder.title && pageHolder.title !== "") {
      const { pages, actionAddPage } = this.props;
      const pageId =
        pages && pages.length !== 0 ? pages[pages.length - 1].id + 1 : 0;

      const newPage = {
        title: pageHolder.title,
        id: pageId
      };

      var newPages = pages ? pages : [];
      newPages.push(newPage);

      //console.log("PAGINAS:", pages, newPages);

      setLocalStorageData(ls_key_pages, newPages)
        .then(res => {
          setLocalStorageData(ls_key_money + "/" + pageId, 0);
        })
        .then(res => {
          setLocalStorageData(ls_key_bills + "/" + pageId, []);
        })
        .then(res => {
          this.clearPageHolder();
          this.changePage(newPage.title, pageId);
        })
        .catch(err => {
          console.log("erro ao salvar a nova conta", err);
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
      <View>
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

  // loading async

  loadResourcesAsync = async () => {
    const ls_key_pages = LocalTypeKeys.PAGES;

    await Promise.all([
      Asset.loadAsync([require("../../assets/images/pig.png")]),
      <Icon name="trash" size={12} color={white} />,
      getLocalStorageData(ls_key_pages)
        .then(Pages => {
          // setting the pages to the store
          this.props.actionUpdateAllPages(Pages);

          // getting the bills and money from each page to calculate the total and left
          Pages.forEach(page => {
            const ls_key_bills = LocalTypeKeys.BILLS + "/" + page.id;
            const ls_key_money = LocalTypeKeys.MONEY + "/" + page.id;
            getLocalStorageData(ls_key_bills).then(bills => {
              getLocalStorageData(ls_key_money).then(money => {
                let newPage = page;
                newPage.totalBill = this.calcTotalBills(bills);
                newPage.saldo = money - newPage.totalBill;
                actionUpdatePage(newPage, page.id);
                this.setState({ isLoaded: true });
              });
            });
          });
        })

        .catch(error => {
          console.log("! erro ao iniciar:", error);
        })
    ]);
  };

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { pages } = this.props;
    const { isLoadingComplete } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    } else {
      return (
        <>
          <WrapperPage>
            <WrapperRow>
              <ScrollList index="left">
                {pages &&
                  pages.map(
                    (page, index) =>
                      index % 2 == 0 && (
                        <Card
                          key={index}
                          onPress={() => {
                            this.changePage(page.title, page.id);
                          }}
                        >
                          <DeleteButton
                            onPress={() => {
                              this.deletePage(page.id);
                            }}
                          >
                            <Icon name="trash" size={12} color={white} />
                          </DeleteButton>
                          <Page
                            title={page.title}
                            totalBill={parseFloat(
                              page.totalBill ? page.totalBill : 0
                            ).toFixed(2)}
                            saldo={parseFloat(
                              page.saldo ? page.saldo : 0
                            ).toFixed(2)}
                          />
                        </Card>
                      )
                  )}
              </ScrollList>
              <ScrollList index="right">
                {pages &&
                  pages.map(
                    (page, index) =>
                      index % 2 != 0 && (
                        <Card
                          key={index}
                          onPress={() => {
                            this.changePage(page.title, page.id);
                          }}
                        >
                          <DeleteButton
                            onPress={() => {
                              this.deletePage(page.id);
                            }}
                          >
                            <Icon name="trash" size={12} color={white} />
                          </DeleteButton>
                          <Page
                            title={page.title}
                            totalBill={parseFloat(
                              page.totalBill ? page.totalBill : 0
                            ).toFixed(2)}
                            saldo={parseFloat(
                              page.saldo ? page.saldo : 0
                            ).toFixed(2)}
                          />
                        </Card>
                      )
                  )}
              </ScrollList>
            </WrapperRow>
            <Popup
              visible={this.state.visiblePopupAdd}
              onCancel={() => {
                this.setState(state => ({ ...state, visiblePopupAdd: false }));
              }}
              onConfirm={this.addPage}
              Content={this.ContentPopup}
            />
          </WrapperPage>
          <AddButton
            onPress={() => {
              this.setState({ visiblePopupAdd: true });
            }}
          />
        </>
      );
    }
  }
}

PagesScreen.navigationOptions = {
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
        padding: 1
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

const mapDispatchToProps = {
  actionUpdateAllPages,
  actionAddPage,
  actionDeletePage,
  actionUpdatePage
};

const mapStateToProps = state => ({
  pages: state.pagesState
});

export default connect(mapStateToProps, mapDispatchToProps)(PagesScreen);
