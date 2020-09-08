import 'react-native-gesture-handler';
import React from 'react';
import {Root} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './view/Login';
import CreateAccount from './view/CreateAccount';
import Home from './view/Home';
import SideBar from './components/SideBar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Iniciar Sesión',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{
                title: 'Crear Cuenta',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Página Principal',
                headerShown: false,
              }}
            />
            {/*   <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Home',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
           <Stack.Screen
              name="SideBar"
              component={SideBar}
              options={{
                title: 'SideBar',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="NuevoProyecto"
              component={NuevoProyecto}
              options={{
                title: 'Nuevo Proyecto',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Proyecto"
              component={Proyecto}
              options={({route}) => ({
                title: route.params.nombre,
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </>
  );
};

export default App;
