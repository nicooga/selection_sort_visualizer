import React from 'react';
import { Subject } from 'rxjs';

type UserAction<
  T extends string,
  U = undefined
> = {
  type: T,
  payload: U
};

type UserActionsObservable = Subject<
  UserAction<"request-next">
>;

type Props = {
  set: number[];
  userActionsObservable: UserActionsObservable;
};

type Visualizer = (props: Props) => React.ReactElement;

export { Props, UserActionsObservable };
export default Visualizer;