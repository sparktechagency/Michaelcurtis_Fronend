import React from 'react'

const Methodology = () => {
    return (
        <div className=' lg:pb-16 pb-8 ' >
            <div className=' bg-[#FAF5EC] py-6 lg:py-12 ' >
                <h1 className=' text-center lg:text-5xl text-xl font-bold ' >How We Calculate <span className=' text-[#D09A40] ' >Provider Scores</span></h1>

                <p className=' text-center lg:mt-5 mt-3 max-w-4xl mx-auto lg:text-xl text-sm font-thin  ' >
                    Our commitment to transparency starts here. Learn about our scoring methodology and review moderation process to understand how we put the community&lsquo;s voice first.                    </p>
            </div>

            <div className=' lg:mt-14 mt-7 mb-5 lg:mb-10  max-w-4xl mx-auto shadow shadow-[#00000040] rounded-[7px] px-6 py-5 bg-white lg:py-10 lg:px-12 ' >
                <p className=' lg:text-xl text-xs font-thin text-black ' >
                    How Our Grading Works Most review sites only show you a star rating. We believe you deserve more transparency. Step 1: Real Reviews • Every rating starts with real customer experiences. • Users give an overall star rating (1–5). • They can also rate specific categories: Claims, Service, Pricing, Coverage, and Digital Tools. Step 2: Category Averages We calculate averages for each of the five key categories. This shows strengths and weaknesses that stars alone can’t explain. Example: • Claims → 4.3 stars • Service → 4.6 stars • Pricing → 3.9 stars • Coverage → 4.1 stars • Digital Tools → 4.0 stars Step 3: The Grade We convert the overall average into a letter grade (A–F) so you can instantly see how a provider measures up. • A = Excellent (4.5 – 5.0) • B = Good (3.5 – 4.4) • C = Average (2.5 – 3.4) • D = Poor (1.5 – 2.4) • F = Failing (1.0 – 1.4) So a provider with 4.2 stars might earn a B+ Grade. Step 4: Transparent Display On every provider page you’ll see: B+ 4.2 stars (1,284 reviews) …and a full category breakdown underneath. Why We’re Different • Not just stars → You see the Grade + Stars + Review Count together. • Category transparency → You know exactly where a provider excels or falls short. • Fair comparisons → All providers are graded on the same five factors. This means you’re not just picking a provider with “the most stars.” You’re choosing based on real, balanced insight.                </p>

            </div>

        </div>
    )
}

export default Methodology