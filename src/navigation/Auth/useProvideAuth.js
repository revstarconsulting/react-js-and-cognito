import { useState } from "react";
import { getCurrentSession, logOut } from "@services";
import { logUserSessionIn } from "services";
import { setAppLoadUserAction } from '@redux/actions/appActions';
import { useDispatch } from 'react-redux';
export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  // signin method: It can either return a promise or execute a callback function.
  // You can prefer to keep this in userServices.js
  const signin = (isChangeStatus) => {
    console.log("SS:: PrivateRoute > useProviderAuth > signin() called...");
    return new Promise(async (resolve, reject) => {
      try {
        const info = await getCurrentSession();
        resolve(info);
        logUserSessionIn();
        //console.log("App >> LOAD_LOGGED_USER");
        //load current user info 
        /*getUserDetails(info.idToken?.payload?.sub)
          .then((res) => {*/
            dispatch(setAppLoadUserAction({ /*...res,*/ cognitoUser: info }));
       /*   })
          .catch((err) => {
            console.log("App >> Getting logged user >> axios err=", err);
          })*/
      } catch (error) {
        console.error("signin error!==", error);
        reject("signin error!");
      }
    });
  };

  const signout = () => {
    return new Promise((resolve, reject) => {
      try {
        // do API endpoint axios call here and return the promise.
        setUser(null);
        logOut();
        resolve(true);
      } catch (error) {
        console.error("signout error!==", error);
        reject("signout error!");
      }
    });
  };

  const getUserData = async () => {
    console.log(
      "SS:: PrivateRoute > useProviderAuth > getUserData() called..."
    );
    const user = await getCurrentSession();
    setUser(user);
    return new Promise((resolve, reject) => {
      try {
        resolve(user);
      } catch (error) {
        console.error("signin error!==", error);
        reject("signin error!");
      }
    });
  };

  return {
    user,
    getUserData,
    signin,
    signout,
  };
}
