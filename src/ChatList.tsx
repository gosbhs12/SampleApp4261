import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { TextInput, Button } from 'react-native-paper';
import { Container, CardBox, ModalContainer, ModalBox, IdList } from './styles';

const data: string[] = ["jisung", "gos123", "go313", "jisan", "uernw", "numb", "gosdsfs"];

type Message = {
    'key': string;
    'text': any;
    'sender': string;
    'receiver': string;
};

const SERVER_URL = "https://sample4261-19363cdbfe12.herokuapp.com";

const ChatList: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const myuserId: string = route.params.userId;
    console.log('loggedInUserID', myuserId)
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [idList, setIdList] = React.useState<string[]>([]);
    // const chats: {}[] = [{ id: "jisung123", name: "Jisung" }, { id: "jisung121", name: "Myungsung" }]; // 채팅방 리스트를 가져올 데이터
    const [chatRoomList, setChatRoomList] = useState([{ id: "jisung", name: "Jisung" }, { id: "myung1", name: "Myungsung" }]);
    const [searchedUserId, setSearchedUserId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchMessagesFromServer = async (userId: string): Promise<Message[] | null> => {
        const response = await fetch(`${SERVER_URL}/get_messages?myId=${myuserId}&userId=${userId}`);

        const messageData = await response.json();
        return messageData;
    };

    const fetchChatData = async (userId: string): Promise<Message[] | null> => {
        // 나와 고른사람의 아이디를 서버에 보내서 그 메시지 리스트만 받아 chatData로 아웃풋한다.

        const messageData = await fetchMessagesFromServer(userId);

        // const chatData = messageData.filter((message: Message) => (message.sender === userId && message.receiver === myuserId) || (message.sender === myuserId && message.receiver === userId));
        console.log('messageData', messageData)
        const messages: Message[] | null = messageData["messages"];
        // console.log('chatData111', chatData)

        return messages
    };

    const createNewChatRoom = async (receiverId: string): Promise<void> => {
        // const newChat = { key: '4', text: "New chat created.", sender: myuserId, receiver: receiverId };
        // messageData.push(newChat);
        const newChatRoom = { id: receiverId, name: receiverId };
        setChatRoomList(prevChatRoom => [...prevChatRoom, newChatRoom]);
    };

    const handleChatBoxPress = async (receiverId: string) => {
        let chatData = await fetchChatData(receiverId);
        const chatRoomExists = chatRoomList.some(room => room.id === receiverId);
        if (!chatData && !chatRoomExists) { // 데이터가 없고, 채팅방도 없는 경우만 채팅방 생성
            await createNewChatRoom(receiverId);
        }
        setModalVisible(false);
        navigation.navigate('Chat', { myId: myuserId, receiverId: receiverId, data: chatData });
    };
    // const createNewChat = () => {
    //     // 서버에 새로운 채팅방을 생성하는 요청을 보내는 로직을 여기에 추가합니다.

    //     // 예제: 아래는 임시 코드로, 실제로는 서버와 통신하여 데이터를 가져와야 합니다.
    //     setTimeout(() => {
    //         const newChat = { id: searchedUserId, name: searchedUserId };
    //         setChatRoomList(prevChatRoom => [...prevChatRoom, newChat]);
    //         setIsLoading(false);
    //         setModalVisible(false);
    //     }, 1000);
    // };
    // const enterChat = () => {
    //     setIsLoading(true);
    // }

    useEffect(() => {
        // get id list from server and set it to idList
        const filteredIds: string[] = data.filter((id) => id.includes(searchedUserId));
        setIdList(filteredIds);
    }, [searchedUserId])
    return (
        <Container>
            <Text>Hello, {myuserId}</Text>
            <Button mode="text" onPress={() => { setModalVisible(true) }}>Create New Chat</Button>
            <FlatList
                data={chatRoomList}
                renderItem={({ item }) => (<>
                    {item ?
                        <CardBox id={item.id} onPress={async () => await handleChatBoxPress(item.id)}>
                            <Text>{item.id}</Text>
                        </CardBox> : <Text>No Chat List</Text>}
                </>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <ModalContainer>
                    <ModalBox>
                        <TextInput
                            placeholder="Search User by ID"
                            value={searchedUserId}
                            onChangeText={setSearchedUserId}
                            autoCapitalize="none"
                        />
                        {isLoading && <ActivityIndicator size="large" />}
                        {
                            idList.length > 0 ?
                                <IdList
                                    data={idList}
                                    renderItem={({ item }: any) => (
                                        <CardBox onPress={async () => await handleChatBoxPress(item)}>
                                            <Text>{item}</Text>
                                        </CardBox>
                                    )}
                                    keyExtractor={(item: any, index: number) => index.toString()}
                                />
                                : <Text>No Chat List</Text>
                        }
                        <View style={{ justifyContent: 'center', marginTop: 10 }}>
                            <Button mode="contained" onPress={() => setModalVisible(false)}>Cancel</Button></View>
                    </ModalBox>
                </ModalContainer>
            </Modal>
        </Container>
    );
};

export default ChatList;