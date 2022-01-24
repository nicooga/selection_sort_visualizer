import React, { useCallback, useState } from 'react';
import { TextField } from "@material-ui/core";
import { SerializedStyles } from '@emotion/react';

type Props = {
  onChange: (el: number) => void;
  value: number;
  max: number;
};

export default function ElementInput(props: Props): React.ReactElement {
  const [value, setValue] = useState<number>(props.value);
  const [displayValue, setDisplayValue] = useState<number | "">(value);

  const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = ev.currentTarget.value;
    const value = parseInt(rawValue);

    if (typeof value === "number" && !isNaN(value)) {
      setValue(value);
      setDisplayValue(value);
      props.onChange(value);
    } else
      setDisplayValue("");
  }, []);

  const onBlur = useCallback(() => setDisplayValue(value), []);

  return (
    <TextField
      type="number"
      value={displayValue}
      onChange={onChange}
      onBlur={onBlur}
      inputProps={{
        min: 1,
        max: props.max
      }}
    />
  );
}