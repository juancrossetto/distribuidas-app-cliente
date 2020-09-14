import AsyncStorage from "@react-native-community/async-storage";

export const saveItem = async (keyName, keyValue) => {
  try {
    return await AsyncStorage.setItem(keyName, keyValue);
  } catch (error) {
    return false;
  }
};

export const getItem = async (keyName) => {
  try {
    return AsyncStorage.getItem(keyName).then((value) => {
      const data = JSON.parse(value);
      return data;
    });
  } catch (error) {
    return false;
  }
};

export const clearAll = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (error) {
    return false;
  }
};

export const addItemToList = async (keyName, newItem) => {
  try {
    AsyncStorage.getItem(keyName, (err, result) => {
      if (result !== null) {
        var newArray = JSON.parse(result).concat(newItem);
        AsyncStorage.setItem(keyName, JSON.stringify(newArray));
      } else {
        AsyncStorage.setItem(keyName, JSON.stringify(newItem));
      }
    });
  } catch (error) {
    return false;
  }
};

// Constantes para Async Storage
export const INCOMES = "@incomes";
// export const SAVE_INCOMES = "@save-incomes";
// export const CREATE_INCOME = "@create-income";

export const EXPENSES = "@expenses";
// export const CREATE_EXPENSE = "@create-expense";

export const GET_INVESTMENTS = "@get-investments";
export const CREATE_investment = "@create-investment";

export const GET_BANKACCOUNTS = "@get-bankAccounts";
export const CREATE_BANKACCOUNT = "@create-bankAccount";

export const GET_CREDITCARDS = "@get-creditCards";
export const CREATE_CREDITCARD = "@create-creditCard";

export const GET_LOANS = "@get-loans";
export const CREATE_LOANS = "@create-loans";

export const GET_BUDGETS = "@get-budgets";
export const CREATE_BUDGETS = "@create-budgets";
