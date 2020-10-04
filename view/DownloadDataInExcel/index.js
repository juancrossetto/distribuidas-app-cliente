import React, { useState, useEffect } from "react";
import { View, Text, Picker } from "react-native";
import { Container, H1, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import AnimatedButton from "../../components/AnimatedButton";
import { getAllDataService } from "../../services/userService";
import { createExcel } from "../../components/Excel";
import useAlert from "../../hooks/useAlert";
import {
  getItem,
  INCOMES,
  EXPENSES,
  BANKACCOUNTS,
  BANKACCOUNTSMOVEMENTS,
  CREDITCARDS,
  CREDITCARDMOVEMENTS,
  LOANMOVEMENTS,
  LOANS,
  BUDGETS,
  INVESTMENTS,
} from "../../utils/storage";
import { genericSelectAsync } from "../../db";
import { createIncomeService } from "../../services/incomeService";
import {
  getResult,
  isNetworkAvailable,
  formatMillisecondsToDateString,
  formatDate,
} from "../../utils";
import { createExpenseService } from "../../services/expenseService";
import {
  createCreditCardService,
  createCreditCardMovementService,
} from "../../services/creditCardService";
import {
  createBankAccountService,
  createBankAccountMovementService,
} from "../../services/bankAccountService";
import {
  createLoanService,
  createLoanMovementService,
} from "../../services/loanService";
import { createBudgetService } from "../../services/budgetService";
import { createInvestmentService } from "../../services/investmentService";
import { useIsFocused } from "@react-navigation/native";
var moment = require("moment"); // require

const DownloadDataInExcelPage = () => {
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [loadingTitle, setLoadingTitle] = useState("");
  const [CustomAlert, setMsg] = useAlert();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getAllDataInMemory();
      setLoading(false);
    }
    return () => {};
  }, [isFocused]);

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
  const getAllData = async () => {
    setLoading(true);
    // const resp = await getAllDataService();

    // setLoading(false);
    await createExcel(
      incomes,
      expenses,
      investments,
      creditCards,
      creditCardMovements,
      loans,
      loanMovements,
      budgets,
      bankAccountMovements,
      bankAccounts
    );
    setLoading(false);
    // return resp;
  };
  const handlePress = () => {
    if (year.trim() === "") {
      setMsg("Por favor Seleccione el Año");
      return;
    }
    getAllData();
  };

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

  const bulkInsertIncomes = async () => {
    let errores = 0;
    let success = 0;
    // await ;

    await genericSelectAsync(setIncomes, INCOMES);
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
      console.log(`${success} Ingresos volcados en BD correctamente`);
      return getResult("Ingresos volcados en BD correctamente", true);
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
      setLoadingTitle(msgSuccess);
      console.log(msgSuccess);
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
      setLoadingTitle(msgSuccess);
      console.log(msgSuccess);
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
      const msgSuccess = `${success} Movimientos de Tarjeta de Crédito volcados en BD correctamente`;
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
      setTimeout(() => {
        setMsg("Backup Finalizado con éxito");

        setLoadingText("");
        setLoading(false);
      }, 500);

      return getResult(msgSuccess, true);
    }
  };

  const createBackUp = async () => {
    try {
      let response = "";
      const networkAvailable = await isNetworkAvailable();
      if (!networkAvailable) {
        setMsg("No posee conexión a internet, intentelo más tarde");
        setLoadingTitle("");
        setLoadingText("");
        setLoading(false);
        response = "No posee conexión a internet, intentelo más tarde";
        return response;
      }

      // await genericSelectAsync(setIncomes, INCOMES);
      // await genericSelectAsync(setExpenses, EXPENSES);
      // await genericSelectAsync(setInvestments, INVESTMENTS);
      // await genericSelectAsync(setCreditCards, CREDITCARDS);
      // await genericSelectAsync(setCreditCardMovements, CREDITCARDMOVEMENTS);
      // await genericSelectAsync(setLoans, LOANS);
      // await genericSelectAsync(setLoanMovements, LOANMOVEMENTS);
      // await genericSelectAsync(setBudgets, BUDGETS);
      // await genericSelectAsync(setBankAccountMovements, BANKACCOUNTSMOVEMENTS);

      var start = Date.now();
      let errors = false;
      const resultIncomes = bulkInsertIncomes();
      if (!resultIncomes.isSuccess && resultIncomes.data) {
        errors = true;
        response = response + resultIncomes.data;
      }

      const resultExpenses = bulkInsertExpenses();
      if (!resultExpenses.isSuccess && resultExpenses.data) {
        errors = true;
        response = response + resultExpenses.data;
      }

      const resultBankAccounts = bulkInsertBankAccounts();
      if (!resultBankAccounts.isSuccess && resultBankAccounts.data) {
        errors = true;
        response = response + resultBankAccounts.data;
      }

      const resultCC = BulkInsertCreditCards();
      if (!resultCC.isSuccess && resultCC.data) {
        errors = true;
        response = response + resultCC.data;
      }

      const resultLoans = BulkInsertLoans();
      if (!resultLoans.isSuccess && resultLoans.data) {
        errors = true;
        response = response + resultLoans.data;
      }

      const resultBudgets = BulkInsertBudgets();
      if (!resultBudgets.isSuccess && resultBudgets.data) {
        errors = true;
        response = response + resultBudgets.data;
      }

      const resultInvestments = BulkInsertInvestments();
      if (!resultInvestments.isSuccess && resultInvestments.data) {
        errors = true;
        response = response + resultInvestments.data;
      }

      const resultBankAccountMovements = BulkInsertBankAccountMovements();
      if (
        !resultBankAccountMovements.isSuccess &&
        resultBankAccountMovements.data
      ) {
        errors = true;
        response = response + resultBankAccountMovements.data;
      }

      const resultCreditCardMovements = BulkInsertCreditCardMovements();
      if (
        !resultCreditCardMovements.isSuccess &&
        resultCreditCardMovements.data
      ) {
        errors = true;
        response = response + resultCreditCardMovements.data;
      }

      const resultLoanMovements = BulkInsertLoanMovements();
      if (!resultLoanMovements.isSuccess && resultLoanMovements.data) {
        errors = true;
        response = response + resultLoanMovements.data;
      }
      var end = Date.now();
      if (!errors && response === "") {
        const processTime = end - start;
        // if (
        //   (!incomes || incomes.length === 0) &&
        //   (!expenses || expenses.length === 0) &&
        //   (!creditCards || creditCards.length === 0) &&
        //   (!creditCardMovements || creditCardMovements.length === 0) &&
        //   (!bankAccounts || bankAccounts.length === 0) &&
        //   (!bankAccountMovements || bankAccountMovements.length === 0) &&
        //   (!loans || loans.length === 0) &&
        //   (!loanMovements || loanMovements.length === 0) &&
        //   (!budgets || budgets.length === 0) &&
        //   (!investments || investments.length === 0)
        // ) {
        //   console.log(
        //     "------ No se encontro información para respaldar ------"
        //   );
        //   return getResult(
        //     "------ No se encontro información para respaldar ------",
        //     true
        //   );
        // }
        console.log(`Tiempo de duración de backup: ${processTime} ms`);
        // return getResult("Proceso Finalizado OK", true);
        // return getResult("BackUp finalizado con exito", true);
      } else {
        return getResult(response, false);
      }
    } catch (error) {
      return getResult(
        `Ocurrieron errores realizando el backup: ${error}`,
        false
      );
    }
  };
  const handleBackup = async () => {
    try {
      const networkAvailable = await isNetworkAvailable();
      if (!networkAvailable) {
        setMsg("No posee conexión a internet, intentelo más tarde");
        setLoadingTitle("");
        setLoadingText("");
        setLoading(false);
      } else {
        const resp = await createBackUp();
        setLoading(true);
        setLoadingText("Generando Backup");
      }
    } catch (error) {
      setLoading(false);
      setLoadingText("");
      setLoadingTitle("");
      setMsg("Ocurrio un error, por favor revise su conexión");
    }
  };

  const handleSelectYear = async (e) => {
    await getAllDataInMemory();
    setYear(e);
  };

  return (
    <Container style={[globalStyles.container]}>
      <View style={{ marginHorizontal: 5, flex: 1, marginTop: 30 }}>
        <H1 style={globalStyles.subtitle}>
          Descarga de Información en formato Excel
        </H1>
        <View>
          <Picker
            style={{
              height: 50,
              backgroundColor: "#FFF",
              marginHorizontal: 10,
            }}
            selectedValue={year}
            onValueChange={(e) => handleSelectYear(e)}
          >
            <Picker.Item label="-- Seleccione un Año --" value="" />
            <Picker.Item label={"2020"} value={"2020"} />
            {/* <Picker.Item label={"2021"} value={"2021"} />
            <Picker.Item label={"2022"} value={"2022"} /> */}
          </Picker>
        </View>
        <View style={{ marginTop: 20 }}>
          <AnimatedButton
            disabled={loading}
            text="Descargar Excel"
            onPress={() => handlePress()}
          />
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
        <View style={{ marginHorizontal: 5, flex: 1, marginTop: 30 }}>
          <H1 style={globalStyles.subtitle}>
            Volcar Información en Base de Datos
          </H1>
          <View style={{ marginTop: 20 }}>
            <AnimatedButton
              disabled={loading}
              text="Generar Backup"
              onPress={() => handleBackup()}
            />
          </View>
          {loading && (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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

export default DownloadDataInExcelPage;
