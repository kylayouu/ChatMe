import React from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const bg = require('../assets/bg-image.png');
const userIcon = require('../assets/userIcon.png');

export default class Start extends React.Component {

  state = {
    name: '',
    bgColor: ''
  }

  colors = {
    black: '#090C08',
    darkPurple:'#474056',
    gray:'#8A95A5',
    lightGreen:'#B9C6AE'
  };

  // function to change the chat screen background color based on what is selected by user
  changeBgColor = (selectedColor) => {
    this.setState({
      bgColor: selectedColor
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={bg} resizeMode='cover' style={styles.image} >
        <Text style={styles.title}>ChatMe</Text>
        
          <View style={styles.box}>
            <View style={styles.inputRow}>
              <Image source={userIcon} style={styles.userIcon}/>
              <TextInput 
              style={styles.textInput}
              value={this.state.name}
              onChangeText={(text) => this.setState({ name: text })}
              placeholder='Your Name'
              />
            </View>

            <View style={styles.bgColorBox}>
              <Text style={styles.bgColorText}>Choose Background Color:</Text>

              <View style={styles.bgColorSelector}>
                <TouchableOpacity onPress={() => this.changeBgColor(this.colors.black)}>
                  <View style={styles.bgColor1}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.changeBgColor(this.colors.darkPurple)}>
                  <View style={styles.bgColor2}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.changeBgColor(this.colors.gray)}>
                  <View style={styles.bgColor3}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.changeBgColor(this.colors.lightGreen)}>
                  <View style={styles.bgColor4}></View>
                </TouchableOpacity>
              </View>

            </View>

            <Pressable
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('Chat', { 
                name: this.state.name, 
                bgColor: this.state.bgColor 
              })}
            >
              <Text style={styles.btnText}>Start Chatting!</Text>
            </Pressable>

          </View>
        </ImageBackground>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 45,
    color: '#fff',
    fontWeight: '600'
  },
  box: {
    backgroundColor: '#fff',
    width: '88%',
    height: '44%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  userIcon: {
    width: 20,
    height: 20,
    margin: 3,
    marginRight: 7,
    color: '#757083',
    opacity: .5
  },
  inputRow: {
    flexDirection: 'row',
    width: '88%',
    color: '#757083',
    borderWidth: 2,
    borderColor: '#757083',
    padding: 15
  },
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: .5,
    width: '88%'
  },
  bgColorSelector: {
    paddingTop: 10,
    flexDirection: 'row',
    width: '88%',
    justifyContent: 'space-between'
  },
  bgColorBox: {
    width: '88%'
  },
  bgColorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  bgColor1: {
    borderRadius: 25,
    backgroundColor: '#090C08',
    width: 50,
    height: 50
  },
  bgColor2: {
    borderRadius: 25,
    backgroundColor: '#474056',
    width: 50,
    height: 50
  },
  bgColor3: {
    borderRadius: 25,
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50
  },
  bgColor4: {
    borderRadius: 25,
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50
  },
  btn: {
    backgroundColor: '#757083',
    flex: .25,
    flexDirection: 'row',
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});