import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import styled from 'styled-components';
import { Button, TextInput, Text } from 'react-native-paper';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const SignupContainer = styled(View)`
  top: -10%;
`;
const LContainer = styled(View)`
  top: 30%;
  padding: 0 22px;
`;
const Input = styled(TextInput)`
  margin: 6px 0;
  padding: 3px 0;
`;
const TBtn = styled(Button)`
  margin: 0 20px;
  top: 20px;
`;
const BelowBox = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  top: 20px;
  flex-direction: row;
`;
const TextBelowBtn = styled(Text)`
    
`;
interface Props {
    creating: boolean;
    setCreating: (creating: boolean) => void;
}
const SignupPage: React.FC<Props> = (props) => {
    const [name, setName] = React.useState<string>("");
    const [id, setID] = React.useState<string>("");
    const [pwd, setPwd] = React.useState<string>("");
    const [confirmPwd, setConfirmPwd] = React.useState<string>("");
    // async function requestUserPermission() {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //     }
    // }
    // const [permissions, setPermissions] = useState({});

    // useEffect(() => {
    //     const type = 'notification';
    //     if (Platform.OS === 'ios') {
    //         PushNotificationIOS.requestPermissions();
    //     }
    //     PushNotificationIOS.addEventListener(type, onRemoteNotification);
    //     return () => {
    //         PushNotificationIOS.removeEventListener(type);
    //     };
    // });
    const onRemoteNotification = (notification: any) => {
        const isClicked = notification.getData().userInteraction === 1;

        if (isClicked) {
            // Navigate user to another screen
        } else {
            // Do something else with push notification
        }
        // Use the appropriate result based on what you needed to do for this notification
        const result = PushNotificationIOS.FetchResult.NoData;
        notification.finish(result);
    };
    useEffect(
        () => {
            setName("");
            setID("");
            setPwd("");
            const details: any = {
                fireDate: "",
            };
            // PushNotificationIOS.scheduleLocalNotification(details);
            // requestUserPermission();
        }, []
    );
    return (
        <SignupContainer>
            <Input label="Name"
                value={name} onChangeText={(text: string) => setName(text)} />
            <Input label="ID"
                value={id} onChangeText={(text: string) => setID(text)} autoCapitalize="none" />
            <Input label="Password"
                value={pwd} secureTextEntry={true} onChangeText={(text: string) => setPwd(text)} autoCapitalize="none" />
            {/* <Input label="Confirm Password"
                value={confirmPwd} secureTextEntry={true} onChangeText={(text: string) => {setConfirmPwd(text)
                
                }} /> */}
            <Button mode="contained" onPress={() => console.log('Pressed')}>
                Create
            </Button>
            <BelowBox>
                <TextBelowBtn variant="labelSmall">
                    Already have account?
                </TextBelowBtn>
                <Button mode="text" onPress={() => props.setCreating(false)}>
                    Go to LogIn
                </Button>
            </BelowBox>
        </SignupContainer>
    );
};


const LoginPage: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [id, setID] = React.useState<string>("");
    const [pwd, setPwd] = React.useState<string>("");
    const [creating, setCreating] = React.useState<boolean>(false);
    return (
        <LContainer>
            {
                creating ? <SignupPage creating={creating} setCreating={setCreating}></SignupPage> : <>
                    <Input label="ID"
                        value={id}
                        onChangeText={(text: string) => setID(text)} autoCapitalize="none" />
                    <Input label="Password"
                        value={pwd} secureTextEntry={true} onChangeText={(text: string) => setPwd(text)} autoCapitalize="none" />
                    <TBtn mode="contained" onPress={() => {
                        console.log('Login');
                        navigation.navigate('ChatList', { userId: id, navigation });
                        // id and password를 서버에서 보내서 auth 확인후에 돌려보낸다. 만약 맞지 않을시 alert를 보내고 
                        // 맞았을 경우 채팅방의 정보를 받아서 chatlistpage에 넘겨준다.
                    }}>LOGIN</TBtn>
                    <BelowBox>
                        <TextBelowBtn variant="labelSmall">
                            No account?
                        </TextBelowBtn>
                        <Button mode="text" onPress={() => setCreating(true)}>
                            Create Account
                        </Button>
                    </BelowBox></>
            }
        </LContainer >
    );
};

export default LoginPage;