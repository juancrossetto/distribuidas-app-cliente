import "react-native-gesture-handler";
import React from "react";
import { Root } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountPage from "./view/CreateAccount";
import HomePage from "./view/Home";
import LoginPage from "./view/Login";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();

const App = () => {
  const ingresos = [
    { amount: 1, category: "Periodicos", bankAccount: "1234567891" },
  ];
  AsyncStorage.setItem("incomes", JSON.stringify(ingresos));

  const egresos = [
    {
      amount: 1,
      paymentType: "TAR",
      expenseType: "PER",
      detail: "",
      category: "5",
      id: "BMUgTPyBn",
    },
  ];

  AsyncStorage.setItem("expenses", JSON.stringify(egresos));

  console.disableYellowBox = true; // Para deshabilitar los warnings
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{
                title: "Iniciar Sesión",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccountPage}
              options={{
                title: "Crear Cuenta",
                headerStyle: {
                  backgroundColor: "#28303B",
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{
                title: "Página Principal",
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
