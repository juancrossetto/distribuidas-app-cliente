import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Container, Spinner, Text, H1, Input, Form, Item } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import useAlert from "../../hooks/useAlert";
import AnimatedButton from "../../components/AnimatedButton";
import {
  saveItem,
  clearAll,
  getItem,
  USERLOGGED,
  INCOMES,
  EXPENSES,
  BANKACCOUNTS,
  CREDITCARDS,
  LOANS,
  BUDGETS,
  BANKACCOUNTSMOVEMENTS,
  CREDITCARDMOVEMENTS,
} from "../../utils/storage";
import { authUserService, getAllDataService } from "../../services/userService";
import * as Notifications from "expo-notifications";
import { savePNTokenService } from "../../services/pushNotificationService";
import { getCreditCardsService } from "../../services/creditCardService";

const LoginPage = () => {
  // State del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    isUserCatched();
  }, [isFocused]);

  const isUserCatched = async () => {
    const user = await getItem(USERLOGGED);
    if (user) {
      navigation.navigate("Home");
    }
  };

  const initUserConfiguration = async () => {
    // Guardar token para push notification en la base
    await saveTokenPushNotification();

    //Obtener toda la informacion
    await getAllData();

    // REVISAR SI HA QUE ACTUALIZAR FECHA DE CIERRE Y VENCIMIENTO TARJETA CREDITO.
    await redirectCreditCards();

    // REVISAR SI VENCIO ALGUNA CUOTA, MARCARLA COMO VENCIDA (AGREGAR FLAG) Y DEBITAR PLATA.
    payFees();
  };

  const saveTokenPushNotification = async () => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    const resp = await savePNTokenService(token);
  };
  const redirectCreditCards = async () => {
    const creditCards = await getCreditCardsService();
    creditCards.forEach((creditCard) => {
      if (new Date(creditCard.dueDateSummary) < new Date()) {
        Alert.alert(
          "Fechas desactualizadas",
          `Resumen Tarjeta de credito ${creditCard.number} con Fechas desactualizadas`,
          [
            {
              text: "Ir a Actualizar fechas",
              onPress: () =>
                navigation.navigate("ChangeDatesCreditCardPage", {
                  card: creditCard,
                  fromLogin: true,
                }),
            },
          ],
          { cancelable: false }
        );
        return;
      }
    });
  };

  const getAllData = async () => {
    const resp = await getAllDataService();
    saveItem(INCOMES, resp.data.incomes);
    saveItem(EXPENSES, resp.data.expenses);
    saveItem(BANKACCOUNTS, resp.data.bankAccounts);
    saveItem(CREDITCARDS, resp.data.creditCards);
    saveItem(BUDGETS, resp.data.budgets);
    saveItem(LOANS, resp.data.loans);
    saveItem(CREDITCARDMOVEMENTS, resp.data.creditCardMovements);
    saveItem(BANKACCOUNTSMOVEMENTS, resp.data.bankAccountMovements);
  };

  const payFees = () => {
    console.log("to do");
  };

  const login = async () => {
    const resp = await authUserService(email, password);
    if (resp.isSuccess) {
      // Logica al Loguearse
      await initUserConfiguration();
      setLoading(false);
      navigation.navigate("Home");
    } else {
      setMsg(resp.data);
      setLoading(false);
    }
  };

  // Cuando el usuario presiona en iniciar sesión.
  const handleSubmit = async () => {
    //validar
    if (email === "" || password === "") {
      // Mostrar un error
      setMsg("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      // autenticar el usuario
      login();
    } catch (error) {
      setLoading(false);
      setMsg(error.message);
    }
  };

  return (
    <Container style={[globalStyles.container]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>My Budget</H1>
        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Email"
              onChangeText={(texto) => setEmail(texto)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(texto) => setPassword(texto)}
            />
          </Item>
        </Form>
        <AnimatedButton
          disabled={loading}
          text="Iniciar Sesión"
          onPress={() => handleSubmit()}
          disabled={loading}
        />
        {loading && <Spinner color="#000" />}
        <Text
          onPress={() => navigation.navigate("CreateAccount")}
          style={globalStyles.link}
        >
          Crear Cuenta
        </Text>
        <CustomAlert />
      </View>
    </Container>
  );
};

export default LoginPage;
