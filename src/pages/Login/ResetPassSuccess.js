import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { PALETTE_COLOR } from "@config/CONSTANTS";
import { AppButton } from 'components';


const H2 = styled.h2`
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
`;
const P = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
`;

export const ResetPassSuccess = ({ setloginInfo }) => {

  const returnSignin = () => {
    setloginInfo((pre) => { return { ...pre, resetPass: { isResetPass: false, success: false } } });
  }

  return (
    <Container className="baseForm px-5 pt-2 pb-2">
      <Row>
        <Col className="mt-2" xs={12} xl={12}>
          <H2 className="text-center" >Password Changed</H2>
          <P className="text-center mb-2">Now you can log in with your new password</P>
        </Col>
      </Row>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <AppButton style={{ width: 198, height: 64, zIndex: 5 }}
          className="mt-4 mb-5"
          type="submit"
          onClick={() => returnSignin()}
          bgcolor={PALETTE_COLOR.ACCENT_PURPLE}
          bordercolor={PALETTE_COLOR.ACCENT_PURPLE}
          borderhovercolor={PALETTE_COLOR.ACCENT_PURPLE_LIGHT}
          bghovercolor={PALETTE_COLOR.ACCENT_PURPLE_LIGHT}>
          Back to Sign In
        </AppButton>
      </div>
    </Container>
  )
};

