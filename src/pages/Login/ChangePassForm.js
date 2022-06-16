import React, { useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { Container, Row, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import * as yup from "yup";
import { PALETTE_COLOR } from "@config/CONSTANTS";

import { useAuth } from "@navigation/Auth/ProvideAuth";
import { ValidationTooltip } from "./ValidationTooltip"
import { InputForm } from "components/InputForm";
import { changePasswordFirstLogin } from "@services/CognitoAuthService";
import { AppButton } from 'components';

import passIcon from '@assets/icons/password24x24.svg';
import {CHOOSEAVATAR} from '@navigation/CONSTANTS';

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

const changePassSchema = yup.object().shape({
  password: yup.string().required("The password field is required"),
  confPassword: yup.string().required("The password field is required"),
});


export const ChangePassForm = ({ loginInfo }) => {
  let auth = useAuth();
  let history = useHistory();
  const formRef = useRef();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const [visible, setVisible] = useState(false);
  
  const valitateForm = (values) => {
    return values.password === values.confPassword;
  }

  const setNewPassword = async (values) => {
    //loading(true);
    setShow(false);
    const { user, userAttributes } = loginInfo;

    if (valitateForm(values)) {

      let out = null;
      try {
        out = await changePasswordFirstLogin(values.password, user, userAttributes);
        console.log("changePasswordFirstLogin succeed: ", out);
        
        auth.signin(true).then((res) => {
          history.replace(CHOOSEAVATAR);     
        });
      } catch (error) {
        let msg = 'Password could not be changed';
        const { code, message } = error;
        if (code === 'InvalidPasswordException') {
          const messageSplitted = message.split(':');
          messageSplitted.length > 1 && (msg = messageSplitted[1]);
        }
        setMessage(msg);
        setShow(true);
      }
    } else {
      setMessage('Passwords do not match');
      setShow(true);
    }
  };

  const isValidFormik = () => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 100);
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
        touched,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className="baseForm">
          <Container className="baseForm px-5 pt-2 pb-2">
            <Row>
              <Col className="mt-2" xs={12} xl={12}>
                <H2 className="text-center" >Set New Password</H2>
                <P className="text-center mb-2">Password must contain uppercase letters, numbers and special symbols and be at least 8 characters long</P>

                {(visible && !isValid) && <ValidationTooltip msg={"All fields are required"} />}
                {show && isValid && <ValidationTooltip msg={message} />}
                <Form.Group className="pt-3">
                  <InputForm
                    height={'64px'}
                    ctype="password"
                    placeholder="New Password"
                    icon={passIcon}
                    name="password"
                    value={values.password}
                    invalid={touched.password && errors.password}
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex flex-column justify-content-center align-items-center my-3">
              <AppButton style={{ width: 227, height: 64, zIndex: 5 }}
                type="submit"
                onClick={() => isValidFormik()}
                bgcolor={PALETTE_COLOR.ACCENT_PURPLE}
                bordercolor={PALETTE_COLOR.ACCENT_PURPLE}
                borderhovercolor={PALETTE_COLOR.ACCENT_PURPLE_LIGHT}
                bghovercolor={PALETTE_COLOR.ACCENT_PURPLE_LIGHT}>
                Change Password
              </AppButton>
            </div>
          </Container>
        </Form>
      )}
    </Formik>
  )
};

