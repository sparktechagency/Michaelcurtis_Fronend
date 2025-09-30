import React from 'react'

const TermBanner = () => {
  return (
    <div>
      <div className=' bg-[#FAF5EC] py-6 lg:py-12 ' >
        <h1 className=' text-center lg:text-5xl text-xl font-bold ' >Terms of  <span className=' text-[#D09A40] ' >Service</span></h1>
        <p className=' text-center lg:mt-5 mt-3 max-w-4xl mx-auto lg:text-xl text-sm font-thin  ' >
          Last updated: September 07, 2025. Please read these terms carefully before using the CoverageGrader platform.
        </p>
      </div>
    </div>
  )
}

export default TermBanner