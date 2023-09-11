import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Navigator from "./src/Navigator";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const ProvidedNavigator = () => {
    return (
        <Navigator />
    );
};

AppRegistry.registerComponent(appName, () => ProvidedNavigator);
