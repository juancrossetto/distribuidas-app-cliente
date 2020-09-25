import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { addItemToList, getItem, BUDGETS } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};
export const getBudgetsService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/budgets/${email}`);
    if (resp.data.budgets) {
      return resp.data.budgets;
    } else {
      return await getItem(BUDGETS);
    }
  } catch (error) {
    return await getItem(BUDGETS);
  }
};

export const createBudgetService = async (budget) => {
  try {
    const resp = await clientAxios.post(`/budgets/`, budget);

    if (resp && resp.data && resp.data.budget) {
      const changeBalance = true;
      if (changeBalance) {
        return getResult(`Presupuesto cargado correctamente`, true);
      } else {
        return getResult(`Hubo un error al actualizar el saldo`, true);
      }
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
      await addItemToList(BUDGETS, budget);
      return getResult(`Presupuesto guardado en Memoria`, true);
    }
  }
};
