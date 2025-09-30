"use client"
import MaxWidth from '@/app/components/max-width/MaxWidth'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6';

const ReviewFrom = () => {
    // How was your overall experience
    const [rating, setRating] = useState(0); // current selected rating
    const [hover, setHover] = useState(0);   // hover effect

    // Claims

    const [ClaimsRating, setClaimsRating] = useState(0);
    const [Claimshover, setClaimsHover] = useState(0);


    // ServiceRating


    const [ServiceRating, setServiceRating] = useState(0);
    const [ServiceHover, setServiceHover] = useState(0);


    // Pricing


    const [PricingRating, setPricingRating] = useState(0);
    const [PricingHover, setPricingHover] = useState(0);

    // Coverage


    const [CoverageRating, setCoverageRating] = useState(0);
    const [CoverageHover, setCoverageHover] = useState(0);


    // Digital Tools


    const [DigitalRating, setDigitalRating] = useState(0);
    const [DigitalHover, setDigitalHover] = useState(0);



    const [message, setMessage] = useState("");


    return (
        <div>
            <MaxWidth>
                <div className=' py-16 ' >
                    <h1 className=' text-[#000000] lg:text-6xl text-3xl text-center ' >Write a Review</h1>
                    <p className=' text-center mt-3 font-thin lg:text-xl text-sm text-[#000000] ' >Share your experience to help the community make better decisions.</p>
                    <div className=' lg:mt-8 mt-4 ' >
                        <h1 className=' font-normal lg:text-xl text-sm text-black  ' >Which Provider are you reviewing?</h1>
                    </div>
                    <div className=' mt-2 ' >
                        <p className=' lg:text-xl text-sm font-thin ' >If you came from a provider’s page, this will be pre-filled.</p>
                    </div>
                    <div className="w-full  mx-auto mt-4 ">
                        <select className="w-full   border border-[#989DA3] rounded-lg px-6 py-3 text-gray-700 focus:outline-none ">

                            <option selected value="all">Select an insurance provider</option>
                            <option value="verified">Verified Reviews</option>
                            <option value="high-rating">High Rating</option>
                            <option value="low-rating">Low Rating</option>
                        </select>
                    </div>




                    <div className=' lg:mt-9 mt-5 ' >
                        <p className=' lg:text-3xl text-xl font-normal text-center ' >How was your overall experience?</p>
                        <div className="flex gap-2 justify-center mt-3 ">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="focus:outline-none"
                                >
                                    <FaStar

                                        className={`w-8 h-8 cursor-pointer ${star <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300  "
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className=' h-0.5 bg-[#697079] my-5 lg:my-9 ' ></div>



                    {/* Claims */}


                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <h1 className="text-[#697079] lg:text-[27px] text-[15px] font-thin">Claims</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setClaimsRating(star)}
                                    onMouseEnter={() => setClaimsHover(star)}
                                    onMouseLeave={() => setClaimsHover(0)}
                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (Claimshover || ClaimsRating) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Service */}


                    <div className="flex flex-row justify-between items-center mt-4">
                        <div>
                            <h1 className="text-[#697079] lg:text-[27px] text-[15px] font-thin">Service</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setServiceRating(star)}
                                    onMouseEnter={() => setServiceHover(star)}
                                    onMouseLeave={() => setServiceHover(0)}
                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (ServiceHover || ServiceRating) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Pricing */}



                    <div className="flex flex-row justify-between items-center mt-4">
                        <div>
                            <h1 className="text-[#697079] lg:text-[27px] text-[15px] font-thin">Pricing</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setPricingRating(star)}
                                    onMouseEnter={() => setPricingHover(star)}
                                    onMouseLeave={() => setPricingHover(0)}
                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (PricingHover || PricingRating) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>




                    {/* Coverage */}




                    <div className="flex flex-row justify-between items-center mt-4">
                        <div>
                            <h1 className="text-[#697079] lg:text-[27px] text-[15px] font-thin">Coverage</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setCoverageRating(star)}
                                    onMouseEnter={() => setCoverageHover(star)}
                                    onMouseLeave={() => setCoverageHover(0)}
                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (CoverageHover || CoverageRating) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Digital Tools */}


                    <div className="flex flex-row justify-between items-center mt-4">
                        <div>
                            <h1 className="text-[#697079] lg:text-[27px] text-[15px] font-thin">Trust</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setDigitalRating(star)}
                                    onMouseEnter={() => setDigitalHover(star)}
                                    onMouseLeave={() => setDigitalHover(0)}
                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (DigitalHover || DigitalRating) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>




                    {/* Your Review */}



                    <div className=' lg:mt-9 mt-5  ' >
                        <h1 className=' mb-5 text-lg lg:text-[27px] font-normal text-[#000000] ' >Your Review</h1>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us about your experience in detail. What could be improved?"
                            rows={5}
                            className="w-full   border border-[#989DA3] rounded-lg px-6 py-3 text-gray-700 focus:outline-none placeholder:text-lg placeholder:font-thin  "
                        />
                    </div>





                    {/* <div clFd */}






                    <h1 className='text-lg lg:text-[27px] font-normal text-[#000000] mt-6 ' >Which state are you in?</h1>

                    <div className="w-full  mx-auto mt-4 ">
                        <select className="w-full   border border-[#989DA3] rounded-lg px-6 py-3 text-gray-700 focus:outline-none ">

                            <option disabled selected value="all">Select your State</option>
                            <option value="verified">Verified Reviews</option>
                            <option value="high-rating">High Rating</option>
                            <option value="low-rating">Low Rating</option>
                        </select>
                    </div>




                    <div className=' mt-11 flex justify-between ' >
                        <button className=' px-9 py-2 rounded-[26px] border border-[#697079] font-normal text-sm lg:text-xl cursor-pointer ' >Cancel</button>
                        <button className=' px-9 py-2 rounded-[26px] border border-[#D09A40] bg-[#D09A40] text-white font-normal text-sm lg:text-xl cursor-pointer' >Submit Review</button>
                    </div>











                </div>
            </MaxWidth>
        </div>
    )
}

export default ReviewFrom