import React from "react";
import clientAxios from "../config/axios";
import {
  insertIncomeInMemoryAsync,
  updateBankAccountBalanceAsync,
} from "../db";
import { getEmailUserLogged, getResult, formatDate } from "../utils";
import { getItem, INCOMES } from "../utils/storage";
import { updateBankAccountBalanceService } from "./bankAccountService";

const getEmail = async () => {
  return await getEmailUserLogged();
};

export const getIncomesService = async () => {
  try {
    // const incomesInMemory = await getItem(INCOMES);

    const email = await getEmail();
    const resp = await clientAxios.get(`/incomes/${email}`);
    if (resp.data.incomes) {
      return resp.data.incomes;
    }
  } catch (error) {
    console.log(error);
    //return incomesInMemory;
  }
};

export const createIncomeInMemory = async (income, bankAccountBalance) => {
  try {
    const resp = await insertIncomeInMemoryAsync(income);
    if (resp.isSuccess) {
      if (income.paymentMethod === "BAN") {
        const response = updateBankAccountBalanceAsync(
          income.bankAccount,
          income.amount,
          "Ingreso",
          income.email,
          parseInt(bankAccountBalance) + parseInt(income.amount)
        );
        if (response && !response.isSuccess && response.data) {
          return getResult(response.data, false);
        }
      }
      return getResult("Ingreso cargado en memoria", true);
    }
  } catch (error) {
    return getResult("Ocurrio un error al cargar el Ingreso en memoria", false);
  }
};
export const createIncomeService = async (income) => {
  try {
    const resp = await clientAxios.post(`/incomes/`, income);
    if (resp && resp.data && resp.data.income) {
      // const { bankAccount, amount, paymentMethod } = resp.data.income;

      // if (paymentMethod === "BAN") {
      //   const changeBalance = await updateBankAccountBalanceService(
      //     bankAccount,
      //     amount,
      //     "Ingreso"
      //   );
      //   if (!changeBalance.isSuccess) {
      //     return getResult(
      //       `Hubo un error al actualizar el saldo: ${changeBalance.msg}`,
      //       true
      //     );
      //   }
      // }

      // insertIncomeInMemoryAsync(income);
      return getResult(`Ingreso cargado correctamente`, true);
    }
  } catch (error) {
    console.log("error", error);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.msg
    ) {
      console.log("errorr 2", error.response.data.msg);
      return getResult(error.response.data.msg, false);
    } else if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.errores
    ) {
      console.log("errorr 3");
      return getResult(error.response.data.errores[0].msg, false);
    } else {
      console.log("errorr 4");
      return getResult(`Ingreso guardado en Memoria`, true);
    }
  }
};
