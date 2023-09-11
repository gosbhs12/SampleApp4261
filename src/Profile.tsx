import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { TextInput, Button } from 'react-native-paper';
interface Props {
    userId: string
}
const CardBox = styled(TouchableOpacity)`
  padding: 15px 20px;
  border: 1px;
  border-radius: 15px;
  border-color: green;
  margin: 5px 0;
  background-color: #C6DEF1;
  display: flex;
  flex-direction: row;
`;
const Profile: React.FC<Props> = (props) => {

    return (
        <CardBox onPress={() => { }}>
            <Text>{props.userId}</Text>
        </CardBox>
    )
}
export default Profile;