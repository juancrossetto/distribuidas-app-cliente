import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { addItemToList, getItem, LOANS } from "../utils/storage";
import { updateBankAccountBalanceService } from "./bankAccountService";

const getEmail = async () => {
  return await getEmailUserLogged();
};
export const getLoansService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/loans/${email}`);
    if (resp.data.loans) {
      return resp.data.loans;
    } else {
      return await getItem(LOANS);
    }
  } catch (error) {
    return await getItem(LOANS);
  }
};

export const createLoanService = async (loan) => {
  try {
    const resp = await clientAxios.post(`/loans/`, loan);

    const { bankAccount, amount, paymentMethod } = resp.data.loan;

    if (paymentMethod === "BAN") {
      //llama API actualizar saldo cuenta bancaria
      const type =
        loan.type === "TOM" ? "Prestamo Tomado" : "Prestamo Realizado";
      const calculatedAmount = loan.type === "TOM" ? amount : amount * -1;
      const changeBalance = await updateBankAccountBalanceService(
        bankAccount,
        calculatedAmount,
        type
      );
      if (!changeBalance.isSuccess) {
        return getResult(
          `Hubo un error al actualizar el saldo: ${changeBalance.msg}`,
          true
        );
      }
    }
    return getResult(`Presupuesto cargado correctamente`, true);
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
      await addItemToList(LOANS, loan);
      return getResult(`Prestamo guardado en Memoria`, true);
    }
  }
};
