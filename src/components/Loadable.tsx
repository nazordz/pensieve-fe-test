import { Suspense, SuspenseProps, FC } from 'react';

import Loader from './Loader';

const Loadable = (Component: FC<SuspenseProps>) => (props: SuspenseProps) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
