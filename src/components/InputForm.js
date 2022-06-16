import React, { useState } from "react";
import styled from 'styled-components';

import { InputGroup, FormControl, Button } from 'react-bootstrap';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const StyledInputIcon = styled(InputGroup.Text)`
  background: transparent;
  border-radius: 16px;
  border: none;
  padding: 0.375rem 0.5rem;
  padding-right: ${(props) => (props.iconpaddingright ? props.iconpaddingright : "0.5rem")};
`;

const StyledInput = styled(InputGroup.Text)`
  background: ${(props) => (props.disabled ? "#e9ecef" : props.focused || props.hastext ? "#FFFFFF" : "#EFF4FB")};
  border-radius: 16px;
  border: ${(props) => (props.focused && props.invalid === undefined ? "1px solid #457AFB" :
    props.hastext && props.invalid === undefined ? "1px solid #E7ECF4" :
      props.invalid ? "1px solid #FFACAC" :
        "0px solid transparent")};
  height: ${(props) => (props.height ? props.height : "45px")};
`;

const StyledInputTA = styled(InputGroup.Text)`
  background: ${(props) => (props.focused || props.hastext ? "#FFFFFF" : "#EFF4FB")};
  border-radius: 16px;
  border: ${(props) => (props.focused && props.invalid === undefined ? "1px solid #457AFB" :
    props.hastext && props.invalid === undefined ? "1px solid #E7ECF4" :
      props.invalid ? "1px solid #FFACAC" :
        "0px solid transparent")};

  
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
  &:focus-visible {
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
  :-webkit-appearance:none;
  :-internal-autofill-selected {
    background-color: rgb(232, 240, 254) !important;
    background-image: none !important;
    color: rgb(0, 0, 0) !important;
  }
  :valid {
      border-color: transparent;
  }
  :invalid &:focus {
    border-color: transparent;
}
}
`;


const StyledFormControlTA = styled(FormControl)`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  background: transparent;
  border-color: transparent;
  color: #000000;
  ::placeholder {
    color: #B4C0CF;
  }
  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none; /*remove the resize handle on the bottom right*/
  margin-left:10px;
  height:80px;
}
`;

const InputIcon = styled.img`
`;

const ViewAction = styled(Button)`
  font-size: 13px;
  text-decoration:none;
  text-align: left;
  padding: unset;
  :focus {
    box-shadow: unset;
  }
`;




export const InputForm = (props) => {
  const { icon, ctype = 'text', value } = props;
  const [inputType, setInputType] = useState(ctype);
  const [hideText, setHideText] = useState('View');
  const [focused, setFocused] = React.useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const phoneStyles = {
    borderRadius: 16,
    width: "100%",
    background: (focused || (value && value.length > 0) ? "#FFFFFF" : "#EFF4FB"),
    border: focused && props.invalid === undefined ? "1px solid #457AFB" :
      (value && value.length > 0) && props.invalid === undefined ? "1px solid #E7ECF4" :
        props.invalid ? "1px solid #FFACAC" :
          "0px solid transparent",
    height: (props.height ? props.height : "45px")
  };

  const phoneButtonStyles = {
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    border: "none",
    "&:hover": {
      borderBottomLeftRadius: 16,
      borderTopLeftRadius: 16,
    },
  };

  const phoneDropDownStyles = {
    borderRadius: 16,
    border: "none",
    background: (focused || (value && value.length > 0) ? "#FFFFFF" : "#EFF4FB"),
  };


  const showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInputType((prev) => {
      return prev === 'text' ? 'password' : 'text';
    }
    );
    setHideText((prev) => {
      return prev === 'View' ? 'Hide' : 'View';
    }
    );
    //this.input.focus();
  }

  return (
    <>
      {ctype && ctype === "phone"
        ? <PhoneInput onFocus={onFocus} dropdownStyle={phoneDropDownStyles} buttonStyle={phoneButtonStyles} onBlur={onBlur} inputStyle={phoneStyles} {...props} />
        : ctype && ctype === "textarea" ?
          //TextArea
          <StyledInputTA className="mb-3" focused={focused ? 1 : undefined} hastext={value && value.length > 0 ? 1 : undefined} {...props}>
            <StyledFormControlTA as="textarea" onFocus={onFocus} onBlur={onBlur} type={inputType} {...props} />
          </StyledInputTA>

          :
          //InputText/Password
          <StyledInput className="mb-3" focused={focused ? 1 : undefined} hastext={value && value.length > 0 ? 1 : undefined} {...props}>
            {icon &&
              <StyledInputIcon>
                <InputIcon src={icon}></InputIcon>
              </StyledInputIcon>
            }
            <StyledFormControl onFocus={onFocus} onBlur={onBlur} type={inputType} {...props} />


            {ctype === 'password' &&
              <StyledInputIcon>
                <ViewAction variant="link" onClick={showHide}>{hideText}</ViewAction>
              </StyledInputIcon>
            }
          </StyledInput>}

    </>
  );
};
