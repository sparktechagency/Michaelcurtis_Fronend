import Image from 'next/image'
import React from 'react'

const PolicyDetailsBanner = () => {
    return (
        <div className=' bg-[#FAF5EC] lg:pt-13 pt-6 pb-7 lg:pb-16   ' >
            <div className=' max-w-4xl mx-auto ' >
                <div className='' >
                    <Image src={"/images/policy/car.svg"} width={297} height={109} alt='' className=' block mx-auto ' />
                    <h1 className=' font-bold lg:text-5xl text-2xl text-center lg:mt-8 mt-4 ' >Auto Insurance <span className=' text-[#D09A40] ' >Explained</span></h1>
                    <p className=' lg:text-xl  text-xs text-center lg:mt-6 mt-3 font-thin ' >Everything you need to know about auto insurance — from coverage basics and costs to what to look for in a provider.</p>
                </div>
            </div>
        </div>
    )
}

export default PolicyDetailsBanner