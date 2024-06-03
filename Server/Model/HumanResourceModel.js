const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const employeeSchema = new Schema({
    empName: {
        type: String,
        required: true
    }, 
    empDepartment: {
        type: String,
        required: true
    }, 
    empSkills: {
        type: String,
        required: true
    }, 
    experience: {
        type: Number,
        required: true
    }, 
    review: {
        type: Number,
        required: true
    }
});

const employeeModel = model('Employee', employeeSchema);

module.exports = employeeModel;