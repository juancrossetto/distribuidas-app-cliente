import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
// var RNFS = require("react-native-fs");

// export const testt2 = async () => {
//   var path = RNFS.DocumentDirectoryPath + "/test.txt";

//   // write the file
//   RNFS.writeFile(path, "Lorem ipsum dolor sit amet", "utf8")
//     .then((success) => {
//       console.log("FILE WRITTEN!");
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

export const createExcel = async (data) => {
  // var data = [
  //   {
  //     name: "John",
  //     city: "Seattle",
  //   },
  //   {
  //     name: "Mike",
  //     city: "Los Angeles",
  //   },
  //   {
  //     name: "Zach",
  //     city: "New York",
  //   },
  // ];
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "PresupAppData");
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

const downloadFile = async (url) => {
  // let path = url.split("/");
  // const file_name = path[path.length - 1];
  FileSystem.downloadAsync(url, FileSystem.documentDirectory + "presupApp.xlsx")
    .then(({ uri }) => {
      console.log("Finished downloading to ", uri);
      MediaLibrary.createAssetAsync(uri).then((asset) => {
        MediaLibrary.createAlbumAsync("myfolder", asset)
          .then(() => {
            showMessage({
              message: t("general.success"),
              description: t("download.success"),
              type: "success",
            });
          })
          .catch((error) => {
            showMessage({
              message: t("general.success"),
              description: t("download.failed"),
              type: "danger",
            });
          });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
