import React from "react";
import clientAxios from "../config/axios";
import { insertBudgetInMemoryAsync } from "../db";
import { getEmailUserLogged, getResult } from "../utils";
import { addItemToList, getItem, BUDGETS } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};
export const getBudgetsService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/budgets/${email}`);
    if (resp.data.budgets) {
      return resp.data.budgets;
    }
  } catch (error) {
    console.log("Error obteniendo presupuesto", error);
  }
};

export const createBudgetInMemory = async (budget) => {
  try {
    const resp = await insertBudgetInMemoryAsync(budget);
    if (resp.isSuccess) {
      return getResult("Presupuesto cargado en memoria", true);
    }
  } catch (error) {
    return getResult(
      "Ocurrio un error al cargar el Presupuesto en memoria",
      false
    );
  }
};

export const createBudgetService = async (budget) => {
  try {
    const resp = await clientAxios.post(`/budgets/`, budget);

    if (resp && resp.data && resp.data.budget) {
      return getResult(`Presupuesto cargado correctamente`, true);
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
      return getResult(`Presupuesto guardado en Memoria`, true);
    }
  }
};

export const getBudgetDeflection = async (month, year) => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.post(`/budgets/getvariation`, {
      email,
      month: parseInt(month),
      year: parseInt(year),
    });
    return getResult(resp.data.response, true);
  } catch (error) {
    return getResult(
      `Hubo un error al obtener la desviación de Presupuestos`,
      false
    );
  }
};
