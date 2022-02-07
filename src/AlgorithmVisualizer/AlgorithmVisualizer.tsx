/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import React, { useCallback, useMemo, useState } from 'react';
import { Button } from "@material-ui/core";

import SetEditor from "./SetEditor";
import Snapshot, { Props as SnapshotProps } from "./Snapshot"

import selectionSort from './algorithms/selectionSort';

export default function AlgorithmVisualizer(): React.ReactElement {
  const [sortGenerator, setSortGenerator] = useState<Generator>();
  const [snapshots, setSnapshots] = useState<SnapshotProps[]>([]);

  const takeSnapshot = useCallback(() =>
    setSnapshots(snapshots => [
      ...snapshots.map(copySnapshot),
      copySnapshot(snapshots[snapshots.length-1])
    ]),
    []
  );

  const updateLastSnapshot = useCallback((
    updater: (p: SnapshotProps) => Partial<SnapshotProps>
  ) =>
    setSnapshots(snapshots => {
      const lastIndex = snapshots.length-1;
      const lastSnapshot = snapshots[lastIndex];
      const rest = snapshots.slice(0, -1);
      const modifiedSnapshot = { ...lastSnapshot, ...updater(lastSnapshot) };
      return [...rest, modifiedSnapshot];
    }),
    []
  );

  const setPointer = useCallback((...[key, value]: Pointer) =>
    updateLastSnapshot(snapshot => ({
      pointers: {
        ...snapshot.pointers,
        [key]: value
      }
    })), []);

  const exchange = useCallback((i: number, j: number) => {
    updateLastSnapshot(snapshot => {
      const set = [...snapshot.set];
      const temp = set[i];
      set[i] = set[j];
      set[j] = temp;
      return { set };
    })
  }, []);

  const setExchange = useCallback(
    (i: number, j: number) =>
      updateLastSnapshot(_ => ({ indexesToBeExchanged: [i, j] })),
    []
  );

  const clearExchange = useCallback(
    () => updateLastSnapshot(_ => ({ indexesToBeExchanged: [] })),
    []
  );

  const onSetEditorChange = useCallback(
    (set: VisualizableSet) => {
      setSortGenerator(selectionSort(set, {
        takeSnapshot,
        setPointer,
        exchange,
        setExchange,
        clearExchange
      }));

      setSnapshots([{
        set,
        pointers: {},
        indexesToBeExchanged: []
      }]);
    },
    []
  );

  const skipToEnd = useCallback(() => {
    let done: boolean | undefined = false;
    while (!done) ({ done } = sortGenerator!.next());
  }, [sortGenerator]);

  return (
    <div>
      <SetEditor onChange={onSetEditorChange} />

      <hr />

      {sortGenerator && (
        <div css={css`
          display: flex;
          margin: 16px 0 !important;
          * { flex-grow: 1; }
          *:not(:first-child) { margin-left: 8px !important; }
        `}>
          <Button
            variant="contained"
            onClick={() => sortGenerator.next()}
            size="small"
          >
            Step
          </Button>

          <Button
            variant="contained"
            onClick={skipToEnd}
            size="small"
          >
            Skip To End
          </Button>
        </div>
      )}

      {snapshots.map((snapshotProps, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <hr />}
          <Snapshot key={index} {...snapshotProps} />
        </React.Fragment>
      ))}
    </div>
  );
}

function copySnapshot(snapshot: SnapshotProps): SnapshotProps {
  return {
    ...snapshot,
    set: [...snapshot.set]
  };
}