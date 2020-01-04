import React, { Component } from "react";

import { ScrollList, Card } from "./style";
import Page from "..";

export default function PageList(props) {
  const {
    side,
    pages,
    filter,
    deleteCallback,
    updateCallback,
    changePage
  } = props;

  return (
    <ScrollList index={side}>
      {pages &&
        pages.map(
          (page, index) =>
            filter(index) && (
              <Card key={index}>
                <Page
                  page={page}
                  deleteCallback={deleteCallback}
                  updateCallback={updateCallback}
                  changePage={changePage}
                />
              </Card>
            )
        )}
    </ScrollList>
  );
}
