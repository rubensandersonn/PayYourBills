import {
  Wrapper,
  Title,
  TitlePage,
  WrapperList,
  EditMoneyButton,
  TextAddButton,
  TextInputName,
  TextInputValue,
  SaveButton,
  TitlePopup,
  RText,
  Total,
  PinkTitle
} from "./styles";

import Icon from "react-native-vector-icons/FontAwesome";

import React, { Component, useCallback } from "react";

import { View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  actionAddBill,
  actionDeleteBill,
  actionUpdateBill,
  actionUpdateAllBills
} from "../../store/bills";

import AddButton from "../../components/AddButton";

import Popup from "../../components/Popup";
import Conta from "../../components/BillsHandler/Conta";
import { RoundButton } from "../../utils/styled";
import { danger, white, gray } from "../../utils/colors";
import {
  getLocalStorageData,
  setLocalStorageData,
  LocalTypeKeys
} from "../../utils/LocalStorageHandler";
import { toast } from "../../utils/functions";

const { MONEY, BILLS } = LocalTypeKeys;

class BillsScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    money: 0,
    pageId: 0,
    pageTitle: "",
    showFormBill: false,
    visiblePopup: false,
    visiblePopupMoney: false,
    billHolder: {
      title: "",
      bill: 0,
      paid: false
    }
  };

  saveData = () => {
    const { bills } = this.props;
    const { pageId } = this.state;
    // saving bills
    setLocalStorageData(BILLS + "/" + pageId, bills)
      .then(res => {
        toast("Contas salvas!");
      })
      .catch(error => {
        toast("Erro ao salvar as contas.");
      });
    // saving money
    setLocalStorageData(MONEY + "/" + pageId, this.state.money)
      .then(res => {
        toast("Dinheiro salvo!");
      })
      .catch(error => {
        toast("Erro ao salvar o dinheiro.");
      });
  };

  componentDidMount() {
    const { actionUpdateAllBills } = this.props;
    const { pageId, pageTitle } = this.props.navigation.state.params;

    getLocalStorageData(BILLS + "/" + pageId)
      .then(Bills => {
        if (Bills) {
          actionUpdateAllBills(Bills);
        } else {
          actionUpdateAllBills([]);
        }
      })
      .catch(err => {
        console.log(err);
        actionUpdateAllBills([]);
      });

    // === getting money value ===

    getLocalStorageData(MONEY + "/" + pageId)
      .then(Money => {
        if (Money) {
          this.setState(state => ({
            ...state,
            money: Money
          }));
        } else {
          this.setState(state => ({ ...state, money: 0 }));
        }
      })
      .catch(err => {
        console.log(err);
        setMoney(0);
      });

    this.setState({ pageId, pageTitle });
  }

  sumAll = bills => {
    let sum = 0.0;
    if (bills) {
      bills.forEach(el => {
        sum = sum + parseFloat(el.bill);
      });
    }
    return parseFloat(sum).toFixed(2);
  };

  sumAllPaid = bills => {
    let sum = 0.0;
    if (bills) {
      bills.forEach(el => {
        if (el.paid) {
          sum = sum + parseFloat(el.bill);
        }
      });
    }
    return parseFloat(sum).toFixed(2);
  };

  toggleShowForm = () => {
    this.setState(state => ({ ...state, showFormBill: !state.showFormBill }));
  };

  clearBillHolder = () => {
    this.setState(state => ({
      ...state,
      billHolder: { title: "", paid: false, bill: 0, id: -1 }
    }));
  };

  Content = () =>
    useCallback(
      <View behavior="padding">
        <TitlePopup>Nome para a conta:</TitlePopup>
        <TextInputName
          onChangeText={text => {
            this.setState(state => ({
              ...state,
              billHolder: { ...state.billHolder, title: text }
            }));
          }}
          value={this.state.billHolder.title}
          autoFocus
        />
        <TitlePopup>Valor da conta:</TitlePopup>
        <TextInputValue
          onChangeText={text => {
            this.setState(state => ({
              ...state,
              billHolder: { ...state.billHolder, bill: text }
            }));
          }}
          value={"" + this.state.billHolder.bill}
        />
      </View>,
      [this.state.billHolder]
    );

  ContentEditMoney = () =>
    useCallback(
      <View>
        <TitlePopup>Dinheiro do Mês:</TitlePopup>
        <TextInputValue
          onChangeText={text => {
            this.setState(state => ({
              ...state,
              money: text && text !== "" ? parseFloat(text) : 0
            }));
          }}
          value={"" + this.state.money}
          autoFocus
        />
      </View>,
      [this.state.money]
    );

  render() {
    const {
      pageTitle,
      money,
      billHolder,
      visiblePopup,
      visiblePopupMoney
    } = this.state;
    const {
      bills,
      actionUpdateBill,
      actionAddBill,
      actionDeleteBill,
      actionUpdateAllBills
    } = this.props;

    return (
      <Wrapper behavior="padding">
        <PinkTitle>{pageTitle}</PinkTitle>
        <View style={{ flexDirection: "row" }}>
          <Title>Dinheiro do Mês: {money}</Title>

          <RoundButton
            style={{
              width: 32,
              height: 32,
              padding: 5,
              marginLeft: 0,
              backgroundColor: gray
            }}
            onPress={() =>
              this.setState(state => ({ ...state, visiblePopupMoney: true }))
            }
          >
            {/* <TextWhite>Edit</TextWhite> */}
            <Icon name="pencil" size={14} color={white} />
          </RoundButton>

          <SaveButton onPress={this.saveData}>
            {/* <TextWhite>Save</TextWhite> */}
            <Icon name="save" size={18} color={white} />
          </SaveButton>
        </View>
        <WrapperList>
          {bills &&
            bills !== [] &&
            bills.map((el, index) => {
              return (
                <View key={index}>
                  <Conta
                    title={el.title}
                    bill={el.bill}
                    handleButton={() => {
                      actionDeleteBill(el.id);
                    }}
                    whenChecked={() => {
                      actionUpdateBill({ ...el, paid: !el.paid }, el.id);
                    }}
                    paid={el.paid}
                    textButton={"x"}
                    styleButton={{
                      backgroundColor: danger,
                      width: 40,
                      height: 40,
                      alignSelf: "center",
                      position: "absolute",
                      right: 15
                    }}
                  />
                </View>
              );
            })}
        </WrapperList>

        <Total>Dívida: R$ {this.sumAll(bills)}</Total>
        <Total>
          Falta: R${" "}
          {parseFloat(this.sumAll(bills) - this.sumAllPaid(bills)).toFixed(2)}
        </Total>
        <Total>
          Saldo: R$ {parseFloat(money - this.sumAll(bills)).toFixed(2)}
        </Total>

        <AddButton
          onPress={() => {
            this.setState(state => ({ ...state, visiblePopup: true }));
          }}
        />

        <Popup
          visible={visiblePopup}
          onCancel={() => {
            this.setState(state => ({ ...state, visiblePopup: false }));
          }}
          onConfirm={() => {
            //validate bill
            const billWithDot = ("" + billHolder.bill).replace(",", ".");
            if (
              billHolder.title &&
              billHolder.title !== "" &&
              billWithDot &&
              billWithDot !== "" &&
              billWithDot > 0
            ) {
              actionAddBill({
                title: billHolder.title,
                paid: billHolder.paid,
                bill: billWithDot,
                id:
                  bills && bills.length !== 0
                    ? bills[bills.length - 1].id + 1
                    : 0
              });
              this.clearBillHolder();
            } else {
              toast("AM I JOKE TO YOU?");
            }
            //erase bill holder

            this.setState(state => ({ ...state, visiblePopup: false }));
          }}
          Content={this.Content}
        />

        {/* pop up edit money */}
        <Popup
          visible={visiblePopupMoney}
          onCancel={() => {
            this.setState(state => ({ ...state, visiblePopupMoney: false }));
          }}
          onConfirm={() => {
            this.setState(state => ({ ...state, visiblePopupMoney: false }));
          }}
          Content={this.ContentEditMoney}
        />
      </Wrapper>
    );
  }
}

BillsScreen.navigationOptions = {
  headerTitle: <Titulo />
};

function Titulo() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50
      }}
    >
      <View style={{ marginLeft: -48, flexDirection: "row" }}>
        <Image
          source={require("../../assets/images/pig.png")}
          style={{ marginTop: 10, marginHorizontal: 10, resizeMode: "contain" }}
        />
        <TitlePage>PAY YOUR BILLS</TitlePage>
      </View>
    </View>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { actionUpdateBill, actionUpdateAllBills, actionAddBill, actionDeleteBill },
    dispatch
  );

const mapStateToProps = state => ({
  bills: state.billsState
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillsScreen);
