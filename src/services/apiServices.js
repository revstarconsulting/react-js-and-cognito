// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "@config/CONSTANTS";
import { USERS_API } from "./CONSTANTS";
import axios from './customAxios'; // importing axios from customAxios

/**
 * Function to fetch all the paginated entity data.
 */
export const getEntityData = (endpointUrl, config) => {
  console.log(`apiServices > getEntityData called... ${endpointUrl} ${JSON.stringify(config)}`);
  return new Promise((resolve, reject) => {

    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .get(`${endpointUrl}?${config}`)
        .then((res) => {
          console.log("getEntityData > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getEntityData > axios err=", err);
          reject(err);
        });
    } catch (error) {
      console.error("in apiServices > getEntityData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to store entity data.
 */
export const saveEntityData = (endpointUrl, data) => {
  console.log(`apiServices > saveEntityData called... ${endpointUrl} ${JSON.stringify(data)}`);
  return new Promise((resolve, reject) => {

    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .post(`${endpointUrl}`, data)
        .then((res) => {
          console.log("saveEntityData > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("saveEntityData > axios err=", err);
          reject(err);
        });
    } catch (error) {
      console.error("in apiServices > saveEntityData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to edit entity data.
 */
 export const editEntityData = (endpointUrl, data) => {
  console.log(`apiServices > editEntityData called... ${endpointUrl} ${JSON.stringify(data)}`);
  return new Promise((resolve, reject) => {

    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .patch(`${endpointUrl}`, data)
        .then((res) => {
          console.log("editEntityData > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("editEntityData > axios err=", err);
          reject(err);
        });
    } catch (error) {
      console.error("in apiServices > editEntityData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const obtainEntityData = (endpointUrl) => {
  console.log(`apiServices > obtainEntityData called... ${endpointUrl}`);
  return new Promise((resolve, reject) => {

    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .get(`${endpointUrl}`)
        .then((res) => {
          console.log("obtainEntityData > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("obtainEntityData > axios err=", err);
          reject(err);
        });
    } catch (error) {
      console.error("in apiServices > obtainEntityData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to delete one register
 */
 export const deleteEntityData = (endpointUrl) => {
  console.log(`apiServices > deleteEntityData called... ${endpointUrl}`);
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(`${endpointUrl}`)
        .then((res) => {
          console.log("deleteEntityData > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("deleteEntityData > axios err=", err);
          reject(err);
        });
    } catch (error) {
      console.error("in apiServices > deleteEntityData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


/**
 * LOG user information
 */
 export const logUserSessionIn = () => {
  console.log(`apiServices > logUserSessionIn called...`);
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${USERS_API}logUser/information`)
        .then((res) => {
          console.log("logUserSessionIn > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("logUserSessionIn > axios err=", err);
          reject(err);
        });
    } catch (error) {
      console.error("in apiServices > logUserSessionIn, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};