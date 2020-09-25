import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getNameUserLogged, getResult } from "../utils";
// import { saveItem, getItem, USERLOGGED } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};
const getName = async () => {
  return await getNameUserLogged();
};

export const savePNTokenService = async (token) => {
  try {
    const email = await getEmail();
    const name = await getName();
    const resp = await clientAxios.post(`/pushNotifications/`, {
      token,
      email,
      name,
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
