import React, { useState } from 'react';
import { PALETTE_COLOR } from "@config/CONSTANTS";
import styled from 'styled-components';
import { Formik } from "formik";
import { Row, Col, Form } from 'react-bootstrap';
import { InputForm } from "components/InputForm";
import ic_email from '@assets/icons/ic_email.svg';
import { AppButton } from 'components';
import * as yup from "yup";
import { forgotPassword } from "@services/CognitoAuthService";


const ModalTitle = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
`;

const ModalText = styled.p`
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;
`;

const ModalContentWrapper = styled.div`
  padding: 20px 20px 25px 30px;
`;

const ErrorText = styled.p`
  font-size: 13px;
  color: ${PALETTE_COLOR.ACCENT_RED};
`;

const forgotPassSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email is required")
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid email format "
        )
});




export const ForgotPassForm = ({ handleCloseSignUpModal, setloginInfo }) => {

    const [fpError, setFpError] = useState("");

    /***
     * Forgot password -1 step- email
     */
    const recoverPassword = async (values) => {
        let response = null;
        setFpError("");
        try {
            response = await forgotPassword(values.email);

            console.log("recoverPassword: ", response);
            handleCloseSignUpModal();
            setloginInfo((pre) => { return { ...pre, user: values.email, resetPass: { ...pre.resetPass, isResetPass: true } } });

        } catch (error) {
            //showAuthMessage(error.message);
            console.log("Forgot pass:", error);
            const { message } = error;
            console.log('message ', message);
            setFpError(message);
        }
    }

    const handleAPIError = ()=>{
        fpError !=='' && setFpError('');
    }

    return (
        <ModalContentWrapper>
            <ModalTitle>Forgot your password?</ModalTitle>
            <ModalText className="mb-0">Enter the email you registered with, and we will send you reset email</ModalText>

            <Formik
                validationSchema={forgotPassSchema}
                onSubmit={(values) => {
                    recoverPassword(values);
                }}
                initialValues={{
                    email: "",
                }}>
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched,
                    isValid,
                }) => (
                    <Form noValidate onSubmit={handleSubmit} className="baseForm">
                        <Row>
                            <Col className="mt-2" xs={12} xl={12}>
                                <Form.Group className="pt-3">
                                    <InputForm
                                        height={'64px'}
                                        ctype="text"
                                        placeholder="Email"
                                        icon={ic_email}
                                        name="email"
                                        value={values.email}
                                        invalid={touched.email && errors.email}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleAPIError();
                                          }}
                                        className="mb-0"
                                    />
                                    {(touched.email && errors.email) &&
                                        <ErrorText className="px-3 mb-0">{errors.email}</ErrorText>
                                    }
                                    {isValid && fpError!=='' && <ErrorText className="px-3 mb-0 text-center">{fpError}</ErrorText>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <AppButton
                            style={{ width: 191, height: 64, marginTop: '6%' }}
                            type="submit"
                            bgcolor={PALETTE_COLOR.ACCENT_PURPLE}
                            bordercolor={PALETTE_COLOR.ACCENT_PURPLE}
                            borderhovercolor={PALETTE_COLOR.ACCENT_PURPLE_LIGHT}
                            bghovercolor={PALETTE_COLOR.ACCENT_PURPLE_LIGHT}>
                            Send Request
                        </AppButton>
                    </Form>
                )}

            </Formik>


        </ModalContentWrapper>
    );
};
