import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie } from 'recharts';

const Areachart = () => {
    const [employeeData, setEmployeeData] = useState([]);

    const handleGetEmpData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/employee/allEmployeeDatas');

            if (response.status === 200) {
                setEmployeeData(response.data?.allEmployeeData);
                console.log(response.data);
            }
        } catch (error) {
            console.log('Unable to get employee data:', error);
        }
    };

    useEffect(() => {
        handleGetEmpData();
    }, []);

    return (
        <div>
            <ResponsiveContainer width={'100%'} height={400}>
                <AreaChart data={employeeData}>
                    <XAxis dataKey="experience" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="experience" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="review" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>

                <BarChart width={600} height={300} data={employeeData}>
                    <XAxis dataKey="empDepartment" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="empDepartment" barSize={30} fill="#8884d8" />
                    <Bar dataKey="empName" barSize={30} fill="#8855d8" />
                    <Bar dataKey="review" barSize={30} fill="#f754d8" />
                </BarChart>

                <PieChart width={400} height={400}>
                    <Pie
                        data={employeeData}
                        dataKey="review"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#8884d8"
                        label
                    />
                    <Pie
                        data={employeeData}
                        dataKey="experience"
                        cx="50%"
                        cy="50%"
                        innerRadius={110}
                        outerRadius={150}
                        fill="#f1d235"
                        label
                    />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Areachart;
