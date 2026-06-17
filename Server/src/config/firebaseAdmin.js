import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

const app = initializeApp({
  credential: cert(serviceAccount),
});

export default app;