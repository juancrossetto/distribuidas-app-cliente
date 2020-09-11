import React, { useState, useEffect } from "react";
// import { Toast } from "native-base";
// import { Alert } from "react-native";
import { ToastAndroid, Platform } from "react-native";
// import Snackbar from "react-native-snackbar";
const useAlert = () => {
  const [msg, setMsg] = useState("");
  console.log(Platform.OS);
  useEffect(() => {
    if (msg !== "") {
      setMsg("");
    }
  }, [msg]);
  const CustomAlert = () => (
    <>
      {msg !== "" && [
        // Platform.OS !== "android"
        //   ? Snackbar.show({
        //       text: msg,
        //       duration: Snackbar.LENGTH_LONG,
        //     })
        //   :
        ToastAndroid.show(msg, ToastAndroid.SHORT),
      ]}
    </>
  );
  return [CustomAlert, setMsg];
};

useAlert.defaultProps = {
  message: "",
};
export default useAlert;
