import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const createExcel = async (data) => {
  var wb = XLSX.utils.book_new();
  /*Ingresos */
  var wsIncomes = XLSX.utils.json_to_sheet(data.incomes);
  XLSX.utils.book_append_sheet(wb, wsIncomes, "Ingresos");

  /*Egresos*/
  var wsExpenses = XLSX.utils.json_to_sheet(data.expenses);
  XLSX.utils.book_append_sheet(wb, wsExpenses, "Egresos");

  /*Cuentas Bancarias*/
  var wsBankAccounts = XLSX.utils.json_to_sheet(data.bankAccounts);
  XLSX.utils.book_append_sheet(wb, wsBankAccounts, "Cuentas Bancarias");

  /*Tarjetas de Credito*/
  var wsCreditCards = XLSX.utils.json_to_sheet(data.creditCards);
  XLSX.utils.book_append_sheet(wb, wsCreditCards, "Tarjetas de Crédito");

  /*Presupuestos*/
  var wsBudgets = XLSX.utils.json_to_sheet(data.budgets);
  XLSX.utils.book_append_sheet(wb, wsBudgets, "Presupuestos");

  /*Prestamos*/
  var wsLoans = XLSX.utils.json_to_sheet(data.loans);
  XLSX.utils.book_append_sheet(wb, wsLoans, "Prestamos");

  /* Inversiones*/
  var wsInvestments = XLSX.utils.json_to_sheet(data.investments);
  XLSX.utils.book_append_sheet(wb, wsInvestments, "Inversiones");

  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  const uri = FileSystem.cacheDirectory + "presupApp.xlsx";
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
    dialogTitle: "PresupApp data",
    UTI: "com.microsoft.excel.xlsx",
  });
};

// const downloadFile = async (url) => {
//   // let path = url.split("/");
//   // const file_name = path[path.length - 1];
//   FileSystem.downloadAsync(url, FileSystem.documentDirectory + "presupApp.xlsx")
//     .then(({ uri }) => {
//       console.log("Finished downloading to ", uri);
//       MediaLibrary.createAssetAsync(uri).then((asset) => {
//         MediaLibrary.createAlbumAsync("myfolder", asset)
//           .then(() => {
//             showMessage({
//               message: t("general.success"),
//               description: t("download.success"),
//               type: "success",
//             });
//           })
//           .catch((error) => {
//             showMessage({
//               message: t("general.success"),
//               description: t("download.failed"),
//               type: "danger",
//             });
//           });
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
