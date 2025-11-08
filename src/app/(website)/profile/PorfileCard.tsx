"use client"
import { useUserProfileQuery } from '@/app/api/website/user/webUserApi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UserReview from './UserReview'

const PorfileCard = () => {
    const { data } = useUserProfileQuery({});
    console.log("user profile is", data?.data);
    const userData = data?.data;
    return (
        <div>
            <div className=' max-w-6xl mx-auto pt-10 pb-28 ' >
                <div className=' flex flex-col space-y-5 lg:space-y-0 lg:flex-row items-start gap-x-6  ' >
                    {/* left side  */}
                    <div className=' lg:max-w-[30%] w-full flex-1  ' >
                        <div className='bg-white shadow shadow-[#00000033] py-8 px-5 rounded-[6px]' >
                            <div className=' flex flex-row  items-center gap-x-9  ' >
                                <div>
                                    <Image unoptimized src={userData?.avatar || "/images/insurance/user-img.svg"} width={61} height={61} alt=" w-16 h-16 rounded-full " className=" w-[64px] h-[64px] cursor-pointer border border-[#BD8C3A] p-1 rounded-full " />
                                </div>
                                <div>
                                    <h1 className=' lg:text-xl text-sm  font-normal text-[#000000] ' >{userData?.full_name}</h1>
                                    <p className=' lg:text-lg font-thin text-xs ' > {userData?.email} </p>
                                </div>
                            </div>
                            <div className=' lg:mt-6 mt-3 flex justify-between items-center ' >
                                <p className='lg:text-[16px] text-xs font-thin text-black ' >States :</p>
                                <h1 className=' lg:text-[16px] text-xs font-normal text-black ' >{userData?.address}</h1>
                            </div>
                            <div className=' lg:mt-6 mt-3 flex justify-between items-center ' >
                                <p className='lg:text-[16px] text-xs font-thin text-black ' >Joined:</p>
                                <h1 className=' lg:text-[16px] text-xs font-normal text-black ' > {new Date(userData?.created_at).toLocaleDateString()} </h1>
                            </div>
                            <div className=' mt-7 ' >
                                <Link href={"/profile-update"}>
                                    <button className=' shadow shadow-[#00000033] rounded-[6px] border border-[#D09A40] py-3 w-full text-[#D09A40] lg:text-[16px] font-normal cursor-pointer ' >Edit Profile</button>
                                </Link>
                            </div>
                        </div>

                        <div className=' bg-white shadow shadow-[#00000033] py-8 px-5 rounded-[6px] mt-6  ' >

                            <h1 className=' lg:text-xl text-sm font-normal text-black ' >Account Settings</h1>
                            <Link href={"/change-password"}>
                                <p className=' mt-2 text-[#000000] font-thin lg:text-[16px] text-xs ' >Change Password</p>
                            </Link>

                        </div>

                    </div>
                    {/* right side  */}
                    <div className=' lg:max-w-[70%] w-full flex-1  ' >
                        <h1 className=' lg:text-4xl text-lg font-normal mb-7 ' >My Reviews</h1>
                        <UserReview></UserReview>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PorfileCard