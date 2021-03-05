import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function GridY(props) {
  return (
    <GridY>
      <div
        css={css`
        border: 1px black solid;
        `}
      >{props.children}</div>
    </GridY>
  );
}
