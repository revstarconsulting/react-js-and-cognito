
import axios from 'axios';
import { getCurrentSession } from "@services/CognitoAuthService";
import appConfig from '@config/appConfig';
// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
// headers: { 'api-key': 'eyJz-CI6Ikp-4pWY-lhdCI6', 'Origin': 'https://d1qpy2p0a2fvkp.cloudfront.net/' }
const customAxios = axios.create({
    baseURL: `${appConfig.api.ENDPOINT}`,
    timeout: 10000,
    //headers: { 'api-key': 'eyJz-CI6Ikp-4pWY-lhdCI6' }
});

// Step-2: Create request, response & error handlers
const requestHandler = async request => {
    const info = await getCurrentSession();
    // Token will be dynamic so we can use any app-specific way to always
    // fetch the new token before making the call
    request.headers.Authorization = `Bearer ${info.idToken.jwtToken}`;
    return request;
};

const responseHandler = response => {
    if (response.status === 401) {
        window.location = '/login';
    }

    return response;
};

const errorHandler = error => {
    if (error.response.status === 403) {
        console.log("🚀 ~ file: customAxios.js ~ line 35 ~ error", JSON.stringify(error));
        return Promise.reject({ ...error, message: "Insufficient privileges to perform this operation, please contact with an administrator" });
    }
    return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);


// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;
