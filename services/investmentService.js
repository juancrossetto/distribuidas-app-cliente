import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { addItemToList, getItem, INVESTMENTS } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};
export const getInvestmentsService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/investments/${email}`);
    if (resp.data.investments) {
      return resp.data.investments;
    } else {
      return await getItem(INVESTMENTS);
    }
  } catch (error) {
    return await getItem(INVESTMENTS);
  }
};

export const createInvestmentService = async (investment) => {
  try {
    const resp = await clientAxios.post(`/investments/`, investment);
    if (resp && resp.data && resp.data.investment) {
      return getResult(`Inversión cargada correctamente`, true);
    }
  } catch (error) {
    console.log(error);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.msg
    ) {
      return getResult(error.response.data.msg, false);
    } else if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.errores
    ) {
      return getResult(error.response.data.errores[0].msg, false);
    } else {
      await addItemToList(INVESTMENTS, investment);
      return getResult(`Inversión guardada en Memoria`, true);
    }
  }
};
