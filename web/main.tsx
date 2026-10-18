import {createRoot} from 'react-dom/client';
import Home from '../app/page';
import '../app/globals.css';
createRoot(document.getElementById('root')!).render(<Home/>);
// Offline shell (public/sw.js). Browsers expose service workers only on HTTPS and localhost; elsewhere this is skipped.
if(import.meta.env.PROD&&'serviceWorker' in navigator)addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});});
