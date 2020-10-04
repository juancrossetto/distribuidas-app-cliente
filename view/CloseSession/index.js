import React, { useState, useEffect } from "react";
import { View, Alert, Text } from "react-native";
import { Container, Spinner, H1 } from "native-base";
import globalStyles from "../../styles/global";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  BANKACCOUNTS,
  BANKACCOUNTSMOVEMENTS,
  BUDGETS,
  clearAll,
  CREDITCARDMOVEMENTS,
  CREDITCARDS,
  EXPENSES,
  INCOMES,
  INVESTMENTS,
  LOANMOVEMENTS,
  LOANS,
  USERLOGGED,
} from "../../utils/storage";
import { dropTablesAsync, genericSelectAsync } from "../../db";
import {
  formatMillisecondsToDateString,
  getResult,
  isNetworkAvailable,
} from "../../utils";
import {
  createBankAccountMovementService,
  createBankAccountService,
} from "../../services/bankAccountService";
import {
  createLoanMovementService,
  createLoanService,
} from "../../services/loanService";
import {
  createCreditCardMovementService,
  createCreditCardService,
} from "../../services/creditCardService";
import { createInvestmentService } from "../../services/investmentService";
import { createBudgetService } from "../../services/budgetService";
import { createExpenseService } from "../../services/expenseService";
import { createIncomeService } from "../../services/incomeService";
import useAlert from "../../hooks/useAlert";
import AnimatedButton from "../../components/AnimatedButton";
var moment = require("moment");

