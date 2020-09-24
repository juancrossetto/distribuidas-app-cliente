import React from "react";
import clientAxios from "../config/axios";
import { getEmailUserLogged, getResult } from "../utils";
import { saveItem, getItem, USERLOGGED } from "../utils/storage";

const getEmail = async () => {
  return await getEmailUserLogged();
};
export const getAllDataService = async () => {
  try {
    const email = await getEmail();
    const resp = await clientAxios.get(`/users/getAllData/${email}`);
    // console.log("dataaa", resp.data);
    if (resp.data) {
      return getResult(resp.data, true);
    } else {
      return getResult(`Error al Obtener la Información`, false);
    }
  } catch (error) {
    return getResult(`Error al Obtener la Información`, false);
  }
};

export const authUserService = async (email, password) => {
  try {
    const resp = await clientAxios.post(`/auth/`, {
      email,
      password,
    });
    if (resp.data.user) {
      await saveItem(USERLOGGED, {
        id: resp.data.user._id,
        email: resp.data.user.email,
        name: resp.data.user.name,
        password: resp.data.user.password,
      });
      return getResult(``, true);
    } else {
      return getResult(`El usuario indicado no se encuentra registrado`, false);
    }
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.msg
    ) {
      return getResult(error.response.data.msg, false);
    } else {
      return getResult(
        "Error al intentar loguearse, revise su conexión",
        false
      );
    }
  }
};

export const createAccountService = async (name, email, password) => {
  try {
    const resp = await clientAxios.post(`/users/`, {
      name,
      email,
      password,
    });

    if (resp) {
      return getResult(
        `Usuario creado correctamente, !Bienvenido ${name}!`,
        true
      );
    }
  } catch (error) {
    return getResult(error.response.data.errores[0].msg, false);
  }
};
