// import { StrictMode } from 'react';
import MainCanvas from './main-canvas';
import MainUI from './main-ui';
import { UserProvider } from '@supabase/auth-helpers-react';
import { GlobalStateProvider } from './state/global.provider';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { supabaseClient } from './lib/supabase';

const Root = () => (
  // Strict mode was causing xstate to double initialize machines
  // Disabled for now
  // <StrictMode>
  <BrowserRouter>
    <UserProvider supabaseClient={supabaseClient}>
      <GlobalStateProvider>
        <MainCanvas />
        <MainUI />
      </GlobalStateProvider>
    </UserProvider>
  </BrowserRouter>
  // </StrictMode>
);

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Root />);
