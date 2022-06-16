import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoRefreshToken,
    CognitoIdToken,
} from 'amazon-cognito-identity-js';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import appConfig from '@config/appConfig';

var poolData = {
    UserPoolId: appConfig.cognito.USER_POOL_ID,
    ClientId: appConfig.cognito.APP_CLIENT_ID,
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export async function signIn(username, password) {
    const userPool = new CognitoUserPool({
        UserPoolId: appConfig.cognito.USER_POOL_ID,
        ClientId: appConfig.cognito.APP_CLIENT_ID,
    });

    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                console.log("Login onSuccess");
                const customResult = { result, isFirstLogin: false }
                resolve(customResult);
            },
            onFailure: (err) => {
                console.log("Login onFailure");
                reject(err);
            },
            newPasswordRequired: (userAttributes) => {
                console.log("Login newPasswordRequired2");
                // delete userAttributes.email_verified;
                const customResult = { userAttributes, isFirstLogin: true, user: cognitoUser }
                console.log("newPasswordRequired cognitoUser;", JSON.stringify(cognitoUser));
                console.log("newPasswordRequired userAttributes;", { userAttributes });
                console.log({ customResult });
                resolve(customResult);
            }
        });
    });
}

export async function changePasswordFirstLogin(newPassword, cognitoUser, userAttributes) {

    return new Promise((resolve, reject) => {
        cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
            onSuccess: (result) => {
                resolve(result);
            },
            onFailure: (err) => {
                reject(err);
            },
        });
    });
}

export async function changePassword(username, prePassword, newPassword) {
    const userPool = new CognitoUserPool({
        UserPoolId: appConfig.cognito.USER_POOL_ID,
        ClientId: appConfig.cognito.APP_CLIENT_ID,
    });

    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: prePassword,
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                console.log("authenticateUser onSuccess ", result);
                cognitoUser.changePassword(prePassword, newPassword, err => {
                    if (err) {
                        console.log(`Change Password error ${err.name}`);
                        reject(err);
                    } else {
                        console.log(`Change Password succeed`);
                        resolve(null)
                    }
                })
            },
            onFailure: (err) => {
                console.log("authenticateUser onFailure");
                reject(err);
            },
        });
    });
}


export async function forgotPassword(email) {
    const userPool = new CognitoUserPool({
        UserPoolId: appConfig.cognito.USER_POOL_ID,
        ClientId: appConfig.cognito.APP_CLIENT_ID,
    });

    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    return new Promise((resolve, reject) => {
        cognitoUser.forgotPassword({
            onSuccess: (result) => {
                resolve(result);
            },
            onFailure: (err) => {
                reject(err);
            },
        });
    });
}

export async function resetPassword(verificationCode, newPassword, email) {
    const userPool = new CognitoUserPool({
        UserPoolId: appConfig.cognito.USER_POOL_ID,
        ClientId: appConfig.cognito.APP_CLIENT_ID,
    });

    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess: (result) => {
                resolve(result);
            },
            onFailure: (err) => {
                reject(err);
            },
        });
    });
}


export async function logOut() {
    const userPool = new CognitoUserPool({
        UserPoolId: appConfig.cognito.USER_POOL_ID,
        ClientId: appConfig.cognito.APP_CLIENT_ID,
    });

    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.signOut();
    }
}

export async function refreshCognitoToken(token, onSuccess, onError) {
    const userPool = new CognitoUserPool({
        UserPoolId: appConfig.cognito.USER_POOL_ID,
        ClientId: appConfig.cognito.APP_CLIENT_ID,
    });
    const refreshToken = new CognitoRefreshToken({
        RefreshToken: token,
    });
    const cognitoUser = new CognitoUser({
        Username: refreshToken,
        Pool: userPool,
    });
    return new Promise((resolve, reject) => {
        cognitoUser.refreshSession(refreshToken, async (err, result) => {
            if (err) {
                reject(onError());
            } else {
                const response = result;
                resolve(await onSuccess(response));
            }
        });
    })

}

export function isTokenExpired(token) {
    const idToken = new CognitoIdToken({
        IdToken: token,
    });
    const payload = idToken.decodePayload();
    const currentTime = new Date().getTime() / 1000;;
    if (payload.exp < currentTime) {
        return true;
    }
    return false;
}

export const getCurrentSession = () => {
    return new Promise((success, reject) => {
        const cognitoUser = userPool.getCurrentUser();

        if (!cognitoUser) {
            reject('Could not retrieve current user');
            return;
        }

        cognitoUser.getSession((err, session) => {
            if (err) {
                reject('Error retrieving user session: ', err);
                return;
            }

            if (session.isValid()) {
                success(session);
            } else {
                reject('Session is not valid');
            }
        });
    });
}