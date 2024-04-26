import React from 'react'

const Input = React.forwardRef(
  ({ type, placeholder, styles, label, register, name, error }, ref) => {
    return (
      <div className='flex flex-col mt-2'>
        <p className='text-gray-600 text-sm mb-1 '>{label}</p>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          className={`border border-gray-400 rounded focus:outline-none focus:border-persian_orange focus:ring-1 focus:ring-burnt_seinna text-base px-4 py-2 ${styles}`}
          {...register}
          aria-invalid={error ? "true" : "false"}
        />
        {error && <span className='text-xs text-red-600 mt-0.5 '>{error}</span>}
      </div>
    );
  }
);

export default Input