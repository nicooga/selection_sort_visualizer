import React, { useState } from 'react';
import SetEditor from './SetEditor';
import Visualizer from './Visualizer';

export default function SelectionSortVisualizer(): React.ReactElement {
  const [set, setSet] = useState<number[]>([]);

  return (
    <div>
      <SetEditor onChange={setSet} />
      <Visualizer set={set} />
    </div>
  );
}