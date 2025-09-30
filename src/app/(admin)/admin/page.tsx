"use client"
import ReviewChart from '@/app/pages/admin/ReviewChart'
import WeekChart from '@/app/pages/admin/WeekChart'
import React from 'react'
// import Cookies from "js-cookie";


const Page: React.FC = () => {
  // Data for the chart
  // Define data type

  // useEffect(() => {
  //   const adminToken = Cookies.get("admin_token"); // ✅ check inside useEffect
  //   if (!adminToken) {
  //     window.location.href = "/admin/login";
  //   }
  // }, []);



  return (
    <div className='  ' >

      <div className=' flex flex-row items-center gap-x-12 ' >
        {/* user list  */}
        <div className=' bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[7px] py-3.5 pl-8 w-[224px] ' >
          <h1 className=' text-sm font-normal text-[#000000] ' >Total Users</h1>
          <h1 className=' mt-2 font-medium text-xl ' >12,847</h1>
          <span className=' mt-2 flex flex-row text-[#28A745] text-sm gap-x-0.5 font-normal  ' >
            +12% <p className=' text-[#000000] ' >
              from last month
            </p>
          </span>
        </div>
        {/* Active Providers  */}
        <div className=' bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[7px] py-3.5 pl-8 w-[224px] ' >
          <h1 className=' text-sm font-normal text-[#000000] ' >Active Providers</h1>
          <h1 className=' mt-2 font-medium text-xl ' >247</h1>
          <span className=' mt-2 flex flex-row text-[#28A745] text-sm gap-x-0.5 font-normal  ' >
            +12% <p className=' text-[#000000] ' >
              from last month
            </p>
          </span>
        </div>
        {/* Reviews Pending */}
        <div className=' bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[7px] py-3.5 pl-8 w-[224px] ' >
          <h1 className=' text-sm font-normal text-[#000000] ' >Reviews Pending</h1>
          <h1 className=' mt-2 font-medium text-xl ' >89</h1>
          <span className=' mt-2  text-[#000000] text-sm  font-normal  ' >
            Urgent requires moderation
          </span>
        </div>
        {/* Active Users */}
        <div className=' bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[7px] py-3.5 pl-8 w-[224px] ' >
          <h1 className=' text-sm font-normal text-[#000000] ' >Active Users</h1>
          <h1 className=' mt-2 font-medium text-xl ' >12,847</h1>
          <span className=' mt-2 flex flex-row text-[#28A745] text-sm gap-x-0.5 font-normal  ' >
            +12% <p className=' text-[#000000] ' >
              from last month
            </p>
          </span>
        </div>
      </div>


      {/* bar chat  */}

      <div className=' flex justify-between items-center mt-8  gap-x-8  ' >
        <div className=' flex-1 ' >
          <WeekChart></WeekChart>
        </div>
        <div className=' flex-1 ' >
          <ReviewChart />
        </div>
      </div>




      {/* redent activeity  */}




      <div className=' mt-11 ' >
        <div className=' shadow shadow-[#00000033] bg-[#FAF5EC] rounded-[12px] py-7 px-6 ' >
          <h1 className=' text-xl text-[#000000] ' >Recent Activity </h1>
          <div className=' flex justify-between items-center mt-9          ' >
            <h1 className=' 
            text-lg ' >John D. submitted a review for State Farm</h1>
            <p className=' font-thin ' >1h ago</p>
          </div>
        </div>
      </div>






























    </div>
  )
}

export default Page