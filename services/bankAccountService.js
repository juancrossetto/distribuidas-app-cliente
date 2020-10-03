import React from "react";
import clientAxios from "../config/axios";
import { insertBankAccountInMemoryAsync } from "../db";
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
    }
  } catch (error) {
    console.log("Error obteniendo cuentas", error);
  }
};

export const createBankAccountInMemory = async (bankAccount) => {
  try {
    const resp = await insertBankAccountInMemoryAsync(bankAccount);
    if (resp.isSuccess) {
      return getResult("Cuenta de banco cargada en memoria", true);
    }
  } catch (error) {
    return getResult(
      "Ocurrio un error al cargar la Cuenta de banco en memoria",
      false
    );
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
      return getResult(`Cuenta de banco guardada en Memoria`, true);
    }
  }
};

export const createBankAccountMovementService = async (bankAccountMovement) => {
  try {
    const resp = await clientAxios.post(
      `/bankAccounts/movement`,
      bankAccountMovement
    );

    if (resp) {
      return getResult(
        `Movimiento de Cuenta de banco cargada correctamente`,
        true
      );
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
      return getResult(
        `Movimiento de Cuenta de banco guardada en Memoria`,
        true
      );
    }
  }
};

export const updateBankAccountBalanceService = async (
  idBankAccount,
  amount,
  type
) => {
  try {
    const resp = await clientAxios.put(`/bankaccounts/changeBalance/`, {
      id: idBankAccount,
      amount,
      type,
    });
    console.log(resp);
    if (resp) {
      return getResult(`Saldo en cuenta actualizado correctamente`, true);
    }
  } catch (error) {
    if (error.response.data.msg) {
      return getResult(error.response.data.msg, false);
    } else if (error.response.data.errores) {
      return getResult(error.response.data.errores[0].msg, false);
    } else {
      // return getResult(`Saldo en cuenta actualizado en Memoria`, true);
      return getResult(`PENDIENTE ACTUALIZAR EN MEMORIA SALDO CUENTA`, true);
    }
  }
};

export const getBankAccountMovementsByDatesService = async (
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

export const getBankAccountMovementsService = async () => {
  try {
    const email = await getEmail();

    const resp = await clientAxios.get(`/bankAccounts/getMovements/${email}`);

    if (resp.data.movements) {
      return resp.data.movements;
    }
  } catch (error) {
    return getResult(`Error al obtener movimientos`, false);
  }
};
