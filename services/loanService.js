import React from "react";
import clientAxios from "../config/axios";
import {
  insertLoanInMemoryAsync,
  insertLoanMovementInMemoryAsync,
  selectExpenseIdAsync,
  updateBankAccountBalanceAsync,
} from "../db";
import {
  getEmailUserLogged,
  getResult,
  addMonthCurrentDate,
  formatDateStringToMilliseconds,
} from "../utils";
import { getItem, LOANS } from "../utils/storage";
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
    }
  } catch (error) {
    console.log("Error obteniendo prestamos", error);
  }
};

export const createLoanInMemory = async (loan, bankAccountBalance) => {
  try {
    const resp = await insertLoanInMemoryAsync(loan);
    if (resp.isSuccess) {
      if (loan.paymentMethod === "BAN" && loan.type === "TOM") {
        // Ir a buscar el ultimo loan
        const loanId = await selectExpenseIdAsync(
          LOANS,
          "ORDER BY id DESC LIMIT 1;"
        );

        // Crear un movimiento por cada cuota
        const feeAmount = loan.amount / loan.fees;
        for (let fee = 1; fee <= loan.fees; fee++) {
          let dateFee = addMonthCurrentDate(fee);
          let dateFeeFormated = formatDateStringToMilliseconds(
            dateFee,
            "DD-MM-YYYY"
          );
          insertLoanMovementInMemoryAsync(
            loan.bankAccount,
            fee,
            feeAmount,
            loanId,
            "false",
            loan.email,
            dateFeeFormated
          );
        }
      }

      if (loan.paymentMethod === "BAN") {
        const type =
          loan.type === "TOM" ? "Prestamo Tomado" : "Prestamo Realizado";
        const calculatedAmount =
          loan.type === "TOM" ? loan.amount : loan.amount * -1;
        const response = updateBankAccountBalanceAsync(
          loan.bankAccount,
          calculatedAmount,
          type,
          loan.email,
          parseInt(bankAccountBalance) + parseInt(calculatedAmount)
        );
        if (response && !response.isSuccess && response.data) {
          return getResult(response.data, false);
        }
      }
      return getResult("Préstamo cargado en memoria", true);
    }
  } catch (error) {
    console.log(error);
    return getResult(
      "Ocurrio un error al cargar el Préstamo en memoria",
      false
    );
  }
};

export const createLoanService = async (loan) => {
  try {
    const resp = await clientAxios.post(`/loans/`, loan);
    if (resp) {
      return getResult(`Prestamo cargado correctamente`, true);
    }
    // const { bankAccount, amount, paymentMethod } = resp.data.loan;

    // if (paymentMethod === "BAN") {
    //   //llama API actualizar saldo cuenta bancaria
    //   const type =
    //     loan.type === "TOM" ? "Prestamo Tomado" : "Prestamo Realizado";
    //   const calculatedAmount = loan.type === "TOM" ? amount : amount * -1;
    //   const changeBalance = await updateBankAccountBalanceService(
    //     bankAccount,
    //     calculatedAmount,
    //     type
    //   );
    //   if (!changeBalance.isSuccess) {
    //     return getResult(
    //       `Hubo un error al actualizar el saldo: ${changeBalance.msg}`,
    //       true
    //     );
    //   }
    // }
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
      return getResult(`Prestamo guardado en Memoria`, true);
    }
  }
};

export const createLoanMovementService = async (loanMovement) => {
  try {
    const resp = await clientAxios.post(`/loans/movement`, loanMovement);

    if (resp) {
      return getResult(`Movimiento de Prestamo cargado correctamente`, true);
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
      return getResult(`Movimiento de Prestamo guardado en Memoria`, true);
    }
  }
};

export const getLoanMovementsService = async () => {
  try {
    const email = await getEmail();

    const resp = await clientAxios.get(`/loans/getMovements/${email}`);

    if (resp.data.movements) {
      return resp.data.movements;
    }
  } catch (error) {
    return getResult(`Error al obtener movimientos:${error}`, false);
  }
};
