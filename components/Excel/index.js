import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const createExcel = async (
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
) => {
  var wb = XLSX.utils.book_new();
  /*Ingresos */
  var wsIncomes = XLSX.utils.json_to_sheet(incomes);
  XLSX.utils.book_append_sheet(wb, wsIncomes, "Ingresos");

  /*Egresos*/
  var wsExpenses = XLSX.utils.json_to_sheet(expenses);
  XLSX.utils.book_append_sheet(wb, wsExpenses, "Egresos");

  /*Cuentas Bancarias*/
  var wsBankAccounts = XLSX.utils.json_to_sheet(bankAccounts);
  XLSX.utils.book_append_sheet(wb, wsBankAccounts, "Cuentas Bancarias");

  /*Movimientos Cuenta Bancarias*/
  var wsBankAccountsMovements = XLSX.utils.json_to_sheet(bankAccountMovements);
  XLSX.utils.book_append_sheet(
    wb,
    wsBankAccountsMovements,
    "Mov. Cuentas Bancarias"
  );

  /*Tarjetas de Credito*/
  var wsCreditCardMovements = XLSX.utils.json_to_sheet(creditCardMovements);
  XLSX.utils.book_append_sheet(
    wb,
    wsCreditCardMovements,
    "Mov. Tarjetas de Crédito"
  );

  /*Movimientos de Tarjetas de Credito*/
  var wsCreditCards = XLSX.utils.json_to_sheet(creditCards);
  XLSX.utils.book_append_sheet(wb, wsCreditCards, "Tarjetas de Crédito");

  /*Presupuestos*/
  var wsBudgets = XLSX.utils.json_to_sheet(budgets);
  XLSX.utils.book_append_sheet(wb, wsBudgets, "Presupuestos");

  /*Prestamos*/
  var wsLoans = XLSX.utils.json_to_sheet(loans);
  XLSX.utils.book_append_sheet(wb, wsLoans, "Prestamos");

  /*Cuotas Prestamos*/
  var wsLoanMovements = XLSX.utils.json_to_sheet(loanMovements);
  XLSX.utils.book_append_sheet(wb, wsLoanMovements, "Cuotas Prestamos");

  /* Inversiones*/
  var wsInvestments = XLSX.utils.json_to_sheet(investments);
  XLSX.utils.book_append_sheet(wb, wsInvestments, "Inversiones");

  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  const uri = FileSystem.cacheDirectory + "myBudgetApp.xlsx";
  // console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });
  // FileSystem.readAsStringAsync(uri);
  // FileSystem.downloadAsync();
  // const a = await FileSystem.getInfoAsync(uri);

  // await downloadFile(uri);
  await Sharing.shareAsync(uri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "My Budget App data",
    UTI: "com.microsoft.excel.xlsx",
  });
};
