import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@material-ui/core';
import { filter } from 'rxjs/operators';

import Visualizer, { Props } from '../Visualizer';

const SelectionSortVisualizer: Visualizer = ({
  set: externalSet,
  userActionsObservable
}: Props) => {
  const [set, setSet] = useState<VisualizableSet>(externalSet);

  useEffect(() => { setSet(externalSet); }, [externalSet]);

  const nextStep = useCallback((function*() {
      const N = set.length;

      for (let i = 0; i < N; i++) {
        let min = i;

        for (let j = i+1; j < N; j++)
          if (set[j] < set[min]) min = j;

        let temp = set[i];

        set[i] = set[min];
        set[min] = temp;

        console.log(set);
        setSet(set);

        yield;
      }
    })().next,
    [set]
  );

  // useObservable(() =>
  //   userActionsObservable
  //     .pipe(
  //       filter(a => a.type === "request-next")
  //     )
  //     .subscribe(() => {

  //     })
  // );

  console.log(set);

  return (
    <div>
      {set.map((el, index) => (
        <div key={index}>
          {el}
        </div>
      ))}

      <Button onClick={nextStep}>
        Next
      </Button>
    </div>
  );
};

export default SelectionSortVisualizer;