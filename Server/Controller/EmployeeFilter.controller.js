const fuzzysort = require("fuzzysort");
const employeeModel = require("../Model/HumanResourceModel");

const handleDepartmentFilter = async (req, res) => {
    try {
        const { departmentFilter } = req.body;

        let department = {};

        if (departmentFilter) department = departmentFilter;

        const filteredDepartment = await employeeModel.find({ empDepartment: department });
        return res.status(200).json({
            success: true,
            filteredDepartment
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error from handleDepartmentFilter',
            error: error.message
        })
    }
};

const handleReviewFilter = async (req, res) => {
    try {
        const { reviewFilter } = req.body;

        let review = {};

        if (reviewFilter) review = reviewFilter;

        const filteredDepartment = await employeeModel.find({ review });

        return res.status(200).json({
            success: true,
            filteredDepartment
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error from handleDepartmentFilter',
            error: error.message
        })
    }
};

const handleSearchFilter = async (req, res) => {
    // const { query } = req.query;
    // try {
    //     const searchedResult = await employeeModel.find({ empDepartment: { $regex: new RegExp(query, 'i') } })
    //     res.status(200).json({
    //         success: true,
    //         searchedResult
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: 'Error searching for employees',
    //         error: error.message
    //     });
    // }

    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ success: false, message: 'Query parameter is missing' });
        }

        const allEmployees = await employeeModel.find();

        const searchResults = fuzzysort.go(query, allEmployees, {
            keys: ['empName', 'empDepartment', 'empSkills'],
            threshold: -10000
        });

        console.log(searchResults);
        const searchedResult = searchResults.map(result => result.obj);

        return res.status(200).json({
            success: true,
            searchedResult
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error from handleSearchFilter',
            error: error.message
        });
    }

}


module.exports = { handleDepartmentFilter, handleReviewFilter, handleSearchFilter };