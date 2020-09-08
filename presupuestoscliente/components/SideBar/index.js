import React from 'react';
import SideMenu from 'react-native-side-menu';
import {StyleSheet, View, Menu, Text} from 'react-native';

const ContentView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit index.ios.js</Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+Control+Z for dev menu
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  welcome: {},
  instructions: {},
});

const Application = () => {
  const menu = <Menu navigator={navigator} />;

  return (
    <SideMenu menu={menu}>
      <ContentView />
    </SideMenu>
  );
};

export default Application;
