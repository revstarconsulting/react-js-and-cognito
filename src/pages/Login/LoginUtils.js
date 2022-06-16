import { useState, useEffect } from "react";
import { useAuth } from "@auth/ProvideAuth";
import { useDispatch } from 'react-redux';
import { setAppLoadUserAction } from '@redux/actions/appActions';
export function useCognitoAuth() {
  const [cognitoUser, setCognitoUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let auth = useAuth();
  const dispatch = useDispatch();

  async function getUser() {
    try {
      setLoading(true);
      const cognitoUser = await auth.getUserData();
      setCognitoUser(cognitoUser);
      setLoading(false);
      //load current user info from current project users table
     /* getUserDetails(cognitoUser.idToken?.payload?.sub)
        .then((res) => {*/
          dispatch(setAppLoadUserAction({/* ...res,*/ cognitoUser: cognitoUser }));
       /* })
        .catch((err) => {
          console.log("App >> Getting logged user >> axios err=", err);
        })*/
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser(); // eslint-disable-next-line 
  }, []);

  return [cognitoUser, error, loading]; // highlight-line
}