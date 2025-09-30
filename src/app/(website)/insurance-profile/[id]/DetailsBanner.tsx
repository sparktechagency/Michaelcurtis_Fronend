"use client"
import MaxWidth from '@/app/components/max-width/MaxWidth'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const DetailsBanner = () => {
    const ratings = [
        { label: "Claims", value: 4.7, color: "bg-green-500" },
        { label: "Service", value: 4.7, color: "bg-green-500" },
        { label: "Pricing", value: 4.8, color: "bg-yellow-500" },
        { label: "Coverage", value: 4.8, color: "bg-green-500" },
        { label: "Trusts Tools", value: 4.8, color: "bg-green-500" },
    ];
    const router = useRouter();
    const handleReview = () => {
        router.push("/specify-insurance-review")

    }
    return (
        <div className='  border-b mb-4 border-[#697079]  ' >
            <div className=' bg-[#faf5ec] py-5 lg:py-14   ' >
                <MaxWidth>
                    <div className=' flex justify-between items-center ' >
                        {/* logo  */}
                        <div className=' flex items-center gap-x-8 ' >
                            <div>
                                <Image src={"/images/insurance/insurance-logo.svg"} width={96} height={101} alt='' className='' />
                            </div>
                            <div>
                                <h1 className=' lg:text-4xl text-lg font-normal text-black ' >Health Shield</h1>
                                <div className=' flex flex-row items-center gap-x-4 ' >
                                    <div>
                                        <h1 className=' text-[#4AF850] lg:text-4xl text-lg font-bold  ' >A+</h1>
                                    </div>
                                    <div>
                                        <div className=' w-2 h-2 bg-black rounded-full ' >

                                        </div>
                                    </div>
                                    <div>
                                        <span>
                                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.5002 19.7531L6.79396 23.1906C6.54187 23.351 6.27833 23.4198 6.00333 23.3969C5.72833 23.374 5.48771 23.2823 5.28146 23.1219C5.07521 22.9615 4.91479 22.7612 4.80021 22.521C4.68562 22.2808 4.66271 22.0113 4.73146 21.7125L6.24396 15.2156L1.19083 10.85C0.961667 10.6437 0.818666 10.4086 0.761833 10.1446C0.705 9.88062 0.721958 9.62304 0.812708 9.37187C0.903458 9.1207 1.04096 8.91445 1.22521 8.75312C1.40946 8.59179 1.66154 8.48866 1.98146 8.44374L8.65021 7.85937L11.2283 1.74062C11.3429 1.46562 11.5208 1.25937 11.7618 1.12187C12.0029 0.984369 12.249 0.915619 12.5002 0.915619C12.7514 0.915619 12.9975 0.984369 13.2386 1.12187C13.4797 1.25937 13.6575 1.46562 13.7721 1.74062L16.3502 7.85937L23.019 8.44374C23.3398 8.48958 23.5919 8.5927 23.7752 8.75312C23.9585 8.91354 24.096 9.11979 24.1877 9.37187C24.2794 9.62395 24.2968 9.88199 24.24 10.146C24.1831 10.41 24.0397 10.6447 23.8096 10.85L18.7565 15.2156L20.269 21.7125C20.3377 22.0104 20.3148 22.2799 20.2002 22.521C20.0856 22.7621 19.9252 22.9624 19.719 23.1219C19.5127 23.2814 19.2721 23.373 18.9971 23.3969C18.7221 23.4207 18.4585 23.352 18.2065 23.1906L12.5002 19.7531Z" fill="#F6CF2F" />
                                            </svg>

                                        </span>
                                    </div>
                                    <div>
                                        <p className=' lg:text-xl text-xs font-normal ' >4.9</p>
                                    </div>

                                    <div>
                                        <div className=' w-2 h-2 bg-black rounded-full ' >

                                        </div>
                                    </div>
                                    <div>
                                        <h1 className=' font-thin lg:text-lg  text-xs text-black  ' >1,456 reviews</h1>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* review button  */}
                        <div>
                            <Link href={"/specify-insurance-review"}>
                                <button className=' cursor-pointer lg:text-xl text-xs font-normal text-white border border-[#D09A40] bg-[#D09A40] py-2 px-5 rounded-[26px]  ' >Write a Review</button>
                            </Link>
                        </div>
                    </div>






                </MaxWidth>
            </div>

            {/* rating  */}


            <MaxWidth>
                {/* left side  */}
                <div className=' flex flex-col lg:flex-row   justify-between gap-x-6 mt-6   ' >
                    <div className=" w-full lg:w-[65%]   mb-10  pl-5 pr-8  pb-10 pt-5 shadow shadow-[#00000033] rounded-[10px]    ">
                        <h2 className="text-xl font-semibold mb-4">Overall Ratings</h2>

                        <div className="space-y-4">
                            {ratings.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    {/* Label */}
                                    <span className="w-28 text-[#000000] lg:text-xl font-thin text-sm ">{item.label}</span>

                                    {/* Progress Bar */}
                                    <div className="flex-1 mx-4 my-4 lg:my-[34px] ">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${item.color}`}
                                                style={{ width: `${(item.value / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Value */}
                                    <span className=" lg:text-xl text-sm font-normal text-black ">
                                        (A) <span className="font-medium">{item.value.toFixed(1)}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* right side  */}
                    <div className=' lg:w-[35%] w-full    ' >

                        <div className='shadow shadow-[#00000033] bg-white lg:max-[20%] pt-3.5 px-8 rounded-[10px] pb-6 ' >
                            <h1 className=' mb-4 lg:text-4xl text-lg font-normal text-black ' >Quick Stats</h1>
                            <div className=' flex  items-center gap-x-5  ' >
                                <span>
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5 15V17C14.5 17.2652 14.3946 17.5196 14.2071 17.7071C14.0196 17.8946 13.7652 18 13.5 18H6.5L3.5 21V11C3.5 10.7348 3.60536 10.4804 3.79289 10.2929C3.98043 10.1054 4.23478 10 4.5 10H6.5M21.5 14L18.5 11H11.5C11.2348 11 10.9804 10.8946 10.7929 10.7071C10.6054 10.5196 10.5 10.2652 10.5 10V4C10.5 3.73478 10.6054 3.48043 10.7929 3.29289C10.9804 3.10536 11.2348 3 11.5 3H20.5C20.7652 3 21.0196 3.10536 21.2071 3.29289C21.3946 3.48043 21.5 3.73478 21.5 4V14Z" stroke="#D09A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </span>
                                <p className=' lg:text-lg font-normal text-black ' >
                                    Policies: <span className=' lg:text-left font-thin ' >Auto, Home, Renters</span>
                                </p>
                            </div>


                            <div className=' flex  items-center gap-x-5 mt-5 ' >
                                <span>
                                    <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.1769 23.1575C10.9797 23.2991 10.743 23.3753 10.5002 23.3753C10.2574 23.3753 10.0208 23.2991 9.82356 23.1575C3.98851 18.9984 -2.20419 10.4434 4.05618 4.26158C5.77484 2.57094 8.0894 1.62394 10.5002 1.625C12.9169 1.625 15.2357 2.57354 16.9443 4.26038C23.2046 10.4422 17.0119 18.996 11.1769 23.1575Z" stroke="#D09A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.5002 12.5C11.1411 12.5 11.7558 12.2454 12.209 11.7922C12.6622 11.339 12.9168 10.7243 12.9168 10.0833C12.9168 9.4424 12.6622 8.82771 12.209 8.3745C11.7558 7.92128 11.1411 7.66667 10.5002 7.66667C9.85922 7.66667 9.24453 7.92128 8.79132 8.3745C8.33811 8.82771 8.0835 9.4424 8.0835 10.0833C8.0835 10.7243 8.33811 11.339 8.79132 11.7922C9.24453 12.2454 9.85922 12.5 10.5002 12.5Z" stroke="#D09A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>


                                </span>
                                <p className=' lg:text-lg font-normal text-black ml-1 ' >
                                    Available in: <span className=' lg:text-left font-thin ' > 49 States</span>
                                </p>
                            </div>





                            <div className=' flex  items-center gap-x-5 mt-5 ' >
                                <span>
                                    <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 3H7.5M7.5 3H5C4.07174 3 3.1815 3.36875 2.52513 4.02513C1.86875 4.6815 1.5 5.57174 1.5 6.5C1.5 7.42826 1.86875 8.3185 2.52513 8.97487C3.1815 9.63125 4.07174 10 5 10H7.5M7.5 3V1M7.5 3V10M7.5 10H10C10.4596 10 10.9148 10.0905 11.3394 10.2664C11.764 10.4423 12.1499 10.7001 12.4749 11.0251C12.7999 11.3501 13.0577 11.736 13.2336 12.1606C13.4095 12.5852 13.5 13.0404 13.5 13.5C13.5 13.9596 13.4095 14.4148 13.2336 14.8394C13.0577 15.264 12.7999 15.6499 12.4749 15.9749C12.1499 16.2999 11.764 16.5577 11.3394 16.7336C10.9148 16.9095 10.4596 17 10 17H7.5M7.5 10V17M7.5 17H1.5M7.5 17V19" stroke="#D09A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>



                                </span>
                                <p className=' lg:text-lg font-normal text-black ml-2.5 ' >
                                    Average Price:<span className=' lg:text-left font-thin  ' >  $450</span>
                                </p>
                            </div>




                        </div>




                        <div className='shadow shadow-[#00000033] bg-white lg:max-[20%] pt-3.5 px-8 rounded-[10px] pb-6 mt-5  ' >

                            <button className=' px-2 py-1 bg-[#F0E0C4] rounded-[3px] text-[#946D2D] text-sm font-normal ' >Sponsored</button>

                            <div className=' flex justify-center ' >
                                <span><svg width="70" height="72" viewBox="0 0 70 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1.02804" y="0.507042" width="67.9437" height="70.9859" rx="5.57747" fill="#FAF5EC" />
                                    <rect x="1.02804" y="0.507042" width="67.9437" height="70.9859" rx="5.57747" stroke="#E9D1A7" strokeWidth="1.01408" />
                                    <path d="M52.9305 39.0947C52.9305 40.953 52.6433 42.7413 52.1171 44.4235H33.4229L49.3972 28.4491C51.6176 31.4176 52.9305 35.1029 52.9305 39.0947Z" fill="#F79F1E" />
                                    <path d="M23 43.7139C23.0053 43.2985 22.8749 43.1062 22.4802 42.8756C22.112 42.6605 21.7429 42.1121 21.7229 41.6939C21.64 39.9536 21.6678 38.2066 21.6981 36.4629C21.7133 35.5916 22.1967 35.1588 23.0921 35.1472C24.38 35.1306 25.6687 35.123 26.9559 35.1575C27.2902 35.1664 27.62 35.3461 27.9519 35.4474C27.9506 35.5312 27.9492 35.6149 27.9479 35.6986C26.4712 36.2121 26.0559 37.306 26.108 38.7459C26.169 40.4343 26.0812 42.1282 26.1463 43.8163C26.1538 44.0113 26.1792 44.2186 26.222 44.4235H27.1287C27.0797 44.2028 27.063 43.9334 27.0626 43.5876C27.0605 41.818 27.0555 40.0484 27.0627 38.2789C27.0674 37.1019 27.5548 36.6079 28.7147 36.6008C30.1089 36.5922 31.5032 36.5891 32.8973 36.6005C34.0157 36.6095 34.5049 37.1031 34.5117 38.2361C34.5217 39.9337 34.5086 41.6313 34.5175 43.3288L35.4526 42.3937C35.4524 41.1724 35.4245 39.9501 35.4684 38.7304C35.5203 37.2881 35.0884 36.2037 33.381 35.6099C33.8933 35.3649 34.1909 35.1064 34.4968 35.0963C35.863 35.0509 37.2318 35.0582 38.5989 35.0834C39.4091 35.0983 39.8459 35.5208 39.8596 36.3382C39.8686 36.8797 39.8772 37.4214 39.8831 37.9632L49.3971 28.4491C46.151 24.105 40.9694 21.2958 35.1314 21.2958C28.168 21.2958 22.1422 25.2973 19.2179 31.1241C18.0141 33.5226 17.3325 36.2283 17.3325 39.0947C17.3325 40.953 17.6196 42.7413 18.1482 44.4235H22.9969C22.9981 44.187 22.9971 43.9504 23 43.7139ZM36.5936 29.7316C37.9191 29.7437 38.9827 30.819 38.98 32.1441C38.9772 33.465 37.9105 34.5525 36.5969 34.5735C35.2383 34.5953 34.1436 33.5124 34.1436 32.1469C34.1436 30.765 35.2047 29.719 36.5936 29.7316ZM30.8821 30.6109C32.3756 30.6511 33.5439 31.8949 33.507 33.4055C33.4697 34.9348 32.1873 36.1233 30.651 36.0524C29.1486 35.9831 28.0182 34.7405 28.0712 33.2165C28.1232 31.7194 29.3632 30.5701 30.8821 30.6109ZM25.0565 29.8136C26.3893 29.8296 27.4338 30.8901 27.4325 32.2262C27.4312 33.6116 26.3743 34.6536 24.9836 34.6407C23.6498 34.6283 22.6026 33.5712 22.5994 32.2338C22.596 30.8748 23.69 29.7973 25.0565 29.8136Z" fill="#EB001B" />
                                    <path d="M16.7461 46.0474V45.0271H17.7741V46.0474H16.7461ZM16.7461 50.6273V46.6074H17.7741V50.6273H16.7461Z" fill="#414042" />
                                    <path d="M22.6301 50.6273H21.6021V48.3719C21.6021 48.0497 21.5457 47.8145 21.4333 47.6661C21.3207 47.5179 21.1648 47.4436 20.9653 47.4436C20.863 47.4436 20.7582 47.4641 20.6508 47.505C20.5434 47.546 20.4423 47.6036 20.3478 47.6776C20.2531 47.7519 20.1675 47.84 20.0908 47.9423C20.0141 48.0446 19.9577 48.1571 19.922 48.2798V50.6273H18.894V46.6074H19.8223V47.3516C19.9705 47.0959 20.1853 46.8965 20.4667 46.7532C20.7479 46.6101 21.0651 46.5384 21.418 46.5384C21.6685 46.5384 21.8731 46.5844 22.0317 46.6765C22.1902 46.7686 22.3129 46.8888 22.3999 47.0371C22.4868 47.1854 22.5469 47.3542 22.5802 47.5434C22.6134 47.7327 22.6301 47.9244 22.6301 48.1187V50.6273Z" fill="#414042" />
                                    <path d="M25.2386 50.7041C24.9011 50.7041 24.5712 50.6504 24.249 50.543C23.9268 50.4356 23.6506 50.2821 23.4204 50.0827L23.804 49.4382C24.0495 49.6122 24.2885 49.7439 24.5213 49.8333C24.754 49.9229 24.9854 49.9676 25.2156 49.9676C25.4201 49.9676 25.5812 49.9292 25.6989 49.8525C25.8165 49.7758 25.8753 49.6659 25.8753 49.5226C25.8753 49.3795 25.8063 49.2746 25.6682 49.2081C25.5301 49.1417 25.305 49.065 24.9931 48.9779C24.7323 48.9064 24.5098 48.8373 24.3257 48.7708C24.1416 48.7044 23.9932 48.6289 23.8808 48.5445C23.7682 48.4601 23.6863 48.363 23.6353 48.253C23.5841 48.1431 23.5586 48.0113 23.5586 47.8579C23.5586 47.6534 23.5981 47.4693 23.6775 47.3055C23.7567 47.1419 23.8679 47.0025 24.0112 46.8875C24.1543 46.7724 24.3219 46.6842 24.5136 46.6228C24.7054 46.5614 24.9137 46.5307 25.1389 46.5307C25.4406 46.5307 25.7231 46.5742 25.9866 46.6612C26.2499 46.7482 26.4916 46.8888 26.7115 47.0831L26.2973 47.7045C26.0927 47.5511 25.8945 47.4386 25.7027 47.3669C25.5109 47.2954 25.3203 47.2596 25.1312 47.2596C24.9572 47.2596 24.8115 47.2954 24.6939 47.3669C24.5762 47.4386 24.5175 47.5537 24.5175 47.7122C24.5175 47.7839 24.5315 47.8426 24.5597 47.8886C24.5877 47.9346 24.6326 47.9756 24.6939 48.0113C24.7553 48.0471 24.8359 48.0817 24.9356 48.1149C25.0353 48.1482 25.1593 48.1828 25.3077 48.2185C25.5839 48.2902 25.8204 48.3617 26.0173 48.4333C26.2142 48.505 26.3752 48.5867 26.5006 48.6788C26.6259 48.7708 26.718 48.877 26.7768 48.9972C26.8356 49.1174 26.865 49.2618 26.865 49.4306C26.865 49.8245 26.7193 50.1352 26.4277 50.3627C26.1362 50.5904 25.7398 50.7041 25.2386 50.7041Z" fill="#414042" />
                                    <path d="M28.9518 50.7041C28.5375 50.7041 28.223 50.5711 28.0082 50.3052C27.7934 50.0393 27.686 49.6454 27.686 49.1238V46.6075H28.714V48.9013C28.714 49.5202 28.9365 49.8296 29.3814 49.8296C29.5809 49.8296 29.7739 49.7695 29.9606 49.6493C30.1473 49.5291 30.2994 49.3463 30.4171 49.1008V46.6075H31.445V49.446C31.445 49.5534 31.4642 49.6301 31.5026 49.6761C31.541 49.7222 31.6035 49.7478 31.6906 49.7528V50.6274C31.5882 50.6478 31.5026 50.6606 31.4335 50.6657C31.3645 50.6708 31.3018 50.6734 31.2456 50.6734C31.0615 50.6734 30.9119 50.6312 30.7968 50.5468C30.6817 50.4624 30.6139 50.3462 30.5935 50.1978L30.5705 49.8756C30.3915 50.1518 30.1613 50.3589 29.8801 50.497C29.5987 50.635 29.2894 50.7041 28.9518 50.7041Z" fill="#414042" />
                                    <path d="M35.0503 47.4974C34.7383 47.5025 34.4595 47.5626 34.2141 47.6776C33.9686 47.7927 33.7921 47.9653 33.6847 48.1954V50.6273H32.6567V46.6074H33.6003V47.4666C33.6719 47.3285 33.7563 47.2046 33.8535 47.0945C33.9506 46.9846 34.0555 46.8887 34.168 46.8068C34.2804 46.7251 34.3943 46.6624 34.5094 46.6189C34.6245 46.5755 34.7357 46.5537 34.8431 46.5537C34.8994 46.5537 34.9415 46.5537 34.9697 46.5537C34.9978 46.5537 35.0246 46.5563 35.0502 46.5613L35.0503 47.4974Z" fill="#414042" />
                                    <path d="M36.861 50.7041C36.6666 50.7041 36.4852 50.672 36.3163 50.6082C36.1475 50.5443 36.0019 50.4548 35.8791 50.3397C35.7563 50.2246 35.6604 50.0903 35.5914 49.9369C35.5223 49.7835 35.4878 49.6147 35.4878 49.4306C35.4878 49.2414 35.53 49.0662 35.6144 48.9051C35.6987 48.744 35.8163 48.6072 35.9673 48.4947C36.118 48.3822 36.2983 48.294 36.5082 48.23C36.7178 48.1661 36.948 48.1341 37.1986 48.1341C37.3775 48.1341 37.5526 48.1495 37.7241 48.1802C37.8953 48.2108 38.0475 48.2544 38.1805 48.3106V48.0804C38.1805 47.8145 38.105 47.6099 37.9542 47.4667C37.8033 47.3236 37.5794 47.2519 37.2829 47.2519C37.0681 47.2519 36.8583 47.2902 36.6538 47.3669C36.4492 47.4437 36.2396 47.5562 36.0248 47.7045L35.7103 47.0524C36.2268 46.7098 36.7843 46.5384 37.3827 46.5384C37.9606 46.5384 38.4094 46.6803 38.729 46.9642C39.0486 47.248 39.2085 47.6584 39.2085 48.1955V49.4459C39.2085 49.5533 39.2277 49.63 39.266 49.6761C39.3044 49.7221 39.367 49.7478 39.454 49.7528V50.6273C39.2801 50.6631 39.1292 50.681 39.0013 50.681C38.8069 50.681 38.6573 50.6375 38.5526 50.5506C38.4477 50.4638 38.3825 50.3487 38.357 50.2054L38.334 49.9829C38.1549 50.2182 37.9376 50.3972 37.6818 50.5199C37.4261 50.6427 37.1526 50.7041 36.861 50.7041ZM37.1526 49.9523C37.3263 49.9523 37.4913 49.9216 37.6473 49.8602C37.8033 49.7988 37.9247 49.7171 38.0118 49.6147C38.1242 49.5278 38.1806 49.4305 38.1806 49.3232V48.8628C38.0578 48.8168 37.9247 48.7798 37.7816 48.7516C37.6384 48.7236 37.5004 48.7094 37.3674 48.7094C37.1014 48.7094 36.8841 48.7696 36.7153 48.8897C36.5465 49.0099 36.4622 49.162 36.4622 49.3462C36.4622 49.5201 36.5285 49.6645 36.6616 49.7796C36.7945 49.8947 36.9581 49.9523 37.1526 49.9523Z" fill="#414042" />
                                    <path d="M44.0954 50.6273H43.0675V48.3719C43.0675 48.0497 43.0111 47.8145 42.8986 47.6661C42.7862 47.5179 42.6302 47.4436 42.4307 47.4436C42.3284 47.4436 42.2236 47.4641 42.1161 47.505C42.0087 47.546 41.9077 47.6036 41.8131 47.6776C41.7185 47.7519 41.6329 47.84 41.5562 47.9423C41.4794 48.0446 41.4231 48.1571 41.3874 48.2798V50.6273H40.3594V46.6074H41.2877V47.3516C41.4359 47.0959 41.6507 46.8965 41.9321 46.7532C42.2133 46.6101 42.5304 46.5384 42.8833 46.5384C43.1338 46.5384 43.3385 46.5844 43.497 46.6765C43.6555 46.7686 43.7783 46.8888 43.8652 47.0371C43.9522 47.1854 44.0122 47.3542 44.0456 47.5434C44.0788 47.7327 44.0954 47.9244 44.0954 48.1187L44.0954 50.6273Z" fill="#414042" />
                                    <path d="M44.9312 48.6175C44.9312 48.3362 44.9798 48.0703 45.0769 47.8196C45.174 47.5691 45.3148 47.3491 45.4989 47.1599C45.683 46.9707 45.9055 46.8198 46.1663 46.7073C46.4271 46.5948 46.7212 46.5385 47.0485 46.5385C47.4883 46.5385 47.8629 46.6332 48.1724 46.8223C48.4818 47.0116 48.7133 47.2596 48.8666 47.5665L47.8617 47.8734C47.7747 47.7251 47.6596 47.6113 47.5165 47.532C47.3732 47.4528 47.2147 47.4131 47.0408 47.4131C46.8925 47.4131 46.7544 47.4426 46.6266 47.5013C46.4986 47.5602 46.3874 47.642 46.2929 47.7468C46.1981 47.8517 46.124 47.9783 46.0703 48.1266C46.0167 48.2749 45.9898 48.4386 45.9898 48.6176C45.9898 48.7967 46.0179 48.9602 46.0742 49.1085C46.1304 49.257 46.2058 49.3847 46.3005 49.4921C46.395 49.5995 46.5063 49.6827 46.6342 49.7414C46.762 49.8003 46.8976 49.8297 47.0409 49.8297C47.225 49.8297 47.3949 49.7836 47.551 49.6916C47.7069 49.5995 47.8157 49.4871 47.877 49.354L48.882 49.6609C48.744 49.9677 48.5163 50.2184 48.1992 50.4127C47.8821 50.6071 47.5012 50.7043 47.0561 50.7043C46.7287 50.7043 46.4347 50.6479 46.1739 50.5355C45.9131 50.4231 45.6906 50.2708 45.5065 50.079C45.3223 49.8873 45.1805 49.6647 45.0807 49.4116C44.9811 49.1583 44.9312 48.8936 44.9312 48.6175Z" fill="#414042" />
                                    <path d="M51.529 50.7041C51.2068 50.7041 50.9153 50.6491 50.6544 50.5391C50.3936 50.4292 50.1711 50.2796 49.987 50.0903C49.8029 49.9012 49.661 49.6812 49.5612 49.4306C49.4614 49.1801 49.4116 48.9166 49.4116 48.6404C49.4116 48.3541 49.4602 48.0842 49.5574 47.8311C49.6545 47.5779 49.7952 47.3554 49.9793 47.1636C50.1634 46.9719 50.387 46.8197 50.6506 46.7072C50.9139 46.5947 51.2093 46.5384 51.5366 46.5384C51.8639 46.5384 52.1567 46.5947 52.415 46.7072C52.6732 46.8197 52.8932 46.9706 53.0748 47.1598C53.2563 47.349 53.3944 47.569 53.489 47.8195C53.5836 48.0702 53.6309 48.331 53.6309 48.602C53.6309 48.6686 53.6296 48.7325 53.6271 48.7939C53.6245 48.8552 53.6181 48.9064 53.6079 48.9473H50.501C50.5163 49.1059 50.5546 49.2465 50.6161 49.3692C50.6774 49.4919 50.7567 49.5968 50.8538 49.6838C50.9509 49.7708 51.0609 49.8372 51.1837 49.8832C51.3065 49.9293 51.4342 49.9523 51.5673 49.9523C51.7718 49.9523 51.9649 49.9024 52.1465 49.8026C52.328 49.7029 52.4521 49.5713 52.5186 49.4076L53.4007 49.6531C53.2524 49.9599 53.0159 50.2119 52.6912 50.4087C52.3663 50.6057 51.979 50.7041 51.529 50.7041ZM52.5722 48.2798C52.5466 47.9782 52.4354 47.7365 52.2385 47.5549C52.0416 47.3734 51.8025 47.2826 51.5213 47.2826C51.3832 47.2826 51.254 47.3069 51.1339 47.3554C51.0137 47.4041 50.9076 47.4719 50.8155 47.5588C50.7234 47.6458 50.648 47.7505 50.5892 47.8733C50.5304 47.996 50.4958 48.1316 50.4856 48.2799L52.5722 48.2798Z" fill="#414042" />
                                </svg>
                                </span>


                            </div>
                            <div className=' mt-2 text-center ' >
                                <h1 className=' lg:text-xl text-sm text-black font-normal ' >State Farm</h1>
                                <p className=' mt-1 font-thin text-lg ' >Compare rate and save up to $500on your insurance</p>
                            </div>

                            <div>
                                <button className=' mt-5 shadow shadow-[#00000040] border border-[#D09A40] bg-[#D09A40] w-full py-3 rounded-[26px] cursor-pointer text-[#FFFFFF] font-normal lg:text-xl text-sm  ' >
                                    Compare with Others
                                </button>
                            </div>

                        </div>




                    </div>
                </div>
            </MaxWidth>

            {/* Community Pros & Cons */}

            <MaxWidth>
                <div className=' shadow shadow-[#00000033] max-w-3xl   lg:py-8 lg:px-10 p-4 rounded-[7px] lg:space-y-0   ' >
                    <h1 className=' lg:text-4xl text-lg font-normal text-black ' >Community Pros & Cons</h1>
                    <div className=' mt-5 flex lg:flex-row flex-col gap-x-9 space-y-6 lg:space-y-0 ' >
                        <div className=' bg-[#E6FBDC] w-[366px] rounded-[8px] px-9 pt-4 pb-9 ' >
                            <h1 className=' text-[#188625] lg:text-[27px] font-normal text-sm ' >Pros</h1>
                            <div className=' space-y-6 lg:text-lg text-xs text-black font-thin ' >
                                <p>
                                    Excellent claims handling process with quick resolution times
                                </p>

                                <p>
                                    User-friendly mobile app with full policy management capabilities
                                </p>

                                <p>
                                    Wide range of coverage options and policy customization
                                </p>

                                <p>Knowledgeable and helpful customer service representatives</p>
                            </div>
                        </div>
                        <div className=' bg-[#FBE5DC] w-[366px] rounded-[8px] px-9 pt-4 pb-9 ' >
                            <h1 className=' text-[#861818] lg:text-[27px] font-normal text-sm ' >Cons</h1>
                            <div className=' space-y-6 lg:text-lg text-xs text-black font-thin ' >
                                <p>
                                    Premium rates tend to be higher than some competitors
                                </p>

                                <p>
                                    Some policy documentation can be complex and difficult to understand
                                </p>

                                <p>
                                    Limited availability of local agents in rural areas
                                </p>

                                <p>Occasional long wait times during peak customer service hours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidth>



            <MaxWidth>
                <div className=' shadow shadow-[#00000033] max-w-3xl   lg:py-8 lg:px-10 p-4 rounded-[7px] lg:space-y-0 my-6   ' >
                    <h1 className=' lg:text-4xl text-lg font-normal text-black ' >About Liberty Mutual</h1>
                    <p className=' mt-8 text-[#000000] lg:text-lg text-xs font-thin ' >
                        Liberty Mutual Insurance is a diversified global insurer and the third largest property and casualty insurer in the United States. Founded in 1912, the company offers a wide range of insurance products and services, including personal automobile, homeowners, life, commercial automobile, and general liability insurance.
                        The company operates globally with over 45,000 employees in more than 900 locations throughout the world. Liberty Mutual is structured into three business units: Personal Insurance, Commercial Insurance, and Global Specialty, each focusing on different customer segments and insurance needs.
                    </p>
                    <p className='text-[#000000] lg:text-lg text-xs font-thin' >
                        Liberty Mutual&apos;s strength lies in its financial stability, with an A rating from A.M. Best, indicating excellent financial strength and ability to meet ongoing insurance obligations. The company has also invested significantly in digital transformation, offering a robust mobile app and online platform that allows customers to manage policies, file claims, and access insurance cards digitally.
                        The insurer is known for its customizable policies, allowing customers to tailor coverage to their specific needs. Liberty Mutual also offers various discounts, including multi-policy, safe driver, and home safety feature discounts, which can help offset their generally higher-than-average premium costs.
                    </p>
                </div>
            </MaxWidth>



            {/* review  */}


            <MaxWidth>
                <div className=' shadow shadow-[#00000033] max-w-3xl   lg:py-8 lg:px-10 p-4 rounded-[7px] lg:space-y-0 my-6   ' >
                    <h1 className=' lg:text-4xl text-lg font-normal text-black ' >Customer Reviews </h1>

                    <div className=' shadow shadow-[#00000033] border border-[#989DA3] pt-6 pb-4 px-6 mt-4 rounded-[4px] ' >
                        <div className=' flex flex-row gap-x-9 ' >
                            <div>
                                <Image src={"/images/review/user-img.svg"} width={65} height={65} alt='' className='' />
                            </div>
                            <div>
                                <div>
                                    <h1 className=' lg:text-[27px] text-[16px] font-normal  ' >John D.</h1>
                                </div>
                                <div>
                                    <div className=' flex items-center gap-x-4   ' >
                                        <span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.02295 19.23L5.35295 16.416L2.17695 15.731L2.48895 12.454L0.345947 10L2.48995 7.54604L2.17695 4.27004L5.35395 3.58504L7.02295 0.770043L9.99995 2.02704L12.9769 0.769043L14.6469 3.58504L17.8229 4.26904L17.5109 7.54604L19.6549 10L17.5129 12.454L17.8239 15.731L14.6469 16.415L12.9779 19.231L9.99995 17.973L7.02295 19.23ZM8.94995 12.858L13.9079 7.90004L13.1999 7.18004L8.94995 11.43L6.79995 9.29204L6.09195 10L8.94995 12.858Z" fill="#39C85F" />
                                            </svg>

                                        </span>
                                        <div><p className=' text-[#39C85F] font-normal lg:text-[16px] text-xs ' >Verified Review</p></div>
                                        <div className='  w-2 h-2 bg-black rounded-full ' ></div>
                                        <div><p className=' font-thin lg:text-[16px] text-xs ' >Auto</p></div>
                                        <div className='  w-2 h-2 bg-black rounded-full ' ></div>
                                        <div><p className=' font-thin lg:text-[16px] text-xs ' >California</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className=' mt-8 text-[#000000] lg:text-[16px] text-xs font-thin  ' >&quot;I&apos;ve been with Liberty Mutual for 5 years and they&apos;ve been fantastic. When I had a fender bender last year, their claims process was smooth and stress-free. The digital app makes everything so easy to manage - I can view my ID cards, make payments, and even file a claim right from my phone. Their rates are a bit higher than some competitors, but the service is worth it.&quot;</p>
                        </div>
                        <div className=' flex items-center gap-x-5 ' >
                            <button className=' flex flex-row items-center mt-6 border border-[#697079] px-2 py-1 gap-x-1 rounded-2xl ' >
                                <span><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.49996 14.6667V8.00004H1.51162C1.34683 8 1.18575 7.95111 1.04874 7.85954C0.911732 7.76797 0.804949 7.63783 0.741891 7.48558C0.678833 7.33333 0.66233 7.1658 0.69447 7.00418C0.726609 6.84255 0.805948 6.69408 0.922456 6.57754L6.41079 1.0892C6.56706 0.932978 6.77899 0.845215 6.99996 0.845215C7.22093 0.845215 7.43285 0.932978 7.58912 1.0892L13.0775 6.57754C13.194 6.69408 13.2733 6.84255 13.3054 7.00418C13.3376 7.1658 13.3211 7.33333 13.258 7.48558C13.195 7.63783 13.0882 7.76797 12.9512 7.85954C12.8142 7.95111 12.6531 8 12.4883 8.00004H9.49996V14.6667C9.49996 14.8877 9.41216 15.0997 9.25588 15.256C9.0996 15.4122 8.88764 15.5 8.66662 15.5H5.33329C5.11228 15.5 4.90031 15.4122 4.74403 15.256C4.58775 15.0997 4.49996 14.8877 4.49996 14.6667Z" fill="#D09A40" stroke="#D09A40" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                </span>
                                <span>24</span>
                            </button>
                            <button className=' flex flex-row items-center mt-6 border border-[#697079] px-2 py-1 gap-x-1 rounded-2xl ' >
                                <span>
                                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.49996 1.3333V7.99996H1.51162C1.34683 8 1.18575 8.04889 1.04874 8.14046C0.911732 8.23203 0.804949 8.36217 0.741891 8.51442C0.678833 8.66667 0.66233 8.8342 0.69447 8.99582C0.726609 9.15745 0.805948 9.30592 0.922456 9.42246L6.41079 14.9108C6.56706 15.067 6.77899 15.1548 6.99996 15.1548C7.22093 15.1548 7.43285 15.067 7.58912 14.9108L13.0775 9.42246C13.194 9.30592 13.2733 9.15745 13.3054 8.99582C13.3376 8.8342 13.3211 8.66667 13.258 8.51442C13.195 8.36217 13.0882 8.23203 12.9512 8.14046C12.8142 8.04889 12.6531 8 12.4883 7.99996H9.49996V1.3333C9.49996 1.11228 9.41216 0.900321 9.25588 0.74404C9.0996 0.58776 8.88764 0.499963 8.66662 0.499963H5.33329C5.11228 0.499963 4.90031 0.58776 4.74403 0.74404C4.58775 0.900321 4.49996 1.11228 4.49996 1.3333Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </span>
                                <span>24</span>
                            </button>
                        </div>
                    </div>

                    <div className=' mt-8 ' >
                        <button className=' py-2 px-8 rounded-[5px] bg-[#E9EAEB] block mx-auto font-bold cursor-pointer   text-[#000000] text-[16px] ' >Load More Reviews</button>
                    </div>

                </div>
            </MaxWidth>


            <MaxWidth>
                <div className=' shadow shadow-[#00000033] max-w-3xl   lg:py-8 lg:px-10 p-4 rounded-[7px] lg:space-y-0 my-6 bg-[#faf5ec]   ' >
                    <h1 className=' lg:text-[27px]  text-sm text-center font-normal text-[#946D2D] ' >Share Your Experience </h1>
                    <p className=' lg:mt-2 mt-1 text-[#946D2D] lg:text-lg text-xs font-thin text-center ' >Help others make informed decisions by reviewing your experience with Liberty Mutual</p>



                    <button onClick={handleReview} className="block mx-auto rounded-[8px] bg-[#D09A40] py-2 px-5 text-white font-medium hover:bg-[#b68434] transition lg:mt-4 mt-2 cursor-pointer " >

                        Write a Review

                    </button>



                </div>
            </MaxWidth>























        </div>
    )
}

export default DetailsBanner