import React from 'react'

const AccessibilityBanner = () => {
    return (
        <div>
            <div className=' bg-[#FAF5EC] py-6 lg:py-12 ' >
                <h1 className=' text-center lg:text-5xl text-xl font-bold ' >Accessibility <span className=' text-[#D09A40] ' >Statement</span></h1>
                <p className=' text-center lg:mt-5 mt-3 max-w-4xl mx-auto lg:text-xl text-sm font-thin  ' >
                    CoverageGrader is committed to making our platform accessible to all users, including people with disabilities.
                </p>
            </div>
        </div>
    )
}

export default AccessibilityBanner