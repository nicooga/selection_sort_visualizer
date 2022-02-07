/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import React, { useCallback, useState } from 'react';
import { Button } from "@material-ui/core";

import ElementInput from './ElementInput';
import NForm from './NForm';

const DEFAULT_N = 10;

type Props = {
  onChange: (set: VisualizableSet) => void;
};

export default function SetEditor(props: Props): React.ReactElement {
  const [N, setN] = useState<number>(DEFAULT_N);
  const [set, setSet] = useState<VisualizableSet>(randomPermutation(N));

  const onNChange = useCallback((n: number) => {
    if (n < set.length)
      setSet(randomPermutation(n));
    else if (n > set.length)
      setSet([
        ...set.slice(0, set.length),
        ...randomPermutation(set.length, n)
      ]);

    setN(n);
  }, [set, setSet, N]);

  const onElementChange = useCallback((index: number, newValue: number) =>
    setSet((set: VisualizableSet) => {
      const currentValue = set[index];
      const newSet = [...set];

      newSet[newSet.findIndex(el => el == newValue)] = currentValue;
      newSet[index] = newValue;

      return newSet;
    }),
    []
  );

  const randomize = useCallback(() => setSet(randomPermutation(N)), [N]);

  const onSubmit = useCallback(() => props.onChange([...set]), [set]);

  return (
    <div css={css`
      display: flex;
      flex-direction: column;
    `}>
      <div
        css={css`
          display: flex;
          align-items: end;
          padding: 16px 0;
        `}
      >
        <NForm
          onChange={onNChange}
          default={DEFAULT_N}
        />

        <span css={css`flex-grow: 1;`} />

        <Button
          onClick={randomize}
          variant='contained'
          size="small"
        >
          Randomize
        </Button>

        <Button
          onClick={onSubmit}
          variant='contained'
          color="primary"
          size="small"
          css={css`margin-left: 8px !important;`}
        >
          Visualize
        </Button>
      </div>

      <div css={css`display: flex; justify-content: center;`}>
        {set.map((el, index) => (
          <div
            key={`${index}-${el}`}
            css={css`&:not(:first-of-type) { margin-left: 8px; }`}
          >
            <ElementInput
              onChange={el => onElementChange(index, el)}
              value={set[index]}
              max={N}
              label={index+1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Generate a randomly ordered array with all the numbers in the interval [minN, maxN).
 */
function randomPermutation(maxN: number): number[];
function randomPermutation(minN: number, maxN: number): number[];
function randomPermutation(...args: number[]): number[] {
  let minN: number = 0;
  let maxN: number;

  if (args.length == 1)
    maxN = args[0];
  else if (args.length == 2) {
    minN = args[0];
    maxN = args[1];
  }

  const a: number[] = [];
  let index = 0;
  for (let i = minN; i < maxN!; i++) a[index++] = i+1;
  shuffle(a);
  return a;
}

function shuffle(a: any[]): void {
  const N = a.length;

  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
}