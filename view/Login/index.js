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
import {
  getCreditCardsService,
  getCreditCardMovementsService,
} from "../../services/creditCardService";
import {
  createTablesAsync,
  insertBankAccountInMemoryAsync,
  insertBankAccountMovementInMemoryAsync,
  insertBudgetInMemoryAsync,
  insertCreditCardInMemoryAsync,
  insertExpenseInMemoryAsync,
  insertIncomeInMemoryAsync,
  insertInvestmentInMemoryAsync,
  insertLoanInMemoryAsync,
} from "../../db";
import { getIncomesService } from "../../services/incomeService";
import { getExpensesService } from "../../services/expenseService";
import {
  getBankAccountMovementsService,
  getBankAccountsService,
} from "../../services/bankAccountService";
import { getLoansService } from "../../services/loanService";
import { getBudgetsService } from "../../services/budgetService";
import { getInvestmentsService } from "../../services/investmentService";
// import * as SQLite from "expo-sqlite";
// import {
//   createTablesAsync,
// } from "../../db";
// const db = SQLite.openDatabase("mybudget.db");

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

  const getDataFromServer = async () => {
    try {
      const incomes = await getIncomesService();
      // console.log("incomes del svr", incomes);
      for (const income of incomes) {
        const milliseconds = new Date(income.date);
        income.date = milliseconds.getTime();
        await insertIncomeInMemoryAsync(income);
      }
      console.log("1");
      const expenses = await getExpensesService();
      // console.log("expenses del svr", expenses);
      for (const exp of expenses) {
        const milliseconds = new Date(exp.date);
        exp.date = milliseconds.getTime();
        await insertExpenseInMemoryAsync(exp);
      }

      console.log("2");
      const bankAccounts = await getBankAccountsService();
      // console.log("bank accounts del svr", bankAccounts);
      for (const account of bankAccounts) {
        const milliseconds = new Date(account.date);
        account.date = milliseconds.getTime();
        await insertBankAccountInMemoryAsync(account);
      }

      console.log("3");
      const creditCards = await getCreditCardsService();
      // console.log("credit cards del svr", creditCards);
      for (const cc of creditCards) {
        const milliseconds = new Date(cc.date);
        cc.date = milliseconds.getTime();
        cc.dueDateSummary = new Date(cc.dueDateSummary).getTime();
        cc.closeDateSummary = new Date(cc.closeDateSummary).getTime();
        await insertCreditCardInMemoryAsync(cc);
      }

      console.log("4");
      const loans = await getLoansService();
      // console.log("loans del svr", loans);
      for (const loan of loans) {
        const milliseconds = new Date(loan.date);
        loan.date = milliseconds.getTime();
        await insertLoanInMemoryAsync(loan);
      }

      console.log("5");
      const budgets = await getBudgetsService();
      // console.log("budgets del svr", budgets);
      for (const budget of budgets) {
        const milliseconds = new Date(budget.date);
        budget.date = milliseconds.getTime();
        await insertBudgetInMemoryAsync(budget);
      }

      console.log("6");
      const investments = await getInvestmentsService();
      // console.log("investments del svr", investments);
      for (const inv of investments) {
        const milliseconds = new Date(inv.date);
        inv.date = milliseconds.getTime();
        inv.dueDate = new Date(inv.dueDate).getTime();
        await insertInvestmentInMemoryAsync(inv);
      }

      console.log("7");

      const creditCardMovements = await getCreditCardMovementsService();
      if (creditCardMovements && creditCardMovements.length > 0) {
        for (const move of creditCardMovements) {
          const milliseconds = new Date(move.dueDate);
          move.dueDate = milliseconds.getTime();
          await insertBankAccountMovementInMemoryAsync(move);
        }
      }
      console.log("8");
      const bankAccountMovements = await getBankAccountMovementsService();
      // console.log("bankAccountMovements del svr", bankAccountMovements);
      if (bankAccountMovements && bankAccountMovements.length > 0) {
        for (const move of bankAccountMovements) {
          const milliseconds = new Date(move.date);
          move.date = milliseconds.getTime();
          await insertBankAccountMovementInMemoryAsync(move);
        }
      }
      console.log("9");
    } catch (error) {
      console.log(
        "Ocurrio un error con la Obtención de Info desde el servidor",
        error
      );
    }
  };

  const initUserConfiguration = async () => {
    await createTablesAsync();

    await getDataFromServer();

    // Guardar token para push notification en la base
    await saveTokenPushNotification();

    //Obtener toda la informacion
    await getAllData();

    // REVISAR SI HA QUE ACTUALIZAR FECHA DE CIERRE Y VENCIMIENTO TARJETA CREDITO.
    await redirectCreditCards();
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
