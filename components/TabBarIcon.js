import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { primaryEnd, secondary, gray } from "../utils/colors";

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={32}
      style={{ marginBottom: -3 }}
      color={props.focused ? secondary : gray}
    />
  );
}
