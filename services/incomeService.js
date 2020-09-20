import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { getItem, INCOMES } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};
export const getIncomesService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/incomes/${email}`);
    if (resp.data.incomes) {
      return resp.data.incomes;
    } else {
      return await getItem(INCOMES);
    }
  } catch (error) {
    return await getItem(INCOMES);
  }
};

export const createIncomeService = async (income) => {
  try {
    console.log(income);
    const resp = await clientAxios.post(`/incomes/`, income);

    if (resp) {
      return getResult(`Ingreso cargado correctamente`, true);

      //llamar API actualizar saldo cuenta bancaria (si elegimos esa opcion)
    }
  } catch (error) {
    if (error.response.data.msg) {
      return getResult(error.response.data.msg, false);
    } else if (error.response.data.errores) {
      return getResult(error.response.data.errores[0].msg, false);
    } else {
      await addItemToList(INCOMES, income);
      return getResult(`Ingreso guardado en Memoria`, true);
    }
  }
};
