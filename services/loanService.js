import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { getItem, LOANS } from "../utils/storage";

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

    if (resp && resp.data && resp.data.loan) {
      //   const { id, amount } = resp.data.loan;
      //llamar API actualizar saldo cuenta bancaria (si elegimos esa opcion)
      const changeBalance = true;
      if (changeBalance) {
        return getResult(`Prestamo cargado correctamente`, true);
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
      await addItemToList(LOANS, loan);
      return getResult(`Prestamo guardado en Memoria`, true);
    }
  }
};
