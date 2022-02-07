type VisualizableSet = number[];

type Pointer = [string, number];

type IterableSortDependencies = {
  takeSnapshot: () => void;
  setPointer: (...args: Pointer) => void;
  exchange: (i: number, j: number) => void;
  setExchange: (i: number, j: number) => void;
  clearExchange: () => void;
};

type IterableSort = (
  set: VisualizableSet,
  parameters: IterableSortDependencies
) => Generator;