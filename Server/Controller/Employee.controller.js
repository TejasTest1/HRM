const employeeModel = require("../Model/HumanResourceModel");

const addEmployee = async (req, res) => {
    try {
        const { empName, empDepartment, empSkills, experience, review } = req.body;

        if (!empName || !empDepartment || !empSkills || !experience || !review) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required'
            })
        }

        const employee = await employeeModel.create({
            empName,
            empDepartment,
            empSkills,
            experience,
            review
        })

        return res.status(201).json({
            success: true,
            message: 'Employee Added Successfully',
            employeeData: employee
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'add employee catch block'
        })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { empName, empDepartment, empSkills, experience, review } = req.body;

        const { id } = req.params;

        if (!empName || !empDepartment || !empSkills || !experience || !review) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required'
            })
        }

        const updatedEmployee = await employeeModel.findByIdAndUpdate(id, {
            empName,
            empDepartment,
            empSkills,
            experience,
            review
        })

        if (!updatedEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee Not Found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Employee Updated Successfully',
            updatedEmployee
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'update employee catch block'
        })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEmployee = await employeeModel.findByIdAndDelete({ _id: id });

        if (!deletedEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Employee Deleted',
            deletedEmployee
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Delete employee catch block'
        })
    }
}

const getAllEmployeeData = async (req, res) => {
    try {
        const allEmployeeData = await employeeModel.find();

        return res.status(200).json({
            success: true,
            message: 'Found Employee Data',
            allEmployeeData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'All employee catch block'
        })
    }
}

const getPaginatedEmpData = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const employees = await employeeModel.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalEmployees = await employeeModel.countDocuments();

        return res.status(200).json({
            success: true,
            message: 'Pagination Applied',
            employees,
            totalPages: Math.ceil(totalEmployees / limit),
            currentPage: page
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error from paginationEmpOnTable',
            error: error.message
        })
    }
}

const getSingleEmployeeData = async (req, res) => {
    try {
        const { id } = req.params;

        const singleEmployeeData = await employeeModel.findById(id);

        if (!singleEmployeeData) {
            return res.status(404).json({
                success: false,
                message: 'employee not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Found Single Employee',
            singleEmployeeData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Single employee catch block'
        })
    }
}

module.exports = { addEmployee, updateEmployee, deleteEmployee, getSingleEmployeeData, getAllEmployeeData, getPaginatedEmpData }