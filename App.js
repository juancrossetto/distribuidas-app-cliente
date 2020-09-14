import "react-native-gesture-handler";
import React from "react";
import { Root } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountPage from "./view/CreateAccount";
import HomePage from "./view/Home";
import LoginPage from "./view/Login";
import { saveItem, INCOMES } from "./utils/storage";
import { getCurrentDate } from "./utils";

const Stack = createStackNavigator();

const App = () => {
  // const ingresos = [
  //   {
  //     amount: 100,
  //     category: "PER",
  //     bankAccount: "1234567891",
  //     date: getCurrentDate(),
  //     id: "ZMUgTPyBp",
  //   },
  //   {
  //     amount: 2500,
  //     category: "EXT",
  //     bankAccount: "2414205416",
  //     date: getCurrentDate(),
  //     id: "ZMUgTPyBf",
  //   },
  //   {
  //     amount: 100,
  //     category: "PER",
  //     bankAccount: "1234567891",
  //     date: getCurrentDate(),
  //     id: "ZMUgTPyBp2",
  //   },
  //   {
  //     amount: 2500,
  //     category: "EXT",
  //     bankAccount: "2414205416",
  //     date: getCurrentDate(),
  //     id: "ZMUgTPyBb",
  //   },
  // ];
  // saveItem(INCOMES, JSON.stringify(ingresos));

  // AsyncStorage.setItem("incomes", JSON.stringify(ingresos));

  //console.disableYellowBox = true; // Para deshabilitar los warnings
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
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </>
  );
};

export default App;
