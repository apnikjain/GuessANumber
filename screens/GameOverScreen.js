import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <View style = {styles.imageContainer}>
        <Image 
          
          style = {styles.image}
          source = {require('../assets/original.png')}
        />


      </View>
      <Text>Number of rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer:{
    width: Dimensions.get('window').width*0.7,
    height:Dimensions.get('window').width*0.7,
    borderRadius:Dimensions.get('window').width*0.7/2,
    borderWidth:3,
    borderColor:"black",
    overflow:"hidden",
    marginVertical:Dimensions.get('window').height/30,
  },
  image:{
    width:"100%",
    height:"100%"
  }
});

export default GameOverScreen;
