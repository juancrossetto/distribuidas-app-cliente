import React from "react";
import clientAxios from "../config/axios";
import {
  insertInvestmentInMemoryAsync,
  updateBankAccountBalanceAsync,
} from "../db";
import { getEmailUserLogged, getResult } from "../utils";
import { getItem, INVESTMENTS } from "../utils/storage";
import { updateBankAccountBalanceService } from "./bankAccountService";

const getEmail = async () => {
  return await getEmailUserLogged();
};
export const getInvestmentsService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/investments/${email}`);
    if (resp.data.investments) {
      return resp.data.investments;
    }
  } catch (error) {
    console.log("Error obteniendo Inversiones", error);
  }
};

export const createInvestmentInMemory = async (
  investment,
  bankAccountBalance
) => {
  try {
    const resp = await insertInvestmentInMemoryAsync(investment);
    console.log(resp, investment.type);
    if (resp.isSuccess) {
      if (investment.type === "Plazo Fijo") {
        const response = updateBankAccountBalanceAsync(
          investment.bankAccount,
          investment.amount * -1,
          "Plazo Fijo",
          investment.email,
          parseInt(bankAccountBalance) + parseInt(investment.amount) * -1
        );
        if (response && !response.isSuccess && response.data) {
          return getResult(response.data, false);
        }
      }
      return getResult("Inversión cargada en memoria", true);
    }
  } catch (error) {
    return getResult(
      "Ocurrio un error al cargar la Inversion en memoria",
      false
    );
  }
};

export const createInvestmentService = async (investment) => {
  try {
    const resp = await clientAxios.post(`/investments/`, investment);
    if (resp && resp.data && resp.data.investment) {
      // if (investment.type === "Plazo Fijo") {
      //   //llama API actualizar saldo cuenta bancaria
      //   const changeBalance = await updateBankAccountBalanceService(
      //     investment.bankAccount,
      //     investment.amount * -1,
      //     "Plazo Fijo"
      //   );
      //   if (!changeBalance.isSuccess) {
      //     return getResult(
      //       `Hubo un error al actualizar el saldo: ${changeBalance.msg}`,
      //       true
      //     );
      //   }
      // }
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
      return getResult(`Inversión guardada en Memoria`, true);
    }
  }
};
