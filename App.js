import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Root } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountPage from "./view/CreateAccount";
import HomePage from "./view/Home";
import LoginPage from "./view/Login";
import {
  saveItem,
  INCOMES,
  EXPENSES,
  getAllStorage,
  clearAll,
} from "./utils/storage";
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
  // ];
  // saveItem(INCOMES, JSON.stringify(ingresos));

  // const egresos = [
  //   {
  //     amount: 10.0,
  //     paymentType: "TRC",
  //     expenseType: "PER",
  //     detail: "",
  //     category: "5",
  //     date: getCurrentDate(),
  //     id: "BMUgTPyBp",
  //   },
  //   {
  //     amount: 1500,
  //     paymentType: "TRC",
  //     expenseType: "PER",
  //     detail: "",
  //     category: "5",
  //     date: getCurrentDate(),
  //     id: "BMUgTPyBr",
  //   },
  //   {
  //     amount: 10.05,
  //     paymentType: "TRC",
  //     expenseType: "PER",
  //     detail: "",
  //     category: "5",
  //     date: getCurrentDate(),
  //     id: "BMUgTPyBn",
  //   },
  // ];

  useEffect(() => {
    // clearAll();
  }, []);
  // saveItem(EXPENSES, JSON.stringify(egresos));

  //console.disableYellowBox = true; // Para deshabilitar los warnings
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
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
