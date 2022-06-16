import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Formik } from "formik";
import { Container, Row, Col, Form, Button, } from 'react-bootstrap';
import styled from 'styled-components';
import * as yup from "yup";

import { useAuth } from "@navigation/Auth/ProvideAuth";
import { ValidationTooltip } from "./ValidationTooltip"

import { InputForm } from "components/InputForm";
import { signIn } from "@services/CognitoAuthService";
import { PALETTE_COLOR } from "@config/CONSTANTS";
import { AppModal } from "@components/AppModal";

import profileIcon from '@assets/icons/profilesquare24x24.svg';
import passIcon from '@assets/icons/password24x24.svg';
import { AppButton } from 'components';
import { ForgotPassForm } from './ForgotPassForm';

const ForgotAction = styled(Button)`
  font-size: 14px;
  text-decoration:none;
  text-align:center;
  border-radius: 20px;
  color: ${PALETTE_COLOR.MAIN_BLUE};
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  :hover, :focus {
    border: 1px solid rgba(69, 122, 251, 0.2);
    box-sizing: border-box;
    color: ${PALETTE_COLOR.MAIN_BLUE};
    box-shadow: unset;
  }
`;

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .email("Only email formats are allowed for this field ")
    .required("Please enter the required email"),
  password: yup.string().required("The password field is required"),
});


export const LoginForm = ({ setloginInfo }) => {
  let auth = useAuth();
  let history = useHistory();
  let location = useLocation();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleClickOpenSignUpModal = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUpModal = () => {
    setOpenSignUp(false);
  };


  const login = async (values) => {
    let { from } = location.state || { from: { pathname: "/" } };
    //loading(true);
    setShow(false);
    console.log("SS:: login btn clicked...");
    console.log({ values });


    let loginResponse = null;
    try {
      loginResponse = await signIn(values.username, values.password);
      const { isFirstLogin } = loginResponse;
      if (isFirstLogin) {
        setloginInfo((pre) => { return { ...pre, isFirstLogin, user: loginResponse.user, userAttributes: loginResponse.userAttributes } });

      } else {
        console.log("Login succeed: ", loginResponse.result);

        auth.signin(false).then((res) => {
          history.replace(from);
          console.log("SS:: logged in successfully by:", res);
        });
      }
    } catch (error) {
      console.log("login error:", error);
      setShow(true);
      setMessage('Incorrect User or Password');
    }
  };

  const isValidFormik = () => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }


  return (
    <>
      <Formik
        validationSchema={loginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={true}
        onSubmit={(values, { setSubmitting }) => {
          login(values);
          setSubmitting(false);
        }}
        initialValues={{
          username: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Container className="baseForm px-5 pt-3 pb-2">

              {(visible && !isValid) && <ValidationTooltip msg={"All fields are required"} />}

              {(show && isValid) && <ValidationTooltip msg={message} />}

              <Row>
                <Col className="mt-3" xs={12} xl={12}>
                  <Form.Group controlId="baseForm">
                    <InputForm
                      height={'64px'}
                      placeholder="Login"
                      icon={profileIcon}
                      name="username"
                      value={values.username}
                      invalid={touched.username && errors.username}
                      onChange={handleChange}
                    ></InputForm>
                    <Form.Control.Feedback type="invalid">
                      {errors.username} ++
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} xl={12}>
                  <Form.Group>
                    <InputForm
                      height={'64px'}
                      ctype="password"
                      placeholder="Password"
                      icon={passIcon}
                      name="password"
                      value={values.password}
                      invalid={touched.password && errors.password}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>

            <div className="d-flex flex-column justify-content-center align-items-center">
              <ForgotAction variant="link" className="mb-4" onClick={handleClickOpenSignUpModal} >Forgot your password?</ForgotAction>
              <AppButton style={{ width: 123, height: 64 }} type="submit" onClick={() => isValidFormik()}>
                Login
              </AppButton>
            </div>
          </Form>
        )}
      </Formik>

      <AppModal open={openSignUp} handleclose={handleCloseSignUpModal} title={('Recover Password')}>
        <ForgotPassForm handleCloseSignUpModal={handleCloseSignUpModal} setloginInfo={setloginInfo} />
      </AppModal>
    </>
  )
};

