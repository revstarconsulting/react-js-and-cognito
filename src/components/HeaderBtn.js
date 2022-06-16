import React from "react";
import styled from 'styled-components';


const Icon = styled.img`
`;

const DivIcon = styled.div`
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 5px 8px 15px;
  width: 178px;
  height: 40px;
  background: white;
  background-color: white;
  border: 1px solid #E7ECF4;
  border-radius: 20px;
  margin-left: 15px;
  cursor: pointer;
`;

const Tittle = styled.div`
  padding: 7px 7px 7px 7px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #457AFB;
`;

export const HeaderBtn = ({ width, children, icon, action }) => {
  return (
    <Container style={{ width }} onClick={action}>
      <DivIcon ><Icon src={icon}></Icon></DivIcon>
      <Tittle>
        {children}
      </Tittle>
    </Container>
  );
};
