import React, { useEffect, useState } from 'react'
import { empDepartment, empTableHead, reviews } from '../Utils/Utils'
import axios from 'axios';
import '../Styles/ExployeesData.css'
import { useNavigate } from 'react-router-dom';

const EmployeesData = () => {
    const [employeeData, setEmployeeData] = useState([]);

    const [searchFilter, setSearchFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)

    const navigate = useNavigate();

    const handleGetEmpData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/employee/allEmployeeData?page=${currentPage}&limit=5`);

            if (response.status === 200) {
                setEmployeeData(response.data?.employees);
                setTotalPage(response.data?.totalPages)
            }
            console.log('All Emp Data : ', response.data);
        } catch (error) {
            console.log('Unable to get employee data : ', error);
        }
    }

    const handleReviewStar = (count) => {
        const star = [];

        for (let i = 0; i < count; i++) {
            star.push('⭐')
        }

        return star.join(' ')
    }

    const handleDeleteEmployee = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/employee/deleteEmployee/${id}`)

            if (response.status === 200) {
                alert('Deleted');
                handleGetEmpData();
            }
        } catch (error) {
            console.log('Unable to delete employee : ', error);
        }
    }

    const handleDepartmentFilter = async (e) => {
        const departmentFilter = e.target.value

        try {
            const response = await axios.post('http://localhost:3000/api/v1/filters/departments', { departmentFilter }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            if (response.status === 200) {
                setEmployeeData(response.data.filteredDepartment);
            }

            if (departmentFilter === 'All') {
                await handleGetEmpData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleReviewFilter = async (e) => {
        const reviewFilter = e.target.value

        console.log(reviewFilter);
        try {
            const response = await axios.post('http://localhost:3000/api/v1/filters/review', { reviewFilter }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            if (response.status === 200) {
                setEmployeeData(response.data.filteredDepartment);
            }

            if (reviewFilter == 0) {
                await handleGetEmpData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputs = (e) => {
        setSearchFilter(e.target.value)
    }

    const handleSearchFilter = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3000/api/v1/filters/search?query=${searchFilter}`);

            if (response.status === 200) {
                setEmployeeData(response.data?.searchedResult)
            }
        } catch (error) {
            console.log('Unable to search :', error);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handlePageClick = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        handleGetEmpData();
    }, [currentPage])

    return (
        <div>
            <div className="title">
                <h2>Employee Data</h2>
            </div>

            <div className="filters">

                <div className="selectFilter">
                    <select name='departmentFilter' onChange={handleDepartmentFilter}>
                        <option value=''>Select Option</option>
                        {
                            empDepartment.map((currElem, index) => {
                                const { label, department } = currElem;
                                return (
                                    <option value={department} key={index}>{label}</option>
                                )
                            })
                        }

                        <option value="All">All</option>

                    </select>
                </div>

                <div className="searchFilter">
                    <input type="search" name="searchFilter" value={searchFilter} onChange={handleInputs} id="" placeholder='search by department' />
                    <button type="submit" onClick={handleSearchFilter}>🔍</button>
                </div>

                <div className="selectFilter">
                    <select name='reviewFilter' onChange={handleReviewFilter}>
                        <option value=''>Select Option</option>
                        {
                            reviews.map((currElem, index) => {
                                const { label, value } = currElem;
                                return (
                                    <option value={value} key={index}>{label}</option>
                                )
                            })
                        }
                        <option value={0}>All</option>
                    </select>
                </div>

            </div>
            <table className='empTable' border={1}>
                <thead>
                    <tr>
                        {
                            empTableHead.map((currElem, index) => {
                                const { th } = currElem;
                                return (
                                    <th key={index}>{th}</th>
                                )
                            })
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        employeeData.map((currElem, index) => {
                            const { empName, empDepartment, empSkills, experience, review, _id } = currElem;
                            return (
                                <tr>
                                    <td>{empName}</td>
                                    <td>{empDepartment}</td>
                                    <td>{empSkills}</td>
                                    <td>{experience}</td>
                                    <td>{handleReviewStar(review)}</td>
                                    <td className='tableControls' onClick={() => navigate(`/updateEmp/${_id}`)}>📝</td>
                                    <td className='tableControls' onClick={() => handleDeleteEmployee(_id)}>🗑️</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="paginationButtons">
                <div className="prev">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                </div>
                <div className="currPage">
                    {
                        Array.from({ length: totalPage }, (_, index) => {
                            return <button onClick={() => handlePageClick(index + 1)} className={currentPage === index + 1? 'active': ""}>{index + 1}</button>
                        })
                    }
                </div>
                <div className="next">
                    <button onClick={handleNextPage} disabled={currentPage === totalPage}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default EmployeesData
