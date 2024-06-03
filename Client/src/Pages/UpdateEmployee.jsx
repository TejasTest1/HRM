import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { addEmpData } from '../Utils/Utils'
import Input from '../Components/Input'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEmployee = () => {

    const [empData, setEmpData] = useState({
        empName: "",
        empDepartment: "",
        empSkills: "",
        experience: "",
        review: ""
    })

    const { id } = useParams();
    const navigate = useNavigate();

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setEmpData({
            ...empData,
            [name]: value
        })
    }

    const getSingleEmployee = async () => {
        try {
            const response = await axios.get(`https://hrm-kclk.onrender.com/api/v1/employee/employeeData/${id}`);

            const data = response.data?.singleEmployeeData;

            setEmpData({
                empName: data.empName,
                empDepartment: data.empDepartment,
                empSkills: data.empSkills,
                experience: data.experience,
                review: data.review
            })
        } catch (error) {

        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`https://hrm-kclk.onrender.com/api/v1/employee/updateEmployee/${id}`, empData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            if (response.status === 200) {
                toast.success('Employee Updated', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                })
                navigate('/empData')
                console.log('Emp Data : ', response.data);
            }
        } catch (error) {
            console.log('Add Employee Catch Error : ', error);
        }
    }

    useEffect(() => {
        getSingleEmployee();
    }, [])

    return (
        <div className='formContainer'>
            <div className="title">
                <h2>Add Empoyee</h2>
            </div>
            <form className='addEmpForm' onSubmit={handleSubmit}>
                {
                    addEmpData.map((currElem, index) => {
                        const { name, label, type } = currElem;
                        return (
                            <div className='inputs' key={index}>
                                <Input
                                    key={index}
                                    name={name}
                                    id={label}
                                    type={type}
                                    onChange={handleInputs}
                                    value={empData[name]}
                                />
                            </div>

                        )
                    })
                }
                <button type="submit">Update Emp</button>
            </form >
        </div >
    )
}

export default UpdateEmployee
