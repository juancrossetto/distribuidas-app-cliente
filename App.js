import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Root } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountPage from "./view/CreateAccount";
import HomePage from "./view/Home";
import LoginPage from "./view/Login";
import ChangeDatesCreditCardPage from "./view/CreditCards/ChangeDates";
import CreditCardsPage from "./view/CreditCards";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // clearAll();
  }, []);
  // saveItem(EXPENSES, JSON.stringify(egresos));

  console.disableYellowBox = true; // Para deshabilitar los warnings
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
                  backgroundColor: "#3700B3",
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
            <Stack.Screen
              name="ChangeDatesCreditCardPage"
              component={ChangeDatesCreditCardPage}
              options={{
                title: "ChangeDatesCreditCardPage",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreditCardsPage"
              component={CreditCardsPage}
              options={{
                title: "ChangeDatesCreditCardPage",
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
