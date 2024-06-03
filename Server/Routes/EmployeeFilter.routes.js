const express = require('express');
const { handleDepartmentFilter, handleReviewFilter, handleSearchFilter } = require('../Controller/EmployeeFilter.controller');

const router = express.Router();

router.post('/departments', handleDepartmentFilter)
router.post('/review', handleReviewFilter)
router.get('/search', handleSearchFilter)

module.exports = router;