import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class Chat extends React.Component {

  render() {

    // displays the user's name on the top of the screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    let bgColor = this.props.route.params.bgColor;

    return (
      <View style={{flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: bgColor ? bgColor : '#fff'}}>
        <Text style={styles.text}>Chat Screen</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: 45,
    color: '#fff'
  }
})