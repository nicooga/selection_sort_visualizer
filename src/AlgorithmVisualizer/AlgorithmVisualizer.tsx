import React, { useMemo, useState } from 'react';
import { Subject } from 'rxjs';
import { Button } from "@material-ui/core";

import SetEditor from './SetEditor';
import SelectionSortVisualizer from './visualizers/SelectionSortVisualizer';
import { UserActionsObservable } from './Visualizer';

export default function AlgorithmVisualizer(): React.ReactElement {
  const [set, setSet] = useState<number[]>([]);
  const [visualizedSet, setVisualizedSet] = useState<number[]>([]);

  const userActionsObservable: UserActionsObservable =
    useMemo(() => new Subject(), []);

  return (
    <div>
      <SetEditor onChange={setSet} />

      <Button onClick={() => setVisualizedSet(set)}>
        Visualize
      </Button>

      {visualizedSet.length > 0 && (
        <SelectionSortVisualizer
          set={visualizedSet}
          userActionsObservable={userActionsObservable}
        />
      )}
    </div>
  );
}