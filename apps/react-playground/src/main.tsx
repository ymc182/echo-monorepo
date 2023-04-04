import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { NearProvider } from '@echo-monorepo/near-provider';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <NearProvider>
      <App />
    </NearProvider>
  </StrictMode>
);
