import React from "react";

import { Card, Title, Subtitle } from "./style";

export default function Page(props) {
  const { title, totalBill, saldo, onPress } = props;

  return (
    <Card onPress={onPress}>
      <Title>{title}</Title>
      <Subtitle> ... </Subtitle>
    </Card>
  );
}
