import React, { useState } from "react";
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
var moment = require("moment"); // require

const DownloadDataInExcelPage = () => {
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const getAllData = async () => {
    setLoading(true);
    const resp = await getAllDataService();
    setLoading(false);
    createExcel(resp.data);
    return resp;
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
    await genericSelectAsync(setIncomes, INCOMES);
    for (const income of incomes) {
      const resp = await createIncomeService(income);
      if (resp && !resp.isSuccess && resp.data) {
        errores = errores + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando los ingresos", false);
    } else {
      return getResult("Ingresos volcados en BD correctamente", true);
    }
  };

  const bulkInsertExpenses = async () => {
    let errores = 0;
    await genericSelectAsync(setExpenses, EXPENSES);
    for (const expense of expenses) {
      const resp = await createExpenseService(expense);
      if (resp && !resp.isSuccess && resp.data) {
        errores = errores + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando los egresos", false);
    } else {
      return getResult("Egresos volcados en BD correctamente", true);
    }
  };

  const bulkInsertBankAccounts = async () => {
    let errores = 0;
    await genericSelectAsync(setBankAccounts, BANKACCOUNTS);
    for (const account of bankAccounts) {
      const resp = await createBankAccountService(account);
      if (resp && !resp.isSuccess && resp.data) {
        errores = errores + 1;
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando las Cuentas Bancarias",
        false
      );
    } else {
      return getResult("Cuentas Bancarias volcadas en BD correctamente", true);
    }
  };

  const BulkInsertCreditCards = async () => {
    let errores = 0;
    await genericSelectAsync(setCreditCards, CREDITCARDS);
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
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando las tarjetas de crédito",
        false
      );
    } else {
      return getResult(
        "Tarjetas de Credito volcadas en BD correctamente",
        true
      );
    }
  };

  const BulkInsertLoans = async () => {
    let errores = 0;
    await genericSelectAsync(setLoans, LOANS);
    for (const loan of loans) {
      const resp = await createLoanService(loan);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando los Prestamos", false);
    } else {
      return getResult("Prestamos volcadas en BD correctamente", true);
    }
  };

  const BulkInsertBudgets = async () => {
    let errores = 0;
    await genericSelectAsync(setBudgets, BUDGETS);
    for (const budget of budgets) {
      const resp = await createBudgetService(budget);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando los Presupuestos", false);
    } else {
      return getResult("Presupuestos volcadas en BD correctamente", true);
    }
  };

  const BulkInsertInvestments = async () => {
    let errores = 0;
    await genericSelectAsync(setInvestments, INVESTMENTS);
    for (const inv of investments) {
      const resp = await createInvestmentService(inv);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      }
    }
    if (errores > 0) {
      return getResult("Ocurrieron errores insertando las Inversiones", false);
    } else {
      return getResult("Inversiones volcadas en BD correctamente", true);
    }
  };

  const BulkInsertBankAccountMovements = async () => {
    let errores = 0;
    await genericSelectAsync(setBankAccountMovements, BANKACCOUNTSMOVEMENTS);
    // console.log("bankAccountMovements", bankAccountMovements.length);
    for (const move of bankAccountMovements) {
      const resp = await createBankAccountMovementService(move);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando los movimientos de cuenta bancaria",
        false
      );
    } else {
      return getResult(
        "movimientos de cuenta bancaria volcadas en BD correctamente",
        true
      );
    }
  };

  const BulkInsertCreditCardMovements = async () => {
    let errores = 0;
    await genericSelectAsync(setCreditCardMovements, CREDITCARDMOVEMENTS);
    // console.log("creditCardMovements", creditCardMovements.length);
    for (const ccMove of creditCardMovements) {
      const resp = await createCreditCardMovementService(ccMove);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando los movimientos de tarjeta de credito",
        false
      );
    } else {
      return getResult(
        "movimientos de tarjeta de credito volcadas en BD correctamente",
        true
      );
    }
  };

  const BulkInsertLoanMovements = async () => {
    let errores = 0;
    await genericSelectAsync(setLoanMovements, LOANMOVEMENTS);
    console.log("loanMovements", loanMovements.length);
    for (const loanMove of loanMovements) {
      const resp = await createLoanMovementService(loanMove);
      if (resp && !resp.isSuccess && resp.data) {
        console.log(resp.data);
        errores = errores + 1;
      }
    }
    if (errores > 0) {
      return getResult(
        "Ocurrieron errores insertando los movimientos de tarjeta de credito",
        false
      );
    } else {
      return getResult(
        "movimientos de tarjeta de credito volcadas en BD correctamente",
        true
      );
    }
  };

  const handleBackup = async () => {
    try {
      const networkAvailable = await isNetworkAvailable();
      if (!networkAvailable) {
        setMsg("No posee conexión a internet, intentelo más tarde");
        return;
      }
      setLoading(true);
      let errors = false;
      const resultIncomes = await bulkInsertIncomes();
      if (!resultIncomes.isSuccess && resultIncomes.data) {
        errors = true;
        setMsg(resultIncomes.data);
      }

      const resultExpenses = await bulkInsertExpenses();
      if (!resultExpenses.isSuccess && resultExpenses.data) {
        errors = true;
        setMsg(resultExpenses.data);
      }

      const resultBankAccounts = await bulkInsertBankAccounts();
      if (!resultBankAccounts.isSuccess && resultBankAccounts.data) {
        errors = true;
        setMsg(resultBankAccounts.data);
      }

      const resultCC = await BulkInsertCreditCards();
      if (!resultCC.isSuccess && resultCC.data) {
        errors = true;
        setMsg(resultCC.data);
      }

      const resultLoans = await BulkInsertLoans();
      if (!resultLoans.isSuccess && resultLoans.data) {
        errors = true;
        setMsg(resultLoans.data);
      }

      const resultBudgets = await BulkInsertBudgets();
      if (!resultBudgets.isSuccess && resultBudgets.data) {
        errors = true;
        setMsg(resultBudgets.data);
      }

      const resultInvestments = await BulkInsertInvestments();
      if (!resultInvestments.isSuccess && resultInvestments.data) {
        errors = true;
        setMsg(resultInvestments.data);
      }

      const resultBankAccountMovements = await BulkInsertBankAccountMovements();
      if (
        !resultBankAccountMovements.isSuccess &&
        resultBankAccountMovements.data
      ) {
        errors = true;
        setMsg(resultBankAccountMovements.data);
      }

      const resultCreditCardMovements = await BulkInsertCreditCardMovements();
      if (
        !resultCreditCardMovements.isSuccess &&
        resultCreditCardMovements.data
      ) {
        errors = true;
        setMsg(resultCreditCardMovements.data);
      }

      const resultLoanMovements = await BulkInsertLoanMovements();
      if (!resultLoanMovements.isSuccess && resultLoanMovements.data) {
        errors = true;
        setMsg(resultLoanMovements.data);
      }

      if (!errors) {
        setMsg("BackUp finalizado con exito");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMsg(
        "Ocurrieron errores realizando el backup, verifique su conexion",
        error
      );
    }
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
            onValueChange={(e) => setYear(e)}
          >
            <Picker.Item label="-- Seleccione un Año --" value="" />
            <Picker.Item label={"2020"} value={"2020"} />
            <Picker.Item label={"2021"} value={"2021"} />
            <Picker.Item label={"2022"} value={"2022"} />
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
        </View>
      </View>

      {loading && (
        <View>
          <Spinner color="#000" />
        </View>
      )}
      {/* {year ? <View style={[{ flex: 8 }]}></View> : null} */}
      <CustomAlert />
    </Container>
  );
};

export default DownloadDataInExcelPage;
