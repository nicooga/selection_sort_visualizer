/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/react';

import React, { useCallback, useMemo } from 'react';
import { Chip } from '@material-ui/core';

export type Props = {
  set: VisualizableSet;
  pointers: Record<Pointer[0], Pointer[1]>;
  indexesToBeExchanged: [number, number] | [];
};

const pulse = keyframes`
  50% { background-color: limegreen; }
`;

export default function Snapshot({ set, pointers, indexesToBeExchanged }: Props): React.ReactElement {
  const pointersByIndex =
    useMemo(() => groupPointersByIndex(pointers), [pointers]);

  const isGoingToBeExchanged = useCallback(
    (index: number) => (indexesToBeExchanged as number[]).includes(index),
    [indexesToBeExchanged]
  );

  return (
    <div css={css`display: flex;`}>
      {set.map((el, index) => (
        <div
          key={index}
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <Chip label={el} css={
            isGoingToBeExchanged(index) &&
            css`animation: ${pulse} 2s infinite;`
          } />

          {pointersByIndex[index] && pointersByIndex[index].map((pointerName, index) => (
            <Chip
              key={index}
              label={pointerName}
              variant="outlined"
              size="small"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function groupPointersByIndex(
  pointers: Record<Pointer[0], Pointer[1]>
): Record<Pointer[1], Pointer[0][]> {
  return Object.entries(pointers).reduce(
    (acc, [name, index]) => {
      const existingPointers = acc[index] || [];
      const newPointers = [...existingPointers, name];
      return { ...acc, [index]: newPointers };
    },
    {} as Record<number, string[]>
  );
}