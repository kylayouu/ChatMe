import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    }
  }

  componentDidMount() {

    // displays the user's name on the top of the screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello there!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'kylayouu',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: name + ' has entered the chat',
          createdAt: new Date(),
          system: true,
        },
      ]
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
              _id: 1,
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