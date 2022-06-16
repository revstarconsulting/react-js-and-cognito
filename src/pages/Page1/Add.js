import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "redux/actions/appActions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Card, Container, Breadcrumb, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import AppPanel from "@components/AppPanel";
import LabelForm from "@components/LabelForm";
import {AppButton} from "@components";
import dollarCircleIcon from '@assets/icons/dollar_circle.svg';
import close_square from '@assets/icons/close_square.svg';
import UserIcon from '@assets/icons/User.svg';
const FormIcon = styled.img`
`;
const StyleButtons = styled.div`
padding-top: 30px;
    margin: 0.875rem 30px 30px;
    border-top: 0.2px solid #8080803d;
    display: flex;
    `;
const StyledFormControl = styled(FormControl)`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  background: transparent;
  border-radius: 16px;
  border-color: transparent;
  color: #000000;
  &:focus {
    background: transparent;
    border-color: transparent;
    box-shadow: unset;
  }
  ::placeholder {
    color: #B4C0CF;
  }
  :-webkit-autofill { 
   
    -webkit-text-fill-color: #000000;
    -webkit-background-color: #000000;
    background-color: #000000 !important;
  }
  :-webkit-autofill:focus { 

    -webkit-text-fill-color: #000000;
    -webkit-background-color: #000000 !important;
  }
  :-internal-autofill-selected {
    background-color: rgb(232, 240, 254) !important;
    background-image: none !important;
    color: rgb(0, 0, 0) !important;
  }
}
`;


const StyledInputIcon = styled(InputGroup.Text)`
  background: #EFF4FB;
  border-radius: 16px;
  border: none;
  padding: unset;
`;

const StyledInput = styled(InputGroup.Text)`
  background: #EFF4FB;
  border-radius: 16px;
  border-color: transparent;
  height:40px;
  width:400px;
`;


