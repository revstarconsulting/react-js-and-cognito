import React, { useState } from "react";
import { PALETTE_COLOR } from "@config/CONSTANTS";
import { Row, Col, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import loginBackground from '@assets/images/loginBackground.png';
import logowe from '@assets/images/logo_we.png';
import logo from '@assets/images/logo.png';
import bellClock from '@assets/images/alarm_clock.png';
import calendar from '@assets/images/calendar.png';
import { Redirect, useLocation } from "react-router-dom";
import { LoginForm } from "./LoginForm"
import { ChangePassForm } from "./ChangePassForm";
import { AppModal } from "@components/AppModal";
import { useCognitoAuth } from "./LoginUtils";
import { useTranslation } from "react-i18next";
import { DASHBOARD } from "navigation/CONSTANTS";
import { ResetPassForm } from "./ResetPassForm";
import { ResetPassSuccess } from "./ResetPassSuccess";
import packageInfo from '../../../package.json';

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url(${loginBackground});
  background-color: #E6F0FF;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const LogoContainer = styled.div`
  margin-top:-40px;
`;

const LogoContainerRP = styled.div`
  margin-top:-55px;
`;

const BottomContainerL = styled.div`
  margin-bottom:-80px;
`;

const BottomContainerCP = styled.div`   
  position: absolute;
`;

const LogoWe = styled.img`
  width: 142px;
  height: 142px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;


const BellClock = styled.img`
  width: 160px;
  height: 94px;
  right: -110px ;
  position: relative;
`;

const CalendarL = styled.img`
  width: 366px;
  height: 140px;
  left: -80px ;
  //bottom: -10px;
  position: relative;
`;

const CalendarCP = styled.img`
  width: 366px;
  height: 140px;
  left: -95px ;
  top: 400px;
  position: relative;
  z-index:4;
`;

const CalendarRP = styled.img`
  width: 366px;
  height: 140px;
  left: -95px ;
  bottom: 25px;
  position: relative;
  z-index:4;
`;

const StyledCard = styled(Card)`
  width: 35rem;
  border-radius: 32px;
  border: none;
  @media (max-width: 1399.98px) {   
    margin-top: ${({ body }) => body ? '80px' : 'unset'};;
  }

`;

const SingUpAction = styled(Button)`
  font-size: 14px;
  text-align:center;
  position:relative;
  top:-120px;
  color: ${PALETTE_COLOR.MIDDLE_GRAY};
  text-decoration: none;
  border-radius: 20px;
  padding: 10px 20px;
  :hover, :focus {
    border: 1px solid rgba(109, 115, 123, 0.2);
    box-sizing: border-box;
    color: ${PALETTE_COLOR.MIDDLE_GRAY};
    box-shadow: unset;
  }
`;

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

const ModalEmail = styled.a`
  color: ${PALETTE_COLOR.ACCENT_GREEN}; 
  text-decoration: none;
  font-weight: 600;
  :hover {
    color: ${PALETTE_COLOR.ACCENT_GREEN};
  }
`;

const ModalContentWrapper = styled.div`
  padding: 20px 20px 10px 30px;
`;

function redirectToHome(from) {
  return <Redirect to={from} />;
}



export default function Login() {
  const { t } = useTranslation();
  let location = useLocation();
  const [cognitoUser, error, loading] = useCognitoAuth();
  if (error) console.log(error);
  const [loginInfo, setloginInfo] = useState({
    isFirstLogin: false,
    resetPass: { isResetPass: false, success: false },
    user: {},
    userAttributes: {}
  });
  const [openSignUp, setOpenSignUp] = useState(false);
  const { isFirstLogin } = loginInfo;
  const { resetPass } = loginInfo;
  const { isResetPass, success } = resetPass;
  console.log('valor de isResetPass ', isResetPass)


  const handleClickOpenSignUpModal = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUpModal = () => {
    setOpenSignUp(false);
  };

  let { from } = location.state || { from: { pathname: DASHBOARD } };
  if (loading) {
    return t("loading");
  }
  if (cognitoUser) {
    return redirectToHome(from);
  }

  return (
    <>
      <Wrapper style={{ overflowY: isResetPass ? 'auto' : 'unset' }}>
      <label style={{display:'flex', justifyContent: 'right', alignItems:'flex-end', fontSize:'6px'}}>{`v. ${packageInfo.version}`}</label>
        <div className="container d-flex flex-column justify-content-center h-100 align-items-center">
          <Row >
            <Col>
              <StyledCard body={isResetPass}>
                {isResetPass ?
                  <LogoContainerRP className="d-flex justify-content-between  ">
                    <Col ></Col>
                    <Col className="d-flex justify-content-center">
                      <Logo src={logo} alt='logo' />
                    </Col>
                    <Col >
                      <BellClock src={bellClock} alt='bellClock'></BellClock>
                    </Col>
                  </LogoContainerRP>
                  :
                  <LogoContainer className="d-flex justify-content-between  ">
                    <Col ></Col>
                    <Col className="d-flex justify-content-center">
                      {/* TODO */}
                      {success ? <Logo src={logo} alt='logo' /> : <LogoWe src={logowe} alt='logo' />}
                    </Col>
                    <Col >
                      {/* TODO */}
                      <BellClock style={{ height: success && '94px' }} src={bellClock} alt='bellClock'></BellClock>
                    </Col>
                  </LogoContainer>
                }


                {/* TODO */}
                {isFirstLogin ? <ChangePassForm loginInfo={loginInfo} setloginInfo={loginInfo} />
                  : isResetPass ? <ResetPassForm loginInfo={loginInfo} setloginInfo={setloginInfo} />
                    : success ? <ResetPassSuccess setloginInfo={setloginInfo} />
                      : <LoginForm setloginInfo={setloginInfo} />}



                {(!isFirstLogin && !isResetPass && !success) &&
                  <BottomContainerL>
                    <CalendarL src={calendar} alt='calendar'></CalendarL>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <SingUpAction variant="link" onClick={handleClickOpenSignUpModal}>Where can I Sign Up?</SingUpAction>
                    </div>
                  </BottomContainerL>
                }
                {isFirstLogin &&
                  <BottomContainerCP>
                    <CalendarCP src={calendar} alt='calendar' />
                  </BottomContainerCP>
                }
                {/* TODO */}
                {success &&
                  <BottomContainerCP>
                    <CalendarCP src={calendar} alt='calendar' style={{ top: '200px' }} />
                  </BottomContainerCP>
                }
                {isResetPass &&
                  <BottomContainerCP style={{ top: '570px' }}>
                    <CalendarRP src={calendar} alt='calendar' />
                  </BottomContainerCP>
                }
              </StyledCard>
            </Col>
          </Row>
        </div>
      </Wrapper>


      <AppModal open={openSignUp} handleclose={handleCloseSignUpModal} title={('Help')}>
        <ModalContentWrapper>
          <ModalTitle>Where can I sign up?</ModalTitle>
          <ModalText>Since we are only at the beginning of our journey, access to weCare can be granted only by invitation.</ModalText>
          <ModalText>If you want to be part of the weCare Team, please send us a message to
            <ModalEmail href="mailto:contact@wecarestaffservices.com"> contact@wecarestaffservices.com</ModalEmail>
          </ModalText>
        </ModalContentWrapper>
      </AppModal>


    </>
  );
}
