import React, { useRef, useState } from 'react';
import { Formik } from "formik";
import { Container, Row, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import * as yup from "yup";
import { PALETTE_COLOR } from "@config/CONSTANTS";

import { InputForm } from "components/InputForm";
import { resetPassword, forgotPassword } from "@services/CognitoAuthService";
import { AppButton } from 'components';

import passIcon from '@assets/icons/password24x24.svg';


const EmailField = styled.strong`
  color: ${PALETTE_COLOR.ACCENT_GREEN}; 
  font-weight: 600;
`;

const H2 = styled.h2`
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
`;
const P = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
`;


const PSmall = styled.p`
  font-weight: 300;
  font-size: 13px;
  line-height: 19x;
  text-align: center;
`;

const ASmall = styled.a`
  color: ${PALETTE_COLOR.MAIN_BLUE}; 
  text-decoration: none;
  font-size: 13px;
  :hover {
    color: ${PALETTE_COLOR.MAIN_BLUE};
  }
`;

const ErrorText = styled.p`
  font-size: 13px;
  color: ${PALETTE_COLOR.ACCENT_RED};
`;

const changePassSchema = yup.object().shape({
  code: yup.string().required("Code field is required"),
  password: yup.string().required("The password field is required"),
  confPassword: yup.string().required("The password field is required"),
});


export const ResetPassForm = ({ loginInfo, setloginInfo }) => {
  const formRef = useRef();
  // const [show, setShow] = useState(false);
  const [isShowResend, setShowResend] = useState(true);
  const [resendError, setResendError] = useState("");
  const [visible, setVisible] = useState(false);
  const [fpError, setFpError] = useState("");
  const { user } = loginInfo;
  const codeRegex = /^[0-9]+$/;

  const valitateForm = (values) => {


    if (!codeRegex.test(values.code)) {
      setFpError('Code must be numeric with no spaces');
      return false;
    }
    else {
      if (values.password !== values.confPassword) {
        setFpError('Passwords do not match');
        return false;
      } else {
        if (values.password.length < 2) {
          setFpError('Password not long enough');
          return false;
        } else {
          return true;
        }
      }
    }



  }


  /***
    * Forgot password -1 step- email
    */
  const resendCode = async () => {
    console.log('resendCode');
    setResendError("");
    let response = null;
    setFpError("");
    try {
      response = await forgotPassword(user);

      console.log("resendCode: ", response);
      setShowResend(false);

    } catch (error) {

      console.log("resendCode:", error);
      const { message } = error;
      setResendError(message);
    }
  }


  const setNewPassword = async (values) => {
    //loading(true);
    // setShow(false);
    setFpError("");

    if (valitateForm(values)) {

      let out = null;
      try {
        out = await resetPassword(values.code.trim(), values.password, user);
        console.log('resetPassword ', out);
        setloginInfo((pre) => { return { ...pre, resetPass: { isResetPass: false, success: true } } });

      } catch (error) {
        const { code, message } = error;
        if (code === 'InvalidPasswordException') {
          const messageSplitted = message.split(':');
          if (messageSplitted.length > 1) {
            setFpError(messageSplitted[1]);
          }
        } else if (code === 'InvalidParameterException') {
          setFpError('Code must be numeric with no spaces');
        } else {
          setFpError(message);
        }
      }
    } /*else {
      setShow(true);
    }*/
  };

  const isValidFormik = () => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }

  const handleAPIError = () => {
    fpError !== '' && setFpError('');
  }

  const returnSignin = () => {
    setloginInfo((pre) => { return { ...pre, resetPass: { isResetPass: false, success: false } } });
  }

  return (
    <Formik
      validationSchema={changePassSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => {
        setNewPassword(values);
      }}
      initialValues={{
        code: "",
        password: "",
        confPassword: "",
      }}
      innerRef={formRef}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        isValid,
        errors,
        touched
      }) => (
        <Form noValidate autoComplete="off" onSubmit={handleSubmit} className="baseForm">
          <Container className="baseForm px-5 pt-2 pb-2">
            <Row>
              <Col xs={12} xl={12}>
                <H2 className="text-center" >Reset Password</H2>
                <P className="text-center mb-2">First, enter the code we sent to <br /><EmailField>{loginInfo.user}</EmailField></P>

                {/* {(visible && !isValid) && <ValidationTooltip msg={"All fields are required"} />}
                {(show && isValid) && <ValidationTooltip msg={message} />} */}
                <Form.Group className="pt-2">
                  <InputForm
                    height={'64px'}
                    type="text"
                    autoComplete="off"
                    placeholder="Code"
                    name="code"
                    value={values.code}
                    invalid={touched.code && errors.code}
                    onChange={(e) => {
                      handleChange(e);
                      handleAPIError();
                    }}
                    className="text-center"
                    maxLength="6"
                  />
                </Form.Group>
                {resendError !== '' ? <ErrorText className="mb-1 text-center">{resendError}</ErrorText>
                  : isShowResend
                    ? <PSmall className='mt-2'>Did not receive a letter?   <ASmall href="#" onClick={resendCode}>Re-send</ASmall></PSmall>
                    : <PSmall className='mt-2'>The letter has been resent   <ASmall href="#" onClick={() => setShowResend(true)} >Ok</ASmall></PSmall>}
                <hr />
                <P className="text-center mb-2">Then, enter new password that must contain uppercase letters, numbers and special symbols and be at least 8 characters long</P>
                <Form.Group >
                  <InputForm
                    height={'64px'}
                    ctype="password"
                    placeholder="New Password"
                    icon={passIcon}
                    name="password"
                    value={values.password}
                    invalid={touched.password && errors.password}
                    onChange={(e) => {
                      handleChange(e);
                      handleAPIError();
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} xl={12}>
                <Form.Group>
                  <InputForm
                    height={'64px'}
                    ctype="password"
                    placeholder="Repeat New Password"
                    icon={passIcon}
                    name="confPassword"
                    value={values.confPassword}
                    invalid={touched.confPassword && errors.confPassword}
                    onChange={(e) => {
                      handleChange(e);
                      handleAPIError();
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            {isValid && fpError !== '' && <ErrorText className="text-center mb-0">{fpError}</ErrorText>}
            {(visible && !isValid) && <ErrorText className="text-center mb-0">All fields are required</ErrorText>}
            <div className="d-flex justify-content-around mt-2 mb-3">
              <AppButton style={{ width: 200, height: 64, zIndex: 5 }}
                type="submit"
                onClick={() => isValidFormik()}
                bgcolor={PALETTE_COLOR.ACCENT_PURPLE}
                bordercolor={PALETTE_COLOR.ACCENT_PURPLE}
                borderhovercolor={PALETTE_COLOR.ACCENT_PURPLE_LIGHT}
                bghovercolor={PALETTE_COLOR.ACCENT_PURPLE_LIGHT}>
                Change Password
              </AppButton>
              <AppButton style={{ width: 200, height: 64, zIndex: 5 }}
                type="button"
                onClick={() => returnSignin()}
                bgcolor={PALETTE_COLOR.MAIN_WHITE}
                bordercolor={PALETTE_COLOR.MAIN_WHITE}
                borderhovercolor={PALETTE_COLOR.MAIN_BLUE}
                bghovercolor={PALETTE_COLOR.MAIN_WHITE}
                color={PALETTE_COLOR.MAIN_BLUE}
                hovercolor={PALETTE_COLOR.MAIN_BLUE}
              >
                Cancel
              </AppButton>
            </div>
          </Container>
        </Form>
      )}
    </Formik>
  )
};

