import React from 'react'

export default function Input ({ label, name, id, placeholder, validate = {}, register = {}, required = true, type, className }) {
  const t = type ? type : 'text' 
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          {...register(name, { required,...validate  })} 
          type={t}
          name={name}
          id={id}
          className="block w-full border-[#EDEDED] border p-4 rounded-xl  placeholder:text-[#B2B2B2] outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}