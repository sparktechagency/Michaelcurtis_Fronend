"use client"
import { useAdminActivityQuery, useRecentActivityQuery } from '@/app/api/admin/adminApi'
import ReviewChart from '@/app/pages/admin/ReviewChart'
import WeekChart from '@/app/pages/admin/WeekChart'
import { RecentHistoryType } from '@/utility/types/admin/admin/adminType'
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

  const { data } = useAdminActivityQuery({});


  const { data: recentData } = useRecentActivityQuery([]);


  console.log(recentData?.data);

  const recentHistory: RecentHistoryType[] = recentData?.data || []








  return (
    <div className='  ' >

      <div className=' flex flex-row items-center gap-x-12 ' >
        {/* user list  */}
        <div className=' bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[7px] py-3.5 pl-8 w-[23%] ' >
          <h1 className=' text-sm font-normal text-[#000000] ' >Total Users</h1>
          <h1 className=' mt-2 font-medium text-xl ' >{data?.stats?.total_users?.total}</h1>
          <span className=' mt-2 flex flex-row text-[#28A745] text-sm gap-x-0.5 font-normal  ' >
            +{data?.stats?.total_users?.percentage_change}%  <p className=' text-[#000000] ' >
              from last month
            </p>
          </span>
        </div>
        {/* Active Providers  */}
        <div className=' bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[7px] py-3.5 pl-8 w-[23%] ' >
          <h1 className=' text-sm font-normal text-[#000000] ' >Active Providers</h1>
          <h1 className=' mt-2 font-medium text-xl ' >{data?.stats?.active_providers?.total}</h1>
          <span className=' mt-2 flex flex-row text-[#28A745] text-sm gap-x-0.5 font-normal  ' >
            +{data?.stats?.active_providers?.percentage_change}% <p className=' text-[#000000] ' >
              from last month
            </p>
          </span>
        </div>
        {/* Reviews Pending */}
        <div className=' bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[7px] py-3.5 pl-8 w-[23%] ' >
          <h1 className=' text-sm font-normal text-[#000000] ' >Reviews Pending</h1>
          <h1 className=' mt-2 font-medium text-xl ' >{data?.stats?.reviews_pending}</h1>
          <span className=' mt-2  text-[#000000] text-sm  font-normal  ' >
            Urgent requires moderation
          </span>
        </div>
        {/* Active Users */}
        <div className=' bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[7px] py-3.5 pl-8 w-[23%] ' >
          <h1 className=' text-sm font-normal text-[#000000] ' >Active Users</h1>
          <h1 className=' mt-2 font-medium text-xl ' >{data?.stats?.active_users?.total}</h1>
          <span className=' mt-2 flex flex-row text-[#28A745] text-sm gap-x-0.5 font-normal  ' >
            +{data?.stats?.active_users?.percentage_change}% <p className=' text-[#000000] ' >
              from last month
            </p>
          </span>
        </div>
      </div>


      {/* bar chat  */}

      <div className=' flex justify-between items-center mt-8  gap-x-10  ' >
        <div className=' flex-1 w-[50%]  ' >
          <WeekChart></WeekChart>
        </div>
        <div className=' flex-1 w-[50%] ' >
          <ReviewChart />
        </div>
      </div>




      {/* redent activeity  */}




      <div className=' mt-11 ' >
        <div className=' shadow shadow-[#00000033] bg-[#FAF5EC] rounded-[12px] py-7 px-6 ' >
          <h1 className=' text-xl text-[#000000] ' >Recent Activity </h1>
          <div className='  mt-9  space-y-4         ' >
            {
              recentHistory.map((item, i) => {
                return (
                  <div key={i} >
                    <div className=' flex items-center justify-between border-b border-black pb-3  ' >
                      <h1 className=' 
            text-lg ' >John D. submitted a review for State Farm</h1>
                      <p className=' font-thin ' >1h ago</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>






























    </div>
  )
}

export default Page