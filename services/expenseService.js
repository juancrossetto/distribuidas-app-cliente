import React, { useState } from "react";
import clientAxios from "../config/axios";
import {
  selectExpenseIdAsync,
  insertExpenseInMemoryAsync,
  updateBankAccountBalanceAsync,
  insertCreditCardMovementInMemoryAsync,
} from "../db";
import { addMonthCurrentDate, getEmailUserLogged, getResult } from "../utils";
import {
  EXPENSES,
  MONTHLYEXPENSES,
  getItem,
  saveItem,
  addItemToList,
} from "../utils/storage";
import { updateBankAccountBalanceService } from "./bankAccountService";

const getEmail = async () => {
  return await getEmailUserLogged();
};

export const getExpensesService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/expenses/${email}`);
    if (resp.data.expenses) {
      return resp.data.expenses;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createExpenseInMemory = async (expense, bankAccountBalance) => {
  try {
    const resp = await insertExpenseInMemoryAsync(expense);

    if (resp.isSuccess) {
      // Ir a buscar el ultimo expenseId
      if (expense.paymentType === "TRC") {
        const expenseId = await selectExpenseIdAsync(
          EXPENSES,
          "ORDER BY id DESC LIMIT 1;"
        );
        // console.log("expenseId", expenseId);

        // Crear un movimiento por cada cuota
        const feeAmount = expense.amount / expense.fees;
        for (let fee = 1; fee <= expense.fees; fee++) {
          insertCreditCardMovementInMemoryAsync(
            expense.paymentId,
            fee,
            feeAmount,
            expenseId,
            "false",
            expense.email,
            addMonthCurrentDate(fee)
          );
        }
      }

      if (expense.paymentType === "BAN") {
        const response = updateBankAccountBalanceAsync(
          expense.paymentId,
          expense.amount * -1,
          "Egreso",
          expense.email,
          bankAccountBalance
        );
        if (response && !response.isSuccess && response.data) {
          return getResult(response.data, false);
        }
      }
      return getResult("Egreso cargado en memoria", true);
    }
  } catch (error) {
    console.log(error);
    return getResult("Ocurrio un error al cargar el Egreso en memoria", false);
  }
};

export const createExpenseService = async (expense) => {
  try {
    const resp = await clientAxios.post(`/expenses/`, expense);
    if (resp && resp.data && resp.data.expense) {
      // const { paymentId, amount, paymentType } = resp.data.expense;
      // if (paymentType === "BAN") {
      //   //llama API actualizar saldo cuenta bancaria

      //   const changeBalance = await updateBankAccountBalanceService(
      //     paymentId,
      //     amount * -1,
      //     "Egreso"
      //   );
      //   if (!changeBalance.isSuccess) {
      //     return getResult(
      //       `Hubo un error al actualizar el saldo: ${changeBalance.msg}`,
      //       true
      //     );
      //   }
      // }

      return getResult(`Egreso cargado correctamente`, true);
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
      // await addItemToList(EXPENSES, expense);
      return getResult(`Egreso guardado en Memoria`, true);
    }
  }
};

export const getMonthlyExpensesService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.post(`/expenses/monthlyexpenses/`, {
      email,
    });
    if (resp.data.expenses) {
      await saveItem(MONTHLYEXPENSES, resp.data.expenses);
      return resp.data.expenses;
    }
  } catch (error) {
    return await getItem(MONTHLYEXPENSES);
  }
};

export const getPaymentTotalAmountService = async (paymentType, paymentId) => {
  try {
    const resp = await clientAxios.post(`/expenses/getbypayment/`, {
      paymentType,
      id: paymentId,
    });
    return getResult(resp.data, true);
  } catch (error) {
    return getResult(`Hubo un error al obtener el total a pagar`, false);
  }
};
