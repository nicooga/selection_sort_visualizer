import React, { useCallback, useState } from 'react';

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
    <form onSubmit={onSubmit}>
      <label htmlFor='N'>N: </label>

      <input
        id='N'
        type='number'
        value={N}
        onChange={onChange}
        min="1"
      />

      <input type='submit' value='Set N' />
    </form>
  );
}