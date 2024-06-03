import React, { useState } from 'react'
import Input from '../Components/Input';
import { addEmpData, empDepartment } from '../Utils/Utils';
import axios from 'axios';

import '../Styles/AddEmployee.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

    const navigate = useNavigate();
    const [empData, setEmpData] = useState({
        empName: "",
        empDepartment: "",
        empSkills: "",
        experience: "",
        review: ""
    })

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setEmpData({
            ...empData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('https://hrm-kclk.onrender.com/api/v1/employee/addEmployee', empData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            if (response.status === 201) {
                toast.success('Employee added', {
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
                                    value={empData[index]}
                                />
                            </div>

                        )
                    })
                }

                <div className="inputs">
                    <label htmlFor="department">Department</label>
                    <select name='empDepartment' onChange={handleInputs}>
                        <option value=''>Select Option</option>
                        {
                            empDepartment.map((currElem, index) => {
                                const { label, department } = currElem;
                                return (
                                    <option value={department} key={index}>{label}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button type="submit">Add Emp</button>
            </form >
        </div >
    )
}

export default AddEmployee
