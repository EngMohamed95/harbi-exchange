import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { RatesProvider } from './hooks/useRates';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <RatesProvider>
    <App />
  </RatesProvider>
);
