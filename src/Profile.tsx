import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { TextInput, Button } from 'react-native-paper';
import { CardBox } from './styles';
interface Props {
    userId: string
}

const Profile: React.FC<Props> = (props) => {

    return (
        <CardBox onPress={() => { }}>
            <Text>{props.userId}</Text>
        </CardBox>
    )
}
export default Profile;