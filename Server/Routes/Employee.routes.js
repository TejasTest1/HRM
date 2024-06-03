const express = require('express');
const { addEmployee, updateEmployee, deleteEmployee, getSingleEmployeeData, getAllEmployeeData, getPaginatedEmpData } = require('../Controller/Employee.controller');

const router = express.Router();

router.post('/addEmployee', addEmployee)
router.put('/updateEmployee/:id', updateEmployee)
router.delete('/deleteEmployee/:id', deleteEmployee)
router.get('/employeeData/:id', getSingleEmployeeData)
router.get('/allEmployeeDatas', getAllEmployeeData)
router.get('/allEmployeeData', getPaginatedEmpData)

module.exports = router;