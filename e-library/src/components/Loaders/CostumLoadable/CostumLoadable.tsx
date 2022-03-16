import React, { Suspense } from 'react';
import routesWithPermissions from '../../../routes/routesWithPermissions';
import { getUserRole } from '../../../helpers/getUserRole';
import { ReactComponent as Spinner } from '../../../assets/svgIcons/spinner.svg';

interface CostumLoadableProps {
  loader: any;
  path: string;
}

export function CustomLoadable({ loader, path }: CostumLoadableProps) {
  const role = getUserRole();
  const ForbidenPage = () => import('../../../pages/Forbiden');
  const LazyForbide = React.lazy(ForbidenPage);
  const routePermissions = routesWithPermissions[path];
  const LazyComponent = React.lazy(loader);

  return (
    <Suspense
      fallback={
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(30, 34, 40, 0.4)',
          }}
        >
          <div className="loader" key={0}>
            <Spinner className="spinner load-spin" />
          </div>
        </div>
      }
    >
      {(role && routePermissions.includes(role)) ||
      routePermissions.length == 0 ? (
        <LazyComponent />
      ) : (
        <LazyForbide />
      )}
    </Suspense>
  );
}
