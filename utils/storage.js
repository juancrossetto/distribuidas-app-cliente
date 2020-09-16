import AsyncStorage from "@react-native-community/async-storage";

export const saveItem = async (keyName, keyValue) => {
  try {
    return await AsyncStorage.setItem(keyName, JSON.stringify(keyValue));
  } catch (error) {
    return false;
  }
};

export const getItem = async (keyName) => {
  try {
    return AsyncStorage.getItem(keyName).then((value) => {
      return JSON.parse(value);
    });
  } catch (error) {
    return false;
  }
};

export const clearAll = async () => {
  try {
    // return await AsyncStorage.removeItem(USERLOGGED);
    return await AsyncStorage.clear();
  } catch (error) {
    return false;
  }
};
// export const clearAll = async () => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     await AsyncStorage.multiRemove(keys);
//   } catch (error) {
//     console.error("Error clearing app data.", error);
//   }
// };

export const addItemToList = async (keyName, newItem) => {
  try {
    AsyncStorage.getItem(keyName, (err, result) => {
      if (result !== null) {
        var newArray = JSON.parse(result);
        var newArray2 = newArray.concat(newItem);
        AsyncStorage.setItem(keyName, JSON.stringify(newArray2));
      } else {
        const newArray = JSON.stringify([newItem]);
        AsyncStorage.setItem(keyName, newArray);
      }
    });
  } catch (error) {
    return false;
  }
};

export const getAllStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const result = await AsyncStorage.multiGet(keys);
  return result.map((req) => JSON.parse(req));
};

// Constantes para Async Storage
export const USERLOGGED = "@usserLogged";
export const INCOMES = "@incomes";
export const EXPENSES = "@expenses";
export const INVESTMENTS = "@investments";
export const CREDITCARDS = "@creditCards";
export const LOANS = "@loans";
export const BUDGETS = "@budgets";
export const BANKACCOUNTS = "@bankAccounts";
export const DEBICARDS = "@debitCards";
