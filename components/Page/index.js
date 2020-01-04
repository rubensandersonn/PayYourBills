import React, { Component } from "react";

import { Card, Title, Subtitle } from "./style";
import { CardPage, DeleteButton } from "./PageList/style";
import Menu, { MenuItem } from "react-native-material-menu";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    _menu: null
  };

  setMenuRef = ref => {
    this.setState({ _menu: ref });
  };

  hideMenu = () => {
    this.state._menu.hide();
  };

  showMenu = () => {
    this.state._menu.show();
  };

  render() {
    const { page, deleteCallback, updateCallback, changePage } = this.props;

    return (
      <>
        <CardPage
          onPress={() => {
            changePage(page.title, page.id);
          }}
        >
          <Title>{page.title}</Title>
          <Subtitle> ... </Subtitle>
        </CardPage>
        <>
          <Menu
            ref={this.setMenuRef}
            button={
              <DeleteButton onPress={this.showMenu}>
                <Icon name="ellipsis-v" size={14} color={"white"} />
              </DeleteButton>
            }
          >
            <MenuItem
              onPress={() => {
                deleteCallback(page);
                this.hideMenu();
              }}
            >
              Apagar
            </MenuItem>
            <MenuItem
              onPress={() => {
                updateCallback(page);
                this.hideMenu();
              }}
            >
              Atualizar
            </MenuItem>
          </Menu>
        </>
      </>
    );
  }
}
