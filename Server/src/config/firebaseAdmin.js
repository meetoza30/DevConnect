import { readFileSync } from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';

const serviceAccount = JSON.parse(
  readFileSync('/etc/secrets/serviceAccountKey.json', 'utf8')
);

const app = initializeApp({ credential: cert(serviceAccount) }); 
export default app;