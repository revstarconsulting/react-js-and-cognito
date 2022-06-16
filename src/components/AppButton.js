import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Tooltip } from '@mui/material';
import { PALETTE_COLOR } from "@config/CONSTANTS";

const DEF_BACKGROUND_COLOR = PALETTE_COLOR.ACCENT_GREEN;
const DEF_TEXT_COLOR = PALETTE_COLOR.MAIN_WHITE;
const HOVER_BACKGROUND_COLOR = PALETTE_COLOR.ACCENT_GREEN_LIGHT;

const ButtonW = styled(Button)`
  font-size: 16px;
  background: ${(props) => (props.bgcolor ? props.bgcolor : DEF_BACKGROUND_COLOR)};
  border-color: ${(props) => (props.bordercolor ? props.bordercolor : DEF_BACKGROUND_COLOR)};
  border-radius: 32px;
  color: ${(props) => (props.color ? props.color : DEF_TEXT_COLOR)};
  height: 40px;
  align-items: center;
  justify-content:center;
  text-align:center;
  display: flex;
  flex-direction: row;
  :hover, :active,:focus {
    background: ${(props) => (props.bghovercolor ? props.bghovercolor : HOVER_BACKGROUND_COLOR)};
    border-color: ${(props) => (props.borderhovercolor ? props.borderhovercolor : HOVER_BACKGROUND_COLOR)};
    color: ${(props) => (props.hovercolor ? props.hovercolor : DEF_TEXT_COLOR)};
    box-shadow: unset;
  }
`;

const IconWrapper = styled.img`
  margin-right: 5px;
`


export const AppButton = (props) => {
  return (
    <>
      {props.tooltiptitle ? <Tooltip title={props.tooltiptitle}>
        <ButtonW bgcolor={props.bgcolor} {...props} >
          {props.icon ? <IconWrapper src={props.icon} alt={"icon"} /> : null}
          {props.children}
        </ButtonW>
      </Tooltip> :
        <ButtonW bgcolor={props.bgcolor} {...props} >
          {props.icon ? <IconWrapper src={props.icon} alt={"icon"} /> : null}
          {props.children}
        </ButtonW>
      }
    </>
  );
};
export default AppButton
