import React from "react"

function Navbar() {
  return (
    <div className='w-full bg-slate-800 h-24 flex flex-row items-center justify-between px-6 shadow-lg border-b-2 border-blue-500'>
      <div className='flex items-center space-x-3'>
        <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center'>
          <div className='w-4 h-4 bg-white rounded-full'></div>
        </div>
        <h1 className='text-white text-2xl font-bold'>
          Point Arena
        </h1>
      </div>
      
      <button className='bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200'>
        <span className='flex items-center space-x-2'>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </svg>
          <span>Add Player</span>
        </span>
      </button>
    </div>
  )
}

export default Navbar