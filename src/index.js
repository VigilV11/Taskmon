const express = require('express');
const path = require('path');

require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

const publicPath = path.join(process.cwd(), 'public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.status(200).send('Welcome!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Development server listening on port 3000...');
});
