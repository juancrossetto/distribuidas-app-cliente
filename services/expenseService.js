import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { EXPENSES, getItem } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};

export const getExpensesService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/expenses/${email}`);
    if (resp.data.expenses) {
      return resp.data.expenses;
    } else {
      return await getItem(EXPENSES);
    }
  } catch (error) {
    return await getItem(EXPENSES);
  }
};
export const createExpenseService = async (expense) => {
  try {
    const resp = await clientAxios.post(`/expenses/`, expense);
    if (resp) {
      return getResult(`Egreso cargado correctamente`, true);

      //llamar API actualizar saldo cuenta bancaria (si elegimos esa opcion)
    }
  } catch (error) {
    if (error.response.data.msg) {
      return getResult(error.response.data.msg, false);
    } else if (error.response.data.errores) {
      return getResult(error.response.data.errores[0].msg, false);
    } else {
      await addItemToList(EXPENSES, expense);
      return getResult(`Egreso guardado en Memoria`, true);
    }
  }
};
