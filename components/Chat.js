import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

import * as firebase from 'firebase';
import 'firebase/firestore';

// ChatMe web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUuRjpQoNHgBFHo262QgQODqUDdMi682I",
  authDomain: "chatme-0317.firebaseapp.com",
  projectId: "chatme-0317",
  storageBucket: "chatme-0317.appspot.com",
  messagingSenderId: "1046445015518",
  appId: "1:1046445015518:web:3d0c756730e0d08ff09d4f"
};

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      isConnected: false,
      image: '',
      location: null,
    }

    // initializes firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceUserChatMessages = null;
  }

  componentDidMount() {
    // displays the user's name on the top of the screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    // references to 'messages' collection in firebase
    this.referenceChatMessages = firebase.firestore().collection('messages');

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {

        this.setState({ isConnected: true });

        // to check if user is authorized
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          // update user state with currently active user data
          this.setState({
            messages: [],
            uid: user.uid,
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any'
            }
          });

          // listens for updates in collection
          this.unsubscribe = this.referenceChatMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate);

          // references to current user's messages in firebase
          this.referenceUserChatMessages = firebase.firestore()
          .collection('messages')
          .where('uid', '==', this.state.uid);
        });

        this.saveMessages();

      } else {
        this.setState({ isConnected: false });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    // stops listening to authentication
    this.authUnsubscribe();
    // stops listening to updates in collection
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      // pushes snapshot's data into messages which then updates this state's messages array
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || '',
        location: data.location || null
      });
    });
    this.setState({
      messages: messages
    });
  }

  // function to add message to database
  addMessage() {
    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || '',
      location: message.location || null      
    })
  }

  // async function to retrieve messages from AsyncStorage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // async function to save messages to AsyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // async function to delete messages
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  // function for when user sends a message
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      this.addMessage();
      this.saveMessages();
    })
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView (props) {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar {...props} />
      );
    }
  }

  renderBubble(props) {
    return (
      <Bubble 
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#4B8FD0'
          }
        }}
      />
    )
  }

  render() {
    let bgColor = this.props.route.params.bgColor;

    return (
      <View 
        style={{flex: 1,
        alignItems:'center', 
        justifyContent:'center',
        backgroundColor: bgColor ? bgColor : '#fff'}}>
        <View style={styles.giftedChat}>
          <GiftedChat
            renderCustomView={this.renderCustomView}
            renderActions={this.renderCustomActions}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.state.user._id,
              name: this.state.user.name,
              avatar: this.state.user.avatar
            }}
          />
          { Platform.OS === 'android' ? (
            <KeyboardAvoidingView behavior='height' />
          ) : null }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 45,
    color: '#fff'
  },
  giftedChat: {
    flex: 1,
    width: '88%',
    paddingBottom: 20,
  }
})