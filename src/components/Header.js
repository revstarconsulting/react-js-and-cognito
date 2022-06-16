import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '@assets/images/logo.png';
import Avatar from '@assets/images/Avatar.png';
import ic_education from '@assets/icons/ic_education.svg';
import ic_notification from '@assets/icons/ic_notification.svg';
import ic_arrow_down from '@assets/icons/ic_arrow_down.svg';
import back from '@assets/icons/back.svg';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@auth/ProvideAuth';
import { useDispatch } from 'react-redux';
import { setAppLoadingAction } from '@redux/actions/appActions';
import { PROFILE } from '@navigation/CONSTANTS';
import { PALETTE_COLOR } from "@config/CONSTANTS";
import { useSelector } from 'react-redux';

const BACKGROUND_BlUE = PALETTE_COLOR.BACKGROUND_BlUE;

const HeaderBar = styled.header`
    width: 100%;
    display: flex;
    height: 60px;
    position: fixed;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.06);
    z-index: 1;
`;

const ImageWrapper = styled.img`
    position: absolute;
    width: 40.53px;
    height: 40px;
    left: 10px;
    top: 10px;
`;

const IconWrapper = styled.img`
    margin:0px 17.5px 0px 17.5px;
    cursor:pointer;
`;


const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  height: 60px;
`;

const UserAvatar = styled.img`
    width: 40px;
    height: 40px;
    margin-right:12px;
`;

const DropDownDetailsWrapper = styled.div`
  padding: 0px;
  height: 60px;
  margin-top:15px;
`;


const ArrowDown = styled.img`
  width: 60px;
  height: 27px;
  cursor:pointer;
`;

const NameWrapper = styled.p`
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    margin-bottom:0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
`;

const RoleWrapper = styled.div`
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    /* identical to box height */


    /* Middle Gray */

    color: #6D737B;
`;
const MenuItemWrapper = styled(MenuItem)`
    &:hover {
        background-color: ${BACKGROUND_BlUE};
    }
`;


// It's advisable to put styles object outside React component scope whenever possible.
const menuStyles = {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    borderRadius: 16
};

const Header = () => {
    const { userData } = useSelector((state) => state.app);
    const { t } = useTranslation();
    let auth = useAuth();
    const history = useHistory();
    const dispatch = useDispatch();
    //To get query param value
    const location = useLocation();
    const [params, setParams] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const singleValue = queryParams.get('b');
        setParams(singleValue);
    }, [params, location]);

    const loading = React.useCallback(
        async (isLoading) => {
            dispatch(setAppLoadingAction(isLoading));
        },
        [dispatch]
    );

    let goTo = (route) => {
        history.push(route);
    };

    let goBack = () => {
        history.goBack();
    };

    let logout = (values) => {
        loading(true);
        console.log('SS:: login btn clicked...');
        auth
            .signout()
            .then((res) => {
                loading(false);
                window.location.reload();
                console.log('SS:: logged in successfully by:', res);
            })
            .catch((error) => {
                console.error(error);
                loading(false);
            });
    };

    return (
        <HeaderBar>
            <Container fluid>
                <Row>
                    <Col xl={4} lg={4} className='d-flex justify-content-start align-items-center'>
                        <ImageWrapper src={logo} alt="Xcelvations Logo" height="40" />
                        {
                            params &&
                            <div style={{ cursor: 'pointer' }} onClick={goBack}>
                                <IconWrapper src={back} alt="back" style={{ marginRight: '4px', marginLeft: '60px' }} /> Back
                            </div>
                        }
                    </Col >
                    <Col xl={{ span: 3, offset: 5 }} lg={{ span: 4, offset: 4 }} style={{ display: 'flex', alignItems: 'center', marginTop: -8 }} className='justify-content-end'>
                        <IconWrapper src={ic_education} alt="Cap logo" />
                        <IconWrapper src={ic_notification} alt="Cap logo" />
                        <UserAvatar src={Avatar} alt='avatar' />
                        <DropDownDetailsWrapper>
                            <NameWrapper title={userData?.cognitoUser?.idToken?.payload?.family_name}>{userData?.cognitoUser?.idToken?.payload?.family_name}</NameWrapper>
                            <RoleWrapper>{userData?.cognitoUser?.idToken?.payload['cognito:groups'].join(",")}</RoleWrapper>
                        </DropDownDetailsWrapper>
                        <Menu
                            menuStyles={menuStyles}
                            menuButton={
                                <DropDownWrapper>
                                    <ArrowDown src={ic_arrow_down} alt='IcArrowDown'></ArrowDown>

                                </DropDownWrapper>
                            }
                            transition
                        >
                            <MenuItemWrapper >
                                <div>
                                    <NameWrapper style={{ textAlign: "left" }}>
                                        {t("My Account")}
                                    </NameWrapper>
                                    <RoleWrapper>
                                        {userData?.cognitoUser?.idToken?.payload?.email}
                                    </RoleWrapper>
                                </div>
                            </MenuItemWrapper>
                            <MenuItemWrapper onClick={() => goTo(PROFILE)}>
                                {t('Profile')}
                            </MenuItemWrapper>
                            <MenuItemWrapper onClick={() => logout()}>
                                {t('Logout')}
                            </MenuItemWrapper>
                        </Menu>
                    </Col>
                </Row>
            </Container>
        </HeaderBar>
    );
};
export default Header;

