import 'react-native-gesture-handler';

import * as React from 'react';
import {Button, View, Text, TouchableOpacity, Image} from 'react-native';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Incomes from '../Incomes';
import Expenses from '../Expenses';
import Dashboard from '../Dashboard';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Incomes">
      <Stack.Screen
        name="Incomes"
        component={Incomes}
        options={{
          title: 'Administra tus Ingresos', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{
          title: 'Administra tus Egresos', //Set Header Title
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'HomeScreen':
      return 'Home';
    case 'ExploreScreen':
      return 'Explore';
    case 'DashboardTabsStack':
      return 'Home';
  }
}
function DashboardTabsStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#f4511e',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Monto gastado',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="Incomes"
        component={Incomes}
        options={{
          tabBarLabel: 'Saldo de cuenta',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}

function DashboardsStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Dashboards"
        component={DashboardTabsStack}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        })}
      />
    </Stack.Navigator>
  );
}

function Home() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        style: {backgroundColor: '#DFDBDB'},
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="Dashboards"
        options={{drawerLabel: 'Dashboards'}}
        component={DashboardsStack}
      />
      <Drawer.Screen
        name="Ingresos"
        options={{
          drawerLabel: 'Ingresos',
        }}
        component={firstScreenStack}
      />
      <Drawer.Screen
        name="Egresos"
        options={{drawerLabel: 'Egresos'}}
        component={secondScreenStack}
      />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}

export default Home;
