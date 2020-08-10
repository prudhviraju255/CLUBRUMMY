import React from 'react';
import { decryptData, encryptData } from './EncryptDecrypt';
import config from "../../../config";
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export function checkSession() {
  let user = getCacheObject(SESSION_KEY_NAME);
  if (user) {
    return true;
  } else {
    return false;
  }
}

/**
* @get cache object
*/
export function getCacheObject(key_name) {
  let data = localStorage.getItem(key_name);
  data = data ? decryptData(data) : null;
  return data;
}

/**
 * @set cache object
 */
export function setCacheObject(key_name, value) {
  localStorage.setItem(key_name, encryptData(value));
  return true;
}

/**
 * remove session
 */
export function removeSession() {
  localStorage.clear();
}