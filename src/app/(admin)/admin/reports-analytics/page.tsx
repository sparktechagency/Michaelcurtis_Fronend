import React from 'react'
import Report from './Report'
import ProviderChart from './ProviderChart'
import ReportFrom from './ReportFrom'
import ReportList from './ReportList'

const page = () => {
  return (
    <div className=' pb-16' >
      <div className=' flex flex-row items-center gap-x-4 ' >
        <div className=' flex-1 ' >
          <Report></Report>
        </div>
        <div className=' flex-1 ' >
          <ProviderChart></ProviderChart>
        </div>
      </div>
      <div className=' flex items-start mt-10  gap-x-8  ' >
        <div className=' w-full ' >
          <ReportList></ReportList>
        </div>
        <div className=' w-full ' >
          <ReportFrom></ReportFrom>
        </div>
      </div>
    </div>
  )
}

export default page