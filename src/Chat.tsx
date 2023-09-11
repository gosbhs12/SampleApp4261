import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, Platform, TouchableOpacity, Image, KeyboardAvoidingView, Modal, Button as RNButton, Linking, Alert } from 'react-native';
import styled from 'styled-components';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';
import Geocoder from "react-native-geocoding";
import { Camera, useCameraDevices } from 'react-native-vision-camera';
const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY;
Geocoder.init("");
type Message = {
    key: string;
    text: any;
    sender: string;
    receiver: string;
};
interface Props {
    myId: string;
    userId: string;
    data: Message[];
}
const Container = styled(View)`
  flex:1;
`;
const MyMessage = styled(View)`
background-color: #DCF8C6;
padding: 10px;
margin: 5px;
border-radius: 10px;
align-self: flex-end;
`;
const OtherMessage = styled(View)`
background-color: #ECECEC;
padding: 10px;
margin: 5px;
margin-left: 15px;
border-radius: 10px;
align-self: flex-start;
`;
const InputContainer = styled(View)`
background-color: #e1e3e3;
position: fixed;
padding-bottom: 30px;
width: 100%;
`;
const InputBox = styled(View)`
    padding: 10px 20px;
    padding-left: 10px;
display: flex;
    flex-direction: row;
  width: 100%;
`;
const Input = styled(TextInput)`
border-radius: 10px;
padding-left:10px; 
margin-left: 5px;
background-color: #ECECEC;
width: 70%;
`;

const fetchAddress = async (latitude: any, longitude: any) => {
    console.log('lat', latitude)
    console.log('longitude', longitude)
    var address: string = "";
    await Geocoder.from(latitude, longitude)
        .then(json => {
            console.log('first', json.results[0].formatted_address);
            address = json.results[0].formatted_address
        })
        .catch(error => console.warn(error));
    return address;
};
// const messageData: Message[] = [
//     { key: '1', text: "Hello, nice to meet you.", sender: 'gosbhs12', receiver: 'jisung' },
//     { key: '2', text: "Hello! How are you?", sender: 'jisung', receiver: 'gosbhs12' },
//     { key: '3', text: "Have you done the assignment?", sender: 'gosbh12', receiver: 'jisung' },
//     { key: '4', text: "dasnfl;snd?", sender: 'gosbh12', receiver: 'myung1' },
//     { key: '5', text: "cvxvx,m,", sender: 'myung1', receiver: 'gosbh12' },
//     { key: '6', text: "Wdym?", sender: 'gosbh12', receiver: 'myung1' },
//     { key: '7', text: "I was joking man", sender: 'myung1', receiver: 'gosbh12' },
//     { key: '8', text: "I did.", sender: 'gosbh12', receiver: 'jisung' },
//     { key: '9', text: "Could you give me answer?", sender: 'jisung', receiver: 'gosbh12' },
// ];
const Chat: React.FC<{ route: any }> = ({ route }) => {
    const myId = route.params.myId;
    const receiverId = route.params.receiverId;
    const data = route.params.data;
    const [messages, setMessages] = useState<Message[]>(data);
    const [inputMessage, setInputMessage] = useState<any>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [tempMessage, setTempMessage] = useState<string>('');
    const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
    const [imageSource, setImageSource] = useState<string>('');
    // const [isImage, setIsImage] = useState<boolean>(false);
    const cameraRef = useRef(null);
    const devices = useCameraDevices();
    console.log('devices', devices)
    const device: any = devices.back
    useEffect(() => {
        async function getPermission() {
            const permission = await Camera.requestCameraPermission();
            console.log(`Camera permission status: ${permission}`);
            if (permission === 'denied') await Linking.openSettings();
        }
        getPermission();

    }, []);

    const handleOnSubmitEditing = () => {
        console.log('tempMessage', tempMessage)
        setInputMessage(tempMessage);
        console.log('inputMessage', inputMessage)
        setTempMessage('');
    };
    const sendMessage = () => {
        if (imageSource) {
            const newMessage: Message = {
                key: messages[messages.length - 1].key + 1,
                text: imageSource,
                sender: myId,
                receiver: receiverId
            };
            setMessages([...messages, newMessage]);
            setImageSource('');

        }

        if (inputMessage) {
            console.log('inputMessage', inputMessage)
            const newMessage: Message = {
                key: messages[messages.length - 1].key + 1,
                text: inputMessage,
                sender: myId,
                receiver: receiverId
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
        }


    };
    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const capturePhoto = async () => {

        if (cameraRef.current) {

            const photo = await cameraRef.current.takePhoto({});
            if (photo) {
                setImageSource(photo.path);
                setIsCameraOn(false);
            }

            console.log(photo.path);
        }
    };
    const shareLocation = () => {
        console.log('share Location')
        Geolocation.getCurrentPosition(async info => {
            const address: string = await fetchAddress(info.coords.latitude, info.coords.longitude);

            if (address) {
                console.log("Current address:", address);
                setInputMessage(address);


                // TODO: 이 주소 정보를 서버나 다른 유저에게 전송
            } else {
                console.error("Could not fetch the address.");
            }
        });
        closeModal()
    };
    useEffect(() => {
        sendMessage();
    }, [inputMessage])
    // console.log('myId', myId)
    console.log('messages', messages)
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}>
            {isCameraOn ? (<>
                <Camera
                    ref={cameraRef}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    device={device}
                    photo={true}
                    isActive={isCameraOn}
                />
                <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: 20,
                    padding: 10,
                    backgroundColor: 'transparent',
                    borderRadius: 30,
                    alignSelf: 'center',
                    margin: 20
                }} onPress={capturePhoto}>
                    <Text style={{ color: 'white' }}>Capture</Text>
                </TouchableOpacity>
            </>
            ) :
                <Container>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => {
                            const isImage = item.text.startsWith('/') && item.text.endsWith('.jpeg');

                            return (<>
                                {item.sender === myId ? <MyMessage>{
                                    !isImage ?
                                        <Text>{item.text}</Text> : <Image source={{ url: item.text }} style={{ width: 150, height: 150 }} />
                                }
                                </MyMessage> : <><Text style={{ paddingBottom: 5, paddingLeft: 10 }}>{receiverId}
                                </Text><OtherMessage><Text>{item.text}</Text></OtherMessage></>}
                            </>)
                        }}
                        keyExtractor={item => item.key}
                    />
                    <InputContainer><InputBox>
                        <TouchableOpacity onPress={openModal} style={{ justifyContent: 'center' }}>
                            <Image source={require('./plus.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Input
                            placeholder="Enter Message"
                            value={tempMessage}
                            onChangeText={setTempMessage}
                            onSubmitEditing={handleOnSubmitEditing}
                            blurOnSubmit={true}
                        />
                        <Button mode="contained" onPress={() => {
                            handleOnSubmitEditing()
                        }}>Send</Button></InputBox>
                    </InputContainer>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={closeModal}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ height: 200, backgroundColor: '#d2d2d2', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <RNButton title="Take a Photo" onPress={() => {
                                    if (device == null) {
                                        Alert.alert("Camera", "Camera not found")
                                    } else {
                                        setIsCameraOn(true);
                                        setIsModalVisible(false);
                                    }

                                }} />
                                <RNButton title="Send Location" onPress={shareLocation} />
                                <RNButton title="Close" onPress={closeModal} />
                            </View>
                        </View>
                    </Modal>
                </Container>}</KeyboardAvoidingView>)
}
export default Chat;