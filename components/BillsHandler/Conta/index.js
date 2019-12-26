import React, { useState, useRef } from "react";
import { CheckBox } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { Wrapper, Texto, MenuButton, Line } from "./style";
import { TextWhite, RoundButton } from "../../../utils/styled";
import { toast } from "../../../utils/functions";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Conta extends React.Component {
  setMenuRef = ref => {
    this.setState({ _menu: ref });
  };

  hideMenu = () => {
    this.state._menu.hide();
  };

  showMenu = () => {
    this.state._menu.show();
  };

  state = { _menu: null, checked: this.props.paid === true };

  render() {
    const {
      title,
      bill,
      whenChecked,
      deleteCallback,
      updateCallback,
      paid,
      textButton,
      styleButton
    } = this.props;

    return (
      <Wrapper>
        <CheckBox
          value={this.state.checked}
          onValueChange={() => {
            this.setState({ checked: !this.state.checked });

            // telling main when i was checked
            whenChecked();
          }}
        />
        <Line horizontal={true}>
          <Texto decoration={this.state.checked ? "line-through" : "none"}>
            R$ {bill ? bill : 0} -{" "}
          </Texto>
          <Texto decoration={this.state.checked ? "line-through" : "none"}>
            {title ? title : ""}
          </Texto>
        </Line>

        <Menu
          ref={this.setMenuRef}
          button={
            <MenuButton onPress={this.showMenu}>
              <Icon name="ellipsis-v" size={14} color={"white"} />
            </MenuButton>
          }
        >
          <MenuItem
            onPress={() => {
              deleteCallback();
              this.hideMenu();
            }}
          >
            Apagar
          </MenuItem>
          <MenuItem
            onPress={() => {
              updateCallback();
              this.setState({ checked: !this.state.checked });
              this.hideMenu();
            }}
          >
            Atualizar
          </MenuItem>
        </Menu>
      </Wrapper>
    );
  }
}
