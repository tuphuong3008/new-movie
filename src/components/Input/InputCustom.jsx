import React from 'react'

const InputCustom = ({ id,
    label,
    placeholder,
    className = "",
    name,
    onChange,
    value,
    onBlur,
    readOnly,
    error,
    type = "text",
    touched }) => {
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                name={name}
                type={type}
                id={id}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            ${className} ${error && touched ? "border-red-500" : ""}
            `} placeholder={placeholder}
            />
            {error && touched ? (
                <p className="text-red-500 text-sm">{error}</p>
            ) : null}
        </div>
    )
}

export default InputCustom