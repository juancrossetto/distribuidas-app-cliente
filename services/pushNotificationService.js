import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
// import { saveItem, getItem, USERLOGGED } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};
export const savePNTokenService = async (token) => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.post(`/pushNotifications/`, {
      token,
      email,
    });
    if (resp.data) {
      return getResult(resp.data, true);
    } else {
      return getResult(`Error al Crear el Token de Notificación.`, false);
    }
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.msg
    ) {
      return getResult(error.response.data.msg, false);
    } else {
      return getResult("Error al Crear el Token de Notificación", false);
    }
  }
};
