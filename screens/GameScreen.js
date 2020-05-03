import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import {Ionicons} from '@expo/vector-icons'
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [showGuess, setShowGuess] = useState([initialGuess]);
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
    setShowGuess([...showGuess,nextNumber])
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Ionicons style = {{backgroundColor:"#f7287b",width:50,paddingLeft:17,paddingTop:5,borderRadius:10}} name="md-remove" size = {24} color= "white" onPress={nextGuessHandler.bind(this, 'lower')} />

        <Ionicons
          style = {{backgroundColor:"#f7287b",width:50,paddingLeft:17,paddingTop:5,borderRadius:10}} name="md-add" size = {24} color= "white"
          onPress={nextGuessHandler.bind(this, 'greater')}
        />
      </Card>
      <ScrollView>
        {
          showGuess.map((x,index) => <View key = {index} style = {styles.listContaner}><Text style = {styles.listItem}>#{index+1}</Text><Text style = {styles.listItem}>{x}</Text></View>)
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  },
  listItem:{
    marginLeft: 10,
    marginRight: 10
  },
  listContaner:{
    width:"75%",
    height:50,
    borderWidth:2,
    marginVertical:15,
    paddingVertical:10,
    flexDirection:"row",
    justifyContent:"space-between"

  }
});

export default GameScreen;
