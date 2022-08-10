import type {LinksFunction} from '@remix-run/node';
import {Links, LiveReload, Outlet, Scripts} from '@remix-run/react';

import styles from './tailwind.css';

export const links: LinksFunction = () => [{rel: 'stylesheet', href: styles}];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="An app built on Remix Run for learning"
        />
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        <Outlet />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
