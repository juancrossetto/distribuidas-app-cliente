import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { EXPENSES, MONTHLYEXPENSES, getItem, saveItem } from "../utils/storage";
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
    if (resp && resp.data && resp.data.expense) {
      const { paymentId, amount, paymentType } = resp.data.expense;
      if (paymentType === "BAN") {
        //llama API actualizar saldo cuenta bancaria

        const changeBalance = await updateBankAccountBalanceService(
          paymentId,
          amount * -1
        );
        if (!changeBalance.isSuccess) {
          return getResult(
            `Hubo un error al actualizar el saldo: ${changeBalance.msg}`,
            true
          );
        }
      }

      return getResult(`Egreso cargado correctamente`, true);
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
