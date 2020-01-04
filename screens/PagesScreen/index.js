import React, { Component, useCallback } from "react";

import { View, Image, ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import Icon from "react-native-vector-icons/FontAwesome";

import {
  actionAddPage,
  actionDeletePage,
  actionUpdatePage,
  actionUpdateAllPages
} from "../../store/pages";

import { WrapperPage, WrapperRow } from "./style";
import {
  setLocalStorageData,
  LocalTypeKeys,
  getLocalStorageData
} from "../../utils/LocalStorageHandler";
import { toast } from "../../utils/functions";
import Popup from "../../components/Popup";
import { TitlePopup, TextInputName, TitlePage } from "../BillsScreen/styles";

import { white } from "../../utils/colors";
import AddButton from "../../components/AddButton";
// import FadeInView from "../../components/FadeInView";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Subtitle } from "../../components/Page/style";
import PageList from "../../components/Page/PageList";

/**
 * pages: [int]
 */

class PagesScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    visiblePopupAdd: false,
    visiblePopupUpdate: false,
    visiblePopupDelete: false,
    pageHolder: {},
    isLoaded: false,
    isLoadingComplete: false,
    _menu: null
  };

  /**
   * Muda para a página de Bills (unica)
   */
  changePage = (pageTitle, pageId) => {
    this.props.navigation.navigate("Bills", {
      pageTitle: pageTitle,
      pageId: pageId
    });
  };

  /**
   * Limpa o holder do state
   */
  clearPageHolder = () => {
    this.setState(state => ({
      ...state,
      pageHolder: { title: "", id: -1 }
    }));
  };

  /**
   * Calcula o total das contas de uma conta
   */
  calcTotalBills = bills => {
    // get page / bills from local storage
    let total = 0;
    if (bills) {
      bills.forEach(el => {
        total = total + el.bill;
      });
    }
    return total;
  };

  /**
   * Deleta a página do contexto e do local storage
   */
  deletePage = async pageId => {
    const { actionDeletePage, pages } = this.props;
    // delete page / bills from localStorage
    const ls_key_pages = LocalTypeKeys.PAGES;
    const ls_key_money = LocalTypeKeys.MONEY + "/" + pageId;
    const ls_key_bills = LocalTypeKeys.BILLS + "/" + pageId;

    // apagando pagina
    await actionDeletePage(pageId);

    // *** APAGANDO PAGINA no localStorage***
    setLocalStorageData(ls_key_pages, this.props.pages).then(() => {
      this.clearPageHolder();
      console.log("Página apagada");
      toast("Página apagada");
      // apagando dinheiro
      setLocalStorageData(ls_key_money, null).then(() => {
        console.log("dinheiro apagado");
        // apagando contas
        setLocalStorageData(ls_key_bills, null).then(() => {
          console.log("contas apagadas");
        });
      });
    });
  };

  // === crud ===

  /**
   * Função que atualiza a página ao contexto e ao localStorage
   */
  updatePage = async () => {
    const ls_key_pages = LocalTypeKeys.PAGES;
    const { pageHolder } = this.state;

    await this.props.actionUpdatePage(
      { ...pageHolder, title: pageHolder.title },
      pageHolder.id
    );

    setLocalStorageData(ls_key_pages, this.props.pages).then(() => {
      this.clearPageHolder();
      console.log("Página Atualizada");
      toast("Página Atualizada");
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
        .then(() => {
          setLocalStorageData(ls_key_money + "/" + pageId, 0);
        })
        .then(() => {
          setLocalStorageData(ls_key_bills + "/" + pageId, []);
        })
        .then(() => {
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
    this.clearPageHolder();
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
    const {
      isLoadingComplete,
      visiblePopupDelete,
      visiblePopupUpdate,
      visiblePopupAdd
    } = this.state;

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
              <PageList
                side={"left"}
                pages={pages}
                filter={index => index % 2 !== 0}
                updateCallback={page => {
                  this.setState({ pageHolder: page, visiblePopupUpdate: true });
                }}
                deleteCallback={page => {
                  this.setState({ pageHolder: page, visiblePopupDelete: true });
                }}
                changePage={this.changePage}
              />

              <PageList
                side={"right"}
                pages={pages}
                filter={index => index % 2 === 0}
                updateCallback={page => {
                  this.setState({ pageHolder: page, visiblePopupUpdate: true });
                }}
                deleteCallback={page => {
                  this.setState({ pageHolder: page, visiblePopupDelete: true });
                }}
                changePage={this.changePage}
              />
            </WrapperRow>

            {/* popup nome pagina */}
            <Popup
              visible={visiblePopupAdd || visiblePopupUpdate}
              onCancel={() => {
                this.setState(state => ({
                  ...state,
                  visiblePopupAdd: false,
                  visiblePopupUpdate: false
                }));
              }}
              onConfirm={() => {
                visiblePopupAdd
                  ? this.addPage()
                  : visiblePopupUpdate
                  ? this.updatePage()
                  : null;
                this.clearPageHolder();
                this.setState({
                  visiblePopupAdd: false,
                  visiblePopupUpdate: false
                });
              }}
              Content={this.ContentPopup}
            />

            {/* popup confirm */}
            <Popup
              visible={visiblePopupDelete}
              onCancel={() => {
                this.setState({
                  visiblePopupDelete: false
                });
              }}
              onConfirm={async () => {
                await this.deletePage(this.state.pageHolder.id);
                this.setState({
                  visiblePopupDelete: false,
                  pageHolder: { id: -1 }
                });
                toast("Página apagada!");
              }}
              Content={() => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Subtitle>Tens Certeza?</Subtitle>
                </View>
              )}
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
