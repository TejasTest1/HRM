const dotenv = require('dotenv').config({path: './Config/Config.env'});
const express = require('express');

const app = express();
const cors = require('cors');
const database = require('./Database/Database');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// Routes Importing
const employeeRoute = require('./Routes/Employee.routes');
const employeeFilters = require('./Routes/EmployeeFilter.routes');


// Routes Declaration
app.use('/api/v1/employee', employeeRoute);
app.use('/api/v1/filters', employeeFilters);


database().then(
    app.listen(process.env.PORT, () => {
        console.log('जय श्री राम');
    })
)