const CloseSessionPage = () => {
  // State del formulario
  // React Navigation
  const navigation = useNavigation();
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [loadingTitle, setLoadingTitle] = useState("");

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [loans, setLoans] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [bankAccountMovements, setBankAccountMovements] = useState([]);
  const [creditCardMovements, setCreditCardMovements] = useState([]);
  const [loanMovements, setLoanMovements] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getAllDataInMemory();
      setLoading(false);
    }
    return () => {};
  }, [isFocused]);

  const bulkInsertIncomes = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setIncomes, INCOMES);
    console.log("Ingresos a volcar:", incomes.length);
    for (const income of incomes) {
      const resp = await createIncomeService(income);
      if (resp && !resp.isSuccess && resp.data) {
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando los ingresos", false);
    } else {
      const msgSuccess = `${success} Ingresos volcados en BD correctamente`;
      console.log(msgSuccess);
      setLoadingTitle(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const bulkInsertExpenses = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setExpenses, EXPENSES);
    console.log("Egresos a volcar:", expenses.length);
    for (const expense of expenses) {
      const resp = await createExpenseService(expense);
      if (resp && !resp.isSuccess && resp.data) {
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando los egresos", false);
    } else {
      const msgSuccess = `${success} Egresos volcados en BD correctamente`;
      console.log(msgSuccess);
      setLoadingTitle(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const bulkInsertBankAccounts = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setBankAccounts, BANKACCOUNTS);
    console.log("Cuentas Bancarias a volcar:", bankAccounts.length);
    for (const account of bankAccounts) {
      const resp = await createBankAccountService(account);
      if (resp && !resp.isSuccess && resp.data) {
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando las Cuentas Bancarias",
        false
      );
    } else {
      const msgSuccess = `${success} Cuentas Bancarias volcadas en BD correctamente`;
      console.log(msgSuccess);
      setLoadingTitle(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const BulkInsertCreditCards = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setCreditCards, CREDITCARDS);
    console.log("Tarjetas de Crédito a volcar", creditCards.length);
    for (let cc of creditCards) {
      let dueDate = formatMillisecondsToDateString(cc.dueDateSummary);
      let closeDate = formatMillisecondsToDateString(cc.dueDateSummary);
      cc.dueDateSummary = moment(dueDate, "DD-MM-YYYY").format("MM-DD-YYYY");
      cc.closeDateSummary = moment(closeDate, "DD-MM-YYYY").format(
        "MM-DD-YYYY"
      );
      const resp = await createCreditCardService(cc);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando las tarjetas de crédito",
        false
      );
    } else {
      const msgSuccess = `${success} Tarjetas de Credito volcadas en BD correctamente`;
      setLoadingTitle(msgSuccess);
      console.log(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const BulkInsertLoans = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setLoans, LOANS);
    console.log("Prestamos a volcar", loans.length);
    for (const loan of loans) {
      const resp = await createLoanService(loan);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando los Prestamos", false);
    } else {
      const msgSuccess = `${success} Prestamos volcados en BD correctamente`;
      setLoadingTitle(msgSuccess);
      console.log(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const BulkInsertBudgets = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setBudgets, BUDGETS);
    console.log("Prespuestos a volcar", budgets.length);
    for (const budget of budgets) {
      const resp = await createBudgetService(budget);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando los Presupuestos", false);
    } else {
      const msgSuccess = `${success} Presupuestos volcados en BD correctamente`;
      setLoadingTitle(msgSuccess);
      console.log(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const BulkInsertInvestments = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setInvestments, INVESTMENTS);
    console.log("Inversiones a volcar:", investments.length);
    for (const inv of investments) {
      const resp = await createInvestmentService(inv);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando las Inversiones", false);
    } else {
      const msgSuccess = `${success} Inversiones volcadas en BD correctamente`;
      setLoadingTitle(msgSuccess);
      console.log(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const BulkInsertBankAccountMovements = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setBankAccountMovements, BANKACCOUNTSMOVEMENTS);
    console.log(
      "Movimientos de cuenta bancaria a volcar:",
      bankAccountMovements.length
    );
    for (const move of bankAccountMovements) {
      const resp = await createBankAccountMovementService(move);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando los movimientos de cuenta bancaria",
        false
      );
    } else {
      const msgSuccess = `${success} Movimientos de cuenta bancaria volcados en BD correctamente`;
      setLoadingTitle(msgSuccess);
      console.log(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const BulkInsertCreditCardMovements = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setCreditCardMovements, CREDITCARDMOVEMENTS);
    console.log("creditCardMovements", creditCardMovements.length);
    for (const ccMove of creditCardMovements) {
      const resp = await createCreditCardMovementService(ccMove);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando los movimientos de tarjeta de credito",
        false
      );
    } else {
      const msgSuccess = `${success} Movimientos de Tarjeta de Credito volcados en BD correctamente`;
      setLoadingTitle(msgSuccess);
      console.log(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const BulkInsertLoanMovements = async () => {
    let errores = 0;
    let success = 0;
    // await genericSelectAsync(setLoanMovements, LOANMOVEMENTS);
    console.log("loanMovements", loanMovements.length);
    for (const loanMove of loanMovements) {
      const resp = await createLoanMovementService(loanMove);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      } else {
        success = success + 1;
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando los movimientos de tarjeta de credito",
        false
      );
    } else {
      const msgSuccess = `${success} Cuotas de Prestamo volcadas en BD correctamente`;
      setLoadingTitle(msgSuccess);
      console.log(msgSuccess);
      return getResult(msgSuccess, true);
    }
  };

  const createBackUp = async () => {
    // await getAllDataInMemory();
    // await createBackUp();
    try {
      let response = "";
      let hasRegisters = false;
      const networkAvailable = await isNetworkAvailable();
      if (!networkAvailable) {
        response = "No posee conexión a internet, intentelo más tarde";
        return response;
      }

      var start = Date.now();
      const resultIncomes = await bulkInsertIncomes();
      if (!resultIncomes.isSuccess && resultIncomes.data) {
        errors = true;
        response = response + resultIncomes.data;
      }

      const resultExpenses = await bulkInsertExpenses();
      if (!resultExpenses.isSuccess && resultExpenses.data) {
        errors = true;
        response = response + resultExpenses.data;
      }

      const resultBankAccounts = await bulkInsertBankAccounts();
      if (!resultBankAccounts.isSuccess && resultBankAccounts.data) {
        errors = true;
        response = response + resultBankAccounts.data;
      }

      const resultCC = await BulkInsertCreditCards();
      if (!resultCC.isSuccess && resultCC.data) {
        errors = true;
        response = response + resultCC.data;
      }

      const resultLoans = await BulkInsertLoans();
      if (!resultLoans.isSuccess && resultLoans.data) {
        errors = true;
        response = response + resultLoans.data;
      }

      const resultBudgets = await BulkInsertBudgets();
      if (!resultBudgets.isSuccess && resultBudgets.data) {
        errors = true;
        response = response + resultBudgets.data;
      }

      const resultInvestments = await BulkInsertInvestments();
      if (!resultInvestments.isSuccess && resultInvestments.data) {
        errors = true;
        response = response + resultInvestments.data;
      }

      const resultBankAccountMovements = await BulkInsertBankAccountMovements();
      if (
        !resultBankAccountMovements.isSuccess &&
        resultBankAccountMovements.data
      ) {
        errors = true;
        response = response + resultBankAccountMovements.data;
      }

      const resultCreditCardMovements = await BulkInsertCreditCardMovements();
      if (
        !resultCreditCardMovements.isSuccess &&
        resultCreditCardMovements.data
      ) {
        errors = true;
        response = response + resultCreditCardMovements.data;
      }

      const resultLoanMovements = await BulkInsertLoanMovements();
      if (!resultLoanMovements.isSuccess && resultLoanMovements.data) {
        errors = true;
        response = response + resultLoanMovements.data;
      }
      var end = Date.now();
      if (!errors && response === "") {
        // const processTime = end - start;
        // if (processTime > 2000) {
        console.log(`Tiempo de duración de backup: ${processTime} ms`);

        await clearInfo();
        return getResult("BackUp finalizado con exito", true);
      } else {
        await clearInfo();
        return getResult(response, false);
      }
    } catch (error) {
      return getResult(
        `Ocurrieron errores realizando el backup: ${error}`,
        false
      );
    }
  };

  const test = async () => {
    await generateBackUp();
  };
  const closeSession = async () => {
    await getAllDataInMemory().then(
      Alert.alert(
        "Cerrando Sesión",
        "¿Desea generar un backup de la información?",
        [
          {
            text: "Cancelar",
          },

          { text: "Si", onPress: () => generateBackUp() },
          {
            text: "No",
            onPress: () => clearInfo(),
            style: "cancel",
          },
        ],
        { cancelable: false }
      )
    );
  };

  const closeSessionWithoutConnection = async () => {
    Alert.alert(
      "Cerrando Sesión sin Conexión",
      "Usted no tiene conexion, ¿Desea cerrar igualmente la sesión sin guardar la información?",
      [
        { text: "Si", onPress: () => clearInfo() },
        {
          text: "No",
          // onPress: () => clearInfo(),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const generateBackUp = async () => {
    const networkAvailable = await isNetworkAvailable();
    if (!networkAvailable) {
      setMsg("No posee conexión a internet, intentelo más tarde");
      setLoadingTitle("");
      setLoadingText("");
      setLoading(false);
      closeSessionWithoutConnection();
    } else {
      setLoading(true);
      setLoadingText("Generando Backup");
      await createBackUp();
      await clearInfo();
    }
  };

  const getAllDataInMemory = async () => {
    await genericSelectAsync(setIncomes, INCOMES);
    await genericSelectAsync(setExpenses, EXPENSES);
    await genericSelectAsync(setInvestments, INVESTMENTS);
    await genericSelectAsync(setCreditCards, CREDITCARDS);
    await genericSelectAsync(setCreditCardMovements, CREDITCARDMOVEMENTS);
    await genericSelectAsync(setLoans, LOANS);
    await genericSelectAsync(setLoanMovements, LOANMOVEMENTS);
    await genericSelectAsync(setBudgets, BUDGETS);
    await genericSelectAsync(setBankAccounts, BANKACCOUNTS);
    await genericSelectAsync(setBankAccountMovements, BANKACCOUNTSMOVEMENTS);
  };

  const clearInfo = async () => {
    await clearAll();
    await dropTablesAsync("bankaccountmovements");
    await dropTablesAsync("creditcardmovements");
    await dropTablesAsync("bankaccounts");
    await dropTablesAsync("budgets");
    await dropTablesAsync("creditcards");
    await dropTablesAsync("expenses");
    await dropTablesAsync("incomes");
    await dropTablesAsync("investments");
    await dropTablesAsync("loanmovements");
    await dropTablesAsync("loans");

    navigation.navigate("Login");
  };

  return (
    <Container style={[globalStyles.container]}>
      <View style={globalStyles.content}>
        <View style={{ marginTop: 20 }}>
          <View>
            <H1 style={[globalStyles.subtitle, { fontSize: 20 }]}>
              Recuerde que al cerrar Sesión, si no realiza un backup perdera
              toda la información desde su último respaldo
            </H1>
          </View>
          <View>
            <AnimatedButton
              disabled={loading}
              text="Cerrar Sesión"
              onPress={() => closeSession()}
            />
          </View>

          {loading && (
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Spinner color="#000" />
              <Text>{loadingTitle}</Text>
              <Text>{loadingText}</Text>
            </View>
          )}
        </View>
      </View>

      <CustomAlert />
    </Container>
  );
};

export default CloseSessionPage;
