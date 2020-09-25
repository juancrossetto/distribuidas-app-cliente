import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { addItemToList, getItem, CREDITCARDS } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};

export const getCreditCardsService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/creditCards/${email}`);
    if (resp.data.creditCards) {
      return resp.data.creditCards;
    } else {
      return await getItem(CREDITCARDS);
    }
  } catch (error) {
    return await getItem(CREDITCARDS);
  }
};

export const createCreditCardService = async (creditCard) => {
  try {
    const resp = await clientAxios.post(`/creditCards/`, creditCard);

    if (resp) {
      return getResult(`Tarjeta de Crédito cargada correctamente`, true);

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
      await addItemToList(CREDITCARDS, creditCard);
      return getResult(`Tarjeta de Crédito guardada en Memoria`, true);
    }
  }
};

export const updateCreditCardService = async (creditCard) => {
  try {
    const resp = await clientAxios.put(`/creditcards/`, creditCard);
    if (resp) {
      return getResult(`Tarjeta de Crédito actualizada correctamente`, true);
    } else {
      return getResult(`Error al actualizar Tarjeta de Crédito`, false);
    }
  } catch (error) {
    if (error.response.data.msg) {
      return getResult(error.response.data.msg, false);
    } else if (error.response.data.errores) {
      return getResult(error.response.data.errores[0].msg, false);
    } else {
      await addItemToList(CREDITCARDS, creditCard);
      return getResult(`Tarjeta de Crédito actualizada en Memoria`, true);
    }
  }
};

export const payOverdueFeesService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.post(`/creditCards/payOverdueFees`, {
      email,
    });

    if (resp) {
      return getResult(resp, true);
    }
  } catch (error) {
    if (error.response.data.msg) {
      return getResult(error.response.data.msg, false);
    } else if (error.response.data.errores) {
      return getResult(error.response.data.errores[0].msg, false);
    } else {
      return getResult("Error al Pagar Cuotas v encidas", false);
    }
  }
};
