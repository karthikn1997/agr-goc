import React from 'react'
import Sidebar from './Sidebar'
import ProgressStepper from './ProgressStepper'

function Dashboard() {
  return (
    <>
    <div className="w-full bg-white flex justify-between items-center">
        {/* <Sidebar/> */}
        <ProgressStepper/>
      </div>
    </>
  )
}

export default Dashboard