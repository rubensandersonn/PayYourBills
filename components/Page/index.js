import React from "react";
import { View } from "react-native";
import { Card, Title, Subtitle } from "./style";

// import { Container } from './styles';

export default function Page(props) {
  const { title, totalBill, saldo } = props;
  return (
    <Card>
      <Title>{title}</Title>
      <Subtitle>{totalBill}</Subtitle>
      <Subtitle>{saldo}</Subtitle>
    </Card>
  );
}
