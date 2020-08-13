import React, { Component } from 'react'
import axios from "axios";
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import config from '../../config';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const hostName = config.BASE_URL;
let headerConstants = {};

export async function postServiceCALLS(serviceURI, headers = {}, dataObject = {}) {

    // Session validation
    const user = getCacheObject(SESSION_KEY_NAME);
    if (serviceURI != "/session/login" || serviceURI != "/register") { }

    if (user) {
        headerConstants = {
            "Content-Type": "application/json",
            sessionId: user.session_id,
            Authorization: "Bearer " + user.token,
            accountId: user.account_id,
            userId: user.user_id,
        };
        headers = { ...headers, ...headerConstants };
    }

    const prepareURL = hostName + serviceURI;
    var tempResponseObject = {};
    console.log(
        "prepareURL =",
        prepareURL,
        "headers=",
        headers,
        "dataObject=",
        dataObject
    );
    tempResponseObject = await axios
        .post(prepareURL, dataObject, {
            headers: headers,
        })
        .then((response) => {
            console.log("API Response Object (Post Service Call)=", response.data);
            if (response.code === 200) {
                if (serviceURI != "/admin/superAdminLogin") {
                    var responsedata = response.data;
                } else {
                    var responsedata = response.data;
                }
                return responsedata;
            }
            return response.data
        });

    return tempResponseObject;
}
