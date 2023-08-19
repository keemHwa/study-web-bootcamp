const express = require('express');
const app = express();
const sheltersRoutes = require('./router/shelters');
const dogRoutes = require('./router/dogs');
const adminRoutes = require('./router/admin');


app.use('/shelters', sheltersRoutes);
app.use('/dogs', dogRoutes);
app.use('/admin', adminRoutes);


app.listen(3000, () => {
    console.log("연결");
})