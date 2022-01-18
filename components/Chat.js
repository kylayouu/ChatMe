import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

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
    })
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
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user
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
      text: message.text,
      createdAt: message.createdAt,
      user: message.user      
    })
  }

  // function for when user sends a message
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      this.addMessage()
    })
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