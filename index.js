import dotenv from 'dotenv';

dotenv.config();
import {app} from './server.js'

const port = process.env.PORT || 3318
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
  });