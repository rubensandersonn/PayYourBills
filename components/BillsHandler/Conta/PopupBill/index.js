import React, { Component, useCallback } from "react";

import { View } from "react-native";
import Popup from "../../../Popup";
import {
  TitlePopup,
  TextInputName,
  TextInputValue
} from "../../../../screens/BillsScreen/styles";

// import { Container } from './styles';

export default class PopupBill extends Component {
  state = {
    billHolder: {
      title: "",
      paid: false,
      bill: 0,
      id: -1
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.bill && nextProps.bill.title) {
      this.setState(state => ({
        ...state,
        billHolder: {
          ...state.billHolder,
          title: nextProps.bill.title,
          bill: nextProps.bill.bill
        }
      }));
    }
  }

  /**
   * Pop up's Content
   */
  Content = bill => {
    // if bill is on, then its an update

    return useCallback(
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
      [this.state.billHolder.title, this.state.billHolder.bill]
    );
  };

  render() {
    const { visible, onCancel, action, bill } = this.props;
    return (
      <Popup
        visible={visible}
        onCancel={onCancel}
        onConfirm={() => {
          //validate bill
          const billWithDot = ("" + bill.bill).replace(",", ".");
          if (
            bill.title &&
            bill.title !== "" &&
            billWithDot &&
            billWithDot !== "" &&
            billWithDot > 0
          ) {
            action({
              title: bill.title,
              paid: bill.paid,
              bill: billWithDot
            });
          } else {
            toast("AM I JOKE TO YOU?");
          }
          //put this outside:
          //this.setState(state => ({ ...state, visiblePopup: false }));
        }}
        Content={() => this.Content(bill)}
      />
    );
  }
}
