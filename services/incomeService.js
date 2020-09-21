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
    const resp = await clientAxios.post(`/incomes/`, income);

    if (resp && resp.data && resp.data.income) {
      const { id, amount } = resp.data.income;
      //llamar API actualizar saldo cuenta bancaria (si elegimos esa opcion)
      const changeBalance = true;
      // await clientAxios.put(
      //   `/bankaccounts/changeBalance/`,
      //   { id, amount }
      // );
      if (changeBalance) {
        return getResult(`Ingreso cargado correctamente`, true);
      } else {
        return getResult(`Hubo un error al actualizar el saldo`, true);
      }
    }
  } catch (error) {
    console.log(error);
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
