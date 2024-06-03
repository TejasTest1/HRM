import React from 'react'

const Input = ({ name, id, onChange, value, type }) => {
    return (
        <>
            <label htmlFor={id}>{id}</label>
            <input type={type} name={name} id={id} className='' value={value} onChange={onChange} />
        </>
    )
}

export default Input
