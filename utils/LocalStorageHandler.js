// export const updateMoneyOnLocalStorage = () => {
//   setLocalStorageData("@money", JSON.stringify({ money: money }))
//     .then(res => {
//       console.log("salvou money?", res);
//     })
//     .catch(err => console.log(err));
// };

// export const updateBillsOnLocalStorage = () => {
//   setLocalStorageData("@bills", JSON.stringify({ bills: bills }))
//     .then(res => {
//       console.log("salvou bill?", res);
//     })
//     .catch(err => console.log(err));
// };

import { AsyncStorage } from "react-native";

export const KEY_BASE = "@payYourBills";

export const LocalTypeKeys = {
  MONEY: KEY_BASE + "/money",
  BILLS: KEY_BASE + "/bills",
  PAGES: KEY_BASE + "/pages"
};

export const setLocalStorageData = (storage_key, value) => {
  console.log("ls SET | ls key and value:", storage_key, value);
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(storage_key, JSON.stringify(value));

      resolve(true);
    } catch (error) {
      // Error saving data
      reject(error);
    }
  });
};

export const getLocalStorageData = storage_key => {
  return new Promise(async (resolve, reject) => {
    console.log("lsGet | ls key:", storage_key);
    try {
      const value = await AsyncStorage.getItem(storage_key);
      if (value !== null) {
        // We have data!!
        resolve(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
      reject(error);
    }
  });
};