export const AddOrganization = () => (
  <Formik
    initialValues={{ name: '', address: '', phone: '' }}
    validationSchema={Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less'),
      address: Yup.string()
        .max(20, 'Must be 20 characters or less'),
      phone: Yup.string().email('Invalid email address').required('Required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {formik => (
      <Container fluid>
        <div className="container d-flex flex-column justify-content-center h-100 align-items-center">
          <AppPanel body title="Add an Organization" icon={close_square} src={close_square}>
            <div>
              <form onSubmit={formik.handleSubmit} style={{ padding: "30px 30px 0" }}>
                <Row >
                  <Col >
                    <LabelForm tittle="Name"></LabelForm>
                  </Col>
                  <Col >
                    <StyledInput className="mb-3">
                      <StyledInputIcon id="basic-addon1">
                      </StyledInputIcon>
                      <StyledFormControl
                        placeholder="Required"
                        id="name"
                        aria-label="name"
                        type="text"
                        {...formik.getFieldProps('name')}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                      ) : null}
                    </StyledInput>
                  </Col>
                </Row>


                <Row>
                  <Col >
                    <LabelForm tittle="Color"></LabelForm>
                  </Col>
                  <Col>
                    <StyledInput className="mb-3">
                      <StyledInputIcon id="basic-addon1">
                      </StyledInputIcon>
                      <StyledFormControl
                        placeholder="Required"
                        id="address"
                        aria-label="address"
                        type="text"
                        {...formik.getFieldProps('address')}
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <div>{formik.errors.address}</div>
                      ) : null}
                    </StyledInput>
                  </Col>
                </Row>

                <Row>
                  <Col >
                    <LabelForm tittle="Address"></LabelForm>
                  </Col>
                  <Col >
                    <StyledInput className="mb-3">
                      <StyledInputIcon id="basic-addon1">
                      </StyledInputIcon>
                      <StyledFormControl
                        placeholder="Required"
                        id="address"
                        aria-label="address"
                        type="text"
                        {...formik.getFieldProps('address')}
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <div>{formik.errors.address}</div>
                      ) : null}
                    </StyledInput>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <LabelForm tittle="Representative"></LabelForm>
                  </Col>
                  <Col>
                    <StyledInput className="mb-3">
                      <StyledInputIcon id="basic-addon1">
                        <FormIcon src={UserIcon}></FormIcon>
                      </StyledInputIcon>
                      <StyledFormControl
                        placeholder="Required"
                        id="representative"
                        aria-label="representative"
                        type="text"
                        {...formik.getFieldProps('representative')}
                      />
                      {formik.touched.representative && formik.errors.representative ? (
                        <div>{formik.errors.representative}</div>
                      ) : null}
                    </StyledInput>
                  </Col>
                </Row>

                <Row>
                  <Col >
                    <LabelForm tittle="Contact Phone"></LabelForm>
                  </Col>
                  <Col>
                    <StyledInput className="mb-3">
                      <StyledInputIcon id="basic-addon1">
                      </StyledInputIcon>
                      <StyledFormControl
                        placeholder="Required"
                        id="phone"
                        aria-label="phone"
                        type="text"
                        {...formik.getFieldProps('phone')}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div>{formik.errors.phone}</div>
                      ) : null}
                    </StyledInput>
                  </Col>
                </Row>

                <Row>
                  <Col >
                    <LabelForm tittle="Contact Email"></LabelForm>
                  </Col>
                  <Col >
                    <StyledInput className="mb-3">
                      <StyledInputIcon id="basic-addon1">
                      </StyledInputIcon>
                      <StyledFormControl
                        placeholder="Required"
                        id="email"
                        aria-label="email"
                        type="text"
                        {...formik.getFieldProps('email')}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                      ) : null}
                    </StyledInput>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <LabelForm tittle="Main Site"></LabelForm>
                  </Col>
                  <Col >
                    <StyledInput className="mb-3">
                      <StyledInputIcon id="basic-addon1">
                      </StyledInputIcon>
                      <StyledFormControl
                        placeholder="Required"
                        id="main_site"
                        aria-label="main_site"
                        type="text"
                        {...formik.getFieldProps('main_site')}
                      />
                      {formik.touched.main_site && formik.errors.main_site ? (
                        <div>{formik.errors.main_site}</div>
                      ) : null}
                    </StyledInput>
                  </Col>
                </Row>

                <Row>
                  <Col >
                    <LabelForm tittle="Bill Rate"></LabelForm>
                  </Col>
                  <Col >
                    <StyledInput className="mb-3">
                      <StyledInputIcon id="basic-addon1">
                        <FormIcon src={dollarCircleIcon}></FormIcon>
                      </StyledInputIcon>
                      <StyledFormControl
                        placeholder="0.00"
                        id="bill_rate"
                        aria-label="bill_rate"
                        type="number"
                        {...formik.getFieldProps('bill_rate')}
                      />
                      {formik.touched.bill_rate && formik.errors.bill_rate ? (
                        <div>{formik.errors.bill_rate}</div>
                      ) : null}
                    </StyledInput>
                  </Col>
                </Row>

                <Row>
                  <Col >
                    <LabelForm tittle="Groups"></LabelForm>
                  </Col>
                  <Col >
                    <StyledInput className="mb-3">
                      <StyledInputIcon id="basic-addon1">
                      </StyledInputIcon>
                      <StyledFormControl
                        placeholder="Required"
                        id="groups"
                        aria-label="groups"
                        type="text"
                        {...formik.getFieldProps('groups')}
                      />
                      {formik.touched.groups && formik.errors.groups ? (
                        <div>{formik.errors.groups}</div>
                      ) : null}
                    </StyledInput>
                  </Col>
                </Row>

              </form>
            </div>
            <StyleButtons>
              <AppButton size="lg" tittle="Confirm">
              </AppButton>
              <AppButton size="lg" tittle="Delete">
              </AppButton>
            </StyleButtons>
          </AppPanel>

        </div>
      </Container>
    )}
  </Formik>
);
