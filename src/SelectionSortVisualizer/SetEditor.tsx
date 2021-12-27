import React, { useCallback, useMemo, useState } from 'react';
import NForm from './NForm';

const DEFAULT_N = 10;

type Props = {
  onChange: (set: number[]) => void
};

export default function SetEditor(props: Props): React.ReactElement {
  const [N, setN] = useState<number>(10);
  const [set, setSet] = useState<number[]>(randomPermutation(N));

  const onNChange = useCallback((n: number) => {
    alert(n);

    if (n < set.length) {
      setSet(randomPermutation(n));
    } else if (n > set.length) {
      const prevSet = set.slice(0, set.length);
      const extraSet = randomPermutation(set.length, n);

      console.log({ prevSet, extraSet });

      const newSet = [...prevSet, ...extraSet]

      console.log({ newSet });

      setSet(newSet);
    }

    setN(n);
  }, [set, setSet, N]);

  const onElementChange = useCallback((ev: React.ChangeEvent, index: number ) => {

  }, []);

  const useRandomPermutation = useCallback(() => setSet(randomPermutation(N)), [N]);

  return (
    <div>
      <NForm
        onChange={onNChange}
        default={DEFAULT_N}
      />

      <button onClick={useRandomPermutation}>
        Use Random Permutation
      </button>

      {set.map((el, index) => (
        <input
          key={index}
          type="number"
          value={el}
          onChange={(ev) => onElementChange(ev, index)}
        />
      ))}
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