/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import React, { useCallback, useState } from 'react';
import { TextField, Button } from "@material-ui/core";

type Props = {
  onChange: (n: number) => void,
  default: number;
};

export default function NForm(props: Props): React.ReactElement {
  const [N, setN] = useState(props.default);

  const onSubmit = useCallback((ev) => {
    ev.preventDefault();
    props.onChange(N);
  }, [N]);

  const onChange = useCallback((ev) => {
    const value = parseInt(ev.target.value);
    if (typeof value === "number") setN(value);
  }, [setN]);

  return (
    <form onSubmit={onSubmit} css={css`
      display: flex;
      align-items: end;
    `}>
      <TextField
        label="N"
        type='number'
        value={N}
        onChange={onChange}
        inputProps={{ min: 1}}
      />

      <Button
        type='submit'
        variant='contained'
        css={css`margin-left: 8px;`}
      >Set N</Button>
    </form>
  );
}