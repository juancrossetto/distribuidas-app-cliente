import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { addItemToList, getItem, INVESTMENTS } from "../utils/storage";
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
      if (investment.type === "Plazo Fijo") {
        //llama API actualizar saldo cuenta bancaria
        console.log("probando");
        const changeBalance = await updateBankAccountBalanceService(
          investment.bankAccount,
          investment.amount * -1,
          "Plazo Fijo"
        );
        console.log(investment.bankAccount, investment.amount * -1);
        if (!changeBalance.isSuccess) {
          return getResult(
            `Hubo un error al actualizar el saldo: ${changeBalance.msg}`,
            true
          );
        }
      }
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
