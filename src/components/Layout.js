import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import styled from 'styled-components';
import { Scrollbars } from "react-custom-scrollbars";

// component styles
const Wrapper = styled.div`
    @media (min-width: 700px) {
        display: flex;
        top: 61px;
        position: relative;
        height: calc(100% - 64px);
        width: 100%;
        flex: auto;
        flex-direction: column;
    }
`;
const Main = styled.main`
    position: fixed;
    height: calc(100% - 185px);
    width: 100%;
    padding: 1em;
    background: #F5F9FF;
    @media (min-width: 700px) {
        flex: 1;
        margin-left: 60px;
        height: calc(100% - 64px);
        width: calc(100% - 60px);
    }
`;

export const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <Wrapper>
                <Navigation />

                <Main>
                    <Scrollbars>
                        {children}
                    </Scrollbars>
                </Main>
            </Wrapper>
        </React.Fragment>
    );
};