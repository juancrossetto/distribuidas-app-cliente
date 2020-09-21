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
