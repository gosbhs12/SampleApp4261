import React from 'react';
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './Login';
import ChatList from './ChatList';
import Chat from './Chat';
const RootStack = createNativeStackNavigator();
// 각 화면 전환 될 수 있는 기본 틀 제공


const Navigator = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <RootStack.Navigator initialRouteName="LoginPage">
                <RootStack.Screen
                    name="LoginPage"
                    component={LoginPage}
                    options={{
                        headerShown: true
                    }}
                />
                <RootStack.Screen
                    name="ChatList"
                    component={ChatList}
                    options={{ headerShown: true, headerBackVisible: true }}
                />
                <RootStack.Screen
                    name="Chat"
                    component={Chat}
                    options={{ headerShown: true, headerBackVisible: true }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;