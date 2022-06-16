// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { USERS_API } from "./CONSTANTS";
import { RequestQueryBuilder, CondOperator } from "@nestjsx/crud-request";
import { getEntityData } from "services";


/**
 * Function to fetch all the users.
 */
export const getAllUsers = () => {
  console.log("userServices > getAllUsers called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .get(USERS_API())
        .then((res) => {
          console.log("getAllUsers > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getAllUsers > axios err=", err);
          reject("Error in getAllUsers axios!");
        });
    } catch (error) {
      console.error("in userServices > getAllUsers, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch the details of the user based on userId.
 * @param {string} userid of the user.
 * early dev example passing Skeleton(static object) as API response.
 */
/*export const getUserDetails = (id) => {
  console.log("userServices > getUserDetails called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .get(GET_USER_DETAILS(id))
        .then((res) => {
          console.log("getUserDetails > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getUserDetails > axios err=", err);
          reject("Error in getUserDetails axios!");
        });
    } catch (error) {
      console.error("in userServices > getUserDetails, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};*/

export const getUserDetails = (subCogId) => {
  console.log("userServices > getUserDetails called...");
  return new Promise((resolve, reject) => {
    try {
      const qb = RequestQueryBuilder.create()
        .setFilter({ field: 'sub_cognito_id', operator: CondOperator.EQUALS, value: subCogId })
        .setLimit(1);

      getEntityData(USERS_API, qb.query())
        .then((res) => {
          let userData = res[0];
          resolve(userData);

        })
    } catch (error) {
      console.error("in userServices > getUserDetails1, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

