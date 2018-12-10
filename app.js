const express = require('express');
const app = express();
const path = require('path');
const starRouter = require('./routes/star');

app.use(express.static(path.join(__dirname,'public')));
app.use('/star', starRouter);

app.all('*', (req, res) => {res.json({message: "Invalid Request Endpoint"})});

app.listen(3000, () => {
    console.log('Server is listening at port 3000...');
});