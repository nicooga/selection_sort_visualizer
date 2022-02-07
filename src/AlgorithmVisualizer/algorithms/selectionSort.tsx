const selectionSort: IterableSort = function* (set: VisualizableSet, {
  takeSnapshot,
  setPointer,
  exchange,
  setExchange,
  clearExchange
}) {
  const N = set.length;

  for (let i = 0; i < N; i++) {
    setPointer("i", i);

    let min = i;

    setPointer("min", min);

    for (let j = i+1; j < N; j++) {
      setPointer("j", j);

      if (set[j] < set[min]) {
        yield;
        min = j;
        setPointer("min", j);
      }

      yield;
    }

    setExchange(i, min);
    yield;
    takeSnapshot();
    exchange(i, min);
    clearExchange();

    const temp = set[i];
    set[i] = set[min];
    set[min] = temp;
  }
}

export default selectionSort;