
import { TouchableOpacity, View, FlatList } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import styled from "styled-components";


export const CardBox = styled(TouchableOpacity)`
  padding: 15px 20px;
  border: 1px;
  border-radius: 15px;
  border-color: green;
  margin: 5px 0;
  background-color: #C6DEF1;
  display: flex;
  flex-direction: row;
`;
export const Container = styled(View)`
padding: 0 22px;
top: 30px;
heigth: 100%;
`;

export const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  heigth: 60%;
`;

export const ModalBox = styled(View)`
  width: 80%;
  padding: 20px;
  background-color: #FFDFD3;
  border: 1px;
  border-radius: 10px;
  elevation: 5;
`;
export const IdList = styled(FlatList)`
  padding: 10px 20px;
`;

export const SignupContainer = styled(View)`
  top: -10%;
`;
export const LContainer = styled(View)`
  top: 30%;
  padding: 0 22px;
`;
export const Input = styled(TextInput)`
  margin: 6px 0;
  padding: 3px 0;
`;
export const TBtn = styled(Button)`
  margin: 0 20px;
  top: 20px;
`;
export const BelowBox = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  top: 20px;
  flex-direction: row;
`;

export const TextBelowBtn = styled(Text)`
    
`;