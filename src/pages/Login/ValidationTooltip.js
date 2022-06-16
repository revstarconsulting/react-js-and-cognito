import React, { useState, useRef, useEffect } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';

export const ValidationTooltip = (props) => {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');
  const target = useRef(null);
  const { msg, czIndex } = props;

  useEffect(() => {
    setMessage(msg);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [msg]);

  return (
    <>
      <div style={{ width: "100%" }} ref={target} />
      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip
            {...props}
            style={{
              backgroundColor: 'rgba(255, 86, 107, 0.96)',
              padding: '7px 24px',
              height: '48px',
              color: 'white',
              borderRadius: 24,
              position: 'fixed',
              zIndex: czIndex ? czIndex : 1080,
              ...props.style,
            }}
          >
            {message}
          </Tooltip>

        )}
      </Overlay>
    </>
  );
};
