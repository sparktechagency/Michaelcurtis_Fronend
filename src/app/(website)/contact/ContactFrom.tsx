"use client";
import MaxWidth from '@/app/components/max-width/MaxWidth'
import React, { useState } from 'react'

const ContactFrom = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // here you can add API call or logic
    };
    return (
        <div>
            <MaxWidth>
                <div className=' py-7 lg:py-14 flex flex-col lg:flex-row justify-between  gap-x-6 space-y-6  ' >
                    {/* left side  */}
                    <div className=' lg:max-w-[70%] mx-auto w-full flex-1 shadow shadow-[#00000040] px-7 lg:px-14 py-6 lg:py-13 rounded-[7px]    ' >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block lg:text-xl text-sm font-normal text-black lg:mb-5 mb-3  "
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}

                                    className="w-full px-4 py-4 border border-[#989DA3] rounded-[7px] focus:ring-0 focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Email Address */}
                            <div className=' lg:mt-8 mt-4  ' >
                                <label
                                    htmlFor="email"
                                    className="block lg:text-xl text-sm font-normal text-black lg:mb-5 mb-3"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-4 border border-[#989DA3] rounded-[7px] focus:ring-0 focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Message */}
                            <div className='lg:mt-8 mt-4 ' >
                                <label
                                    htmlFor="message"
                                    className="block lg:text-xl text-sm font-normal text-black lg:mb-5 mb-3"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                    className="w-full px-4 py-4 border border-[#989DA3] rounded-[7px] focus:ring-0 focus:outline-none"
                                    required
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <div className='flex justify-end lg:mt-4 mt-2 ' >
                                <button
                                    type="submit"
                                    className="  bg-[#D09A40] cursor-pointer border border-[#D09A40] px-5 py-2 rounded-[26px]  text-white font-semibold   transition"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* right side  */}
                    <div className='  lg:max-w-[30%] mx-auto w-full flex-1  ' >
                        {/* 1st box  */}
                        <div className=' shadow shadow-[#00000033] px-6 pt-6 pb-9 rounded-[7px] w-full  ' >
                            <div className=' flex items-center gap-x-6 ' >
                                <span>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 6.5625V21.5625C3.75 22.0598 3.94754 22.5367 4.29917 22.8883C4.65081 23.24 5.12772 23.4375 5.625 23.4375H24.375C24.8723 23.4375 25.3492 23.24 25.7008 22.8883C26.0525 22.5367 26.25 22.0598 26.25 21.5625V6.5625H3.75ZM3.75 4.6875H26.25C26.7473 4.6875 27.2242 4.88504 27.5758 5.23667C27.9275 5.58831 28.125 6.06522 28.125 6.5625V21.5625C28.125 22.5571 27.7299 23.5109 27.0266 24.2141C26.3234 24.9174 25.3696 25.3125 24.375 25.3125H5.625C4.63044 25.3125 3.67661 24.9174 2.97335 24.2141C2.27009 23.5109 1.875 22.5571 1.875 21.5625V6.5625C1.875 6.06522 2.07254 5.58831 2.42417 5.23667C2.77581 4.88504 3.25272 4.6875 3.75 4.6875Z" fill="#D09A40" />
                                        <path d="M26.4844 6.5625L19.2338 14.85C18.7058 15.4535 18.0549 15.9372 17.3247 16.2686C16.5945 16.6 15.8019 16.7715 15 16.7715C14.1981 16.7715 13.4055 16.6 12.6753 16.2686C11.9451 15.9372 11.2942 15.4535 10.7663 14.85L3.51562 6.5625H26.4844ZM6.0075 6.5625L12.1762 13.6144C12.5282 14.0168 12.9622 14.3394 13.4491 14.5604C13.9359 14.7814 14.4644 14.8957 14.9991 14.8957C15.5337 14.8957 16.0622 14.7814 16.5491 14.5604C17.0359 14.3394 17.4699 14.0168 17.8219 13.6144L23.9925 6.5625H6.0075Z" fill="#D09A40" />
                                    </svg>
                                </span>
                                <h1 className=' lg:text-xl text-sm font-normal ' >Email Us</h1>
                            </div>
                            <div className=' lg:mt-7 mt-3 font-thin lg:text-xl text-xs ' >
                                <p>For direct inquiries, you can reach our support team at:</p>
                            </div>
                            <div className=' mt-2 ' >
                                <p className=' lg:text-xl text-xs font-normal text-[#D09A40] ' >support@coveragegrader.com</p>
                            </div>
                        </div>
                        {/* 2nd box  */}
                        <div className=' shadow shadow-[#00000033] px-6 pt-6 pb-9 rounded-[7px] lg:mt-6 mt-3  ' >
                            <div className=' flex items-center gap-x-6 ' >
                                <span>
                                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6997 23.025C11.4957 23.1715 11.2509 23.2503 10.9997 23.2503C10.7486 23.2503 10.5037 23.1715 10.2997 23.025C4.26348 18.7225 -2.14277 9.8725 4.33348 3.4775C6.1114 1.72856 8.50577 0.748905 10.9997 0.750001C13.4997 0.750001 15.8985 1.73125 17.666 3.47625C24.1422 9.87125 17.736 18.72 11.6997 23.025Z" stroke="#D09A40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11 12C11.663 12 12.2989 11.7366 12.7678 11.2678C13.2366 10.7989 13.5 10.163 13.5 9.5C13.5 8.83696 13.2366 8.20107 12.7678 7.73223C12.2989 7.26339 11.663 7 11 7C10.337 7 9.70107 7.26339 9.23223 7.73223C8.76339 8.20107 8.5 8.83696 8.5 9.5C8.5 10.163 8.76339 10.7989 9.23223 11.2678C9.70107 11.7366 10.337 12 11 12Z" stroke="#D09A40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </span>
                                <h1 className=' lg:text-xl text-sm font-normal ' >Our Office</h1>
                            </div>
                            <div className=' lg:mt-7 mt-3 font-thin lg:text-xl text-xs ' >
                                <p>123 Community Lane San Francisco, CA 94105</p>
                            </div>
                            <div className=' mt-2 ' >
                                <p className=' lg:text-xl text-xs font-normal text-[#D09A40] ' >support@coveragegrader.com</p>
                            </div>
                        </div>
                    </div>

                </div>
            </MaxWidth>
        </div>
    )
}

export default ContactFrom