import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function GridX(props) {
  return (
    <GridX>
      <div
        css={css`
          border: 1px black solid;
        `}
      >
        {props.children}
      </div>
    </GridX>
  );
}
