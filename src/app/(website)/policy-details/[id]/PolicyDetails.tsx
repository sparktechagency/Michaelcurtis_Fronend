import React from 'react'

const PolicyDetails = () => {
    return (
        <div className=' max-w-5xl mx-auto pt-7 lg:pt-14 pb-5 lg:pb-10  ' >
            <div className=' bg-white px-9 lg:px-[72px] pt-7 lg:pt-14 pb-8 lg:pb-16  shadow shadow-[#00000040] ' >
                <div>
                    <h1 className=' lg:text-[40px] text-xl font-normal text-black ' >What is Auto Insurance? </h1>
                    <p className=' lg:text-xl text-sm font-thin  ' >
                        Auto insurance is a contract between you and an insurance company that protects you against financial loss in the event of an accident or theft. In exchange for your paying a premium, the insurance company agrees to pay your losses as outlined in your policy. It&apos; designed to cover costs related to property damage, medical bills for injuries, and legal liabilities.
                    </p>
                    <h1 className='lg:text-[40px] text-xl font-normal text-black ' >What&apos; Covered (and What&apos; Not)?</h1>
                    <h1 className='lg:text-xl text-sm font-thin  ' >Standard auto policies are typically bundled with several types of coverage:</h1>
                    <ul className='lg:text-xl text-sm font-thin space-y-1.5 list-disc ml-6 ' >
                        <li>Liability Coverage: Pays for bodily injury and property damage you cause to others. This is required in most states.</li>
                        <li>Collision Coverage: Pays for damage to your car resulting from a collision with another vehicle or object.</li>
                        <li>Comprehensive Coverage: Covers damage to your car from non-collision events like theft, fire, or weather.</li>
                    </ul>
                    <p className=' lg:text-xl text-sm font-thin  ' >What&apos; not covered usually includes routine maintenance, wear and tear, and intentional damage. Personal belongings stolen from your car are typically covered by renters or home insurance, not auto insurance.</p>
                    <h1 className='lg:text-[40px] text-xl font-normal text-black ' >Average Costs & Price Factors</h1>
                    <p className='lg:text-xl text-sm font-thin' >
                        The cost of auto insurance varies widely based on factors like your age, driving record, the type of car you drive, your location, and the amount of coverage you choose. A clean driving record and a modest vehicle will result in lower premiums, while multiple accidents or a high-performance sports car will increase costs significantly.
                    </p>
                </div>


            </div>
        </div>
    )
}

export default PolicyDetails