import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { styled as muiStyled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

import close_square from '@assets/icons/close_square.svg';

const BootstrapDialog = muiStyled(Dialog)((props) => ({
  "& .MuiDialogContent-root": {
    padding: "5px",
  },
  "& .MuiDialogActions-root": {
    padding: props.theme.spacing(1),
  },
  "& .MuiPaper-root": {
    borderRadius: props.inside ? "16px" : "32px",
    overflowX: "hidden",
  },
}));

const DialogTitleWrapper = styled(DialogTitle)`
  background: #FFFFFF;
  font-family: Poppins !important;
  font-style: normal !important;
  font-weight: ${(props) => (props.inside ? '400 !important' : '600 !important')};
  font-size: ${(props) => (props.inside ? '24px !important' : '20px !important')};
  line-height: 30px !important;
  color: #000000;
  text-align: ${(props) => (props.inside ? 'left' : 'center')};
  padding-left: ${(props) => (props.inside ? '30px !important' : '0px')};
  box-shadow: ${(props) => (props.boxshadow === "none" ? "none" : '0px 10px 20px rgba(0, 0, 0, 0.04)')};
`;

const DialogActionsWrapper = styled.div`
  padding: 16px;
`;

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitleWrapper sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 10,
          }}
        >
          <img src={close_square} alt="close_square" />
        </IconButton>
      ) : null}
    </DialogTitleWrapper>
  );
};

export const AppModal = (props) => {
  const { handleclose, open, title, children, actions } = props;
  return (
    <BootstrapDialog
      onClose={handleclose}
      aria-labelledby="customized-dialog-title"
      open={open}
      PaperProps={{ style: { overflowY: 'visible' } }}
      scroll={"body"}
      {...props}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleclose} {...props}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers={false} style={{ borderTop: 'unset', borderBottom: 'unset', overflowY: 'visible' }}>{children}</DialogContent>
      {actions ? <DialogActionsWrapper>{actions}</DialogActionsWrapper> : null}
    </BootstrapDialog>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
