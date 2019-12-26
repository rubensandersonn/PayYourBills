import React, { useCallback } from "react";
import { CheckBox } from "react-native";
import Menu, { MenuItem } from "react-native-material-menu";
import { Wrapper, Texto, MenuButton, Line } from "./style";
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

  state = {
    _menu: null,
    checked: this.props.paid === true
  };

  /**
   * Callback that updates the bill
   */

  render() {
    const {
      title,
      bill,
      whenChecked,
      deleteCallback,
      updateCallback
    } = this.props;

    const { checked } = this.state;

    return (
      <Wrapper>
        <CheckBox
          value={checked}
          onValueChange={() => {
            this.setState({ checked: !checked });

            // telling main when i was checked
            whenChecked();
          }}
        />
        <Line horizontal={true}>
          <Texto decoration={checked ? "line-through" : "none"}>
            R$ {bill ? bill : 0} -{" "}
          </Texto>
          <Texto decoration={checked ? "line-through" : "none"}>
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
