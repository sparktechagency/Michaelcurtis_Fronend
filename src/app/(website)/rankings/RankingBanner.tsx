import MaxWidth from '@/app/components/max-width/MaxWidth'
import React from 'react'

const RankingBanner = () => {
  return (
    <div className=' bg-[#FAF5EC] py-7 lg:py-14 ' >
      <MaxWidth>
        <div className=' text-center ' >
          <h1 className=' lg:text-6xl text-3xl font-bold text textColor ' >Find the Best Insurance Providers,</h1>
          <h1 className=' lg:text-6xl text-3xl font-bold text textColorYello  ' >Ranked by the Community</h1>
          <p className=' lg:mt-6 mt-3 lg:text-xl text-[16px] font-thin text-black ' >Compare providers by policy type, score, and state — all powered by real reviews from people like you.</p>
        </div>
      </MaxWidth>
    </div>
  )
}

export default RankingBanner