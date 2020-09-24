import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { getItem, BANKACCOUNTS } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};

export const getBankAccountsService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/bankAccounts/${email}`);
    if (resp.data.bankAccounts) {
      return resp.data.bankAccounts;
    } else {
      return await getItem(BANKACCOUNTS);
    }
  } catch (error) {
    return await getItem(BANKACCOUNTS);
  }
};

export const createBankAccountService = async (bankAccount) => {
  try {
    const resp = await clientAxios.post(`/bankAccounts/`, bankAccount);

    if (resp) {
      return getResult(`Cuenta de banco cargada correctamente`, true);

      //llamar API actualizar saldo cuenta bancaria (si elegimos esa opcion)
    }
  } catch (error) {
    if (error.response.data.msg) {
      return getResult(error.response.data.msg, false);
    } else if (error.response.data.errores) {
      return getResult(error.response.data.errores[0].msg, false);
    } else {
      await addItemToList(BANKACCOUNTS, bankAccount);
      return getResult(`Cuenta de banco guardada en Memoria`, true);
    }
  }
};

export const updateBankAccountBalanceService = async (
  idBankAccount,
  amount
) => {
  try {
    const resp = await clientAxios.put(`/bankaccounts/changeBalance/`, {
      id: idBankAccount,
      amount,
    });
    if (resp) {
      return getResult(`Saldo en cuenta actualizado correctamente`, true);
    }
  } catch (error) {
    if (error.response.data.msg) {
      return getResult(error.response.data.msg, false);
    } else if (error.response.data.errores) {
      return getResult(error.response.data.errores[0].msg, false);
    } else {
      // await addItemToList(BANKACCOUNTS, bankAccount);
      // return getResult(`Saldo en cuenta actualizado en Memoria`, true);
      return getResult(`PENDIENTE ACTUALIZAR EN MEMORIA SALDO CUENTA`, true);
    }
  }
};

export const getBankAccountMovementsService = async (
  bankAccount,
  fromDate,
  toDate
) => {
  try {
    const email = await getEmail();
    const request = {
      bankAccount,
      email,
      fromDate,
      toDate,
    };
    console.log(request);
    const resp = await clientAxios.post(`/bankAccounts/getMovements`, request);

    if (resp.data.movements) {
      return getResult(resp.data.movements, true);
    } else {
      return getResult(`Error al obtener movimientos`, false);
    }
  } catch (error) {
    return getResult(`Error al obtener movimientos`, false);
  }
};
