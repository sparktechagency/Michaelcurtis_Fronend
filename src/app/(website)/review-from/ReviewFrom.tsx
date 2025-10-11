"use client"
import { useAllStateQuery, useInsuranceNameQuery } from '@/app/api/admin/insuranceApi';
import { usePostInsuranceMutation } from '@/app/api/website/review/reviewApi';
import MaxWidth from '@/app/components/max-width/MaxWidth'
import SkeletonLoader from '@/app/components/skeleton/SkeletonLoader';
import { updateAlert } from '@/helper/updertAlert';
import { InsuranceNameType, StateType } from '@/utility/types/admin/insurance-provider/providerType';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa6';
import { toast } from 'sonner';

const ReviewFrom = () => {
    // How was your overall experience


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




    // trust


    const [DigitalRating, setDigitalRating] = useState(0);
    const [DigitalHover, setDigitalHover] = useState(0);







    const { data: state } = useAllStateQuery([]);

    const allState: StateType[] = state?.data || [];

    const [avgRating, setAvgRating] = useState<number>(0);

    useEffect(() => {
        const avg =
            (ClaimsRating + ServiceRating + PricingRating + CoverageRating + DigitalRating) / 5;
        setAvgRating(avg);
    }, [ClaimsRating, ServiceRating, PricingRating, CoverageRating, DigitalRating]);




    const [provider_id, setProviderId] = useState<string>();
    const [state_id, setStateId] = useState<string>();
    const [comment, setComment] = useState<string>();







    const payload = {
        provider_id,
        state_id,
        overall_rating: avgRating,
        comment,
        scores: {
            claims: ClaimsRating,
            service: ServiceRating,
            pricing: PricingRating,
            trust: DigitalRating,
            coverage: CoverageRating,
        },
    };

    console.log(payload)


    const reviewCancel = () => {
        setProviderId("");
        setStateId("");
        setComment("");
        setClaimsRating(0);
        setServiceRating(0);
        setPricingRating(0);
        setCoverageRating(0);
        setDigitalRating(0)


    }



    // insurance name 


    const { data, isLoading } = useInsuranceNameQuery([]);


    const insuranceName: InsuranceNameType[] = data?.data || [];

    console.log(insuranceName)




    const [postInsurance] = usePostInsuranceMutation();


    const handleReviewSubmit = async () => {
        try {
            const res = await updateAlert();
            if (res.isConfirmed) {
                const res = await postInsurance(payload).unwrap();
                if (res) {
                    toast.success(res?.message)
                    reviewCancel();
                }
            }

        } catch (err) {
            if (err) {
                return window.location.href = "/auth/login";
            }
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }

    }


    if (isLoading) {
        return (
            <div>
                <SkeletonLoader />
            </div>
        )
    }








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
                    <div className="w-full mx-auto mt-4">
                        <select
                            className="w-full border border-[#989DA3] rounded-lg px-6 py-3 text-gray-700 focus:outline-none"
                            defaultValue=""
                            onChange={(e) => setProviderId(e.target.value)} // ✅ Correct place for onChange
                        >
                            <option value="" disabled>
                                Select an insurance provider
                            </option>

                            {insuranceName?.length > 0 ? (
                                insuranceName.map((item, i) => (
                                    <option key={i} value={item.id}>
                                        {item.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>
                    </div>





                    <div className="lg:mt-9 mt-5">
                        <p className="lg:text-3xl text-xl font-normal text-center">
                            How was your overall experience?
                        </p>

                        {/* ⭐ Average Rating Display */}
                        {avgRating > 0 && (
                            <div className="flex flex-col items-center mt-3">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={`w-8 h-8 ${star <= Math.round(avgRating)
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="mt-1 text-gray-600 text-sm">
                                    Average Rating:{" "}
                                    <span className="font-semibold text-yellow-500">
                                        {avgRating.toFixed(1)} / 5
                                    </span>
                                </p>
                            </div>
                        )}


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
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us about your experience in detail. What could be improved?"
                            rows={5}
                            className="w-full   border border-[#989DA3] rounded-lg px-6 py-3 text-gray-700 focus:outline-none placeholder:text-lg placeholder:font-thin  "
                        />
                    </div>












                    <h1 className='text-lg lg:text-[27px] font-normal text-[#000000] mt-6 ' >Which state are you in?</h1>

                    <div className="w-full  mx-auto mt-4 ">
                        <select onChange={(e) => { setStateId(e.target.value) }} className="w-full   border border-[#989DA3] rounded-lg px-6 py-3 text-gray-700 focus:outline-none ">

                            <option selected value="" disabled>
                                Select your State
                            </option>

                            {allState?.length > 0 ? (
                                allState.map((opt) => (
                                    <option key={opt.id} value={opt.id}>
                                        {opt.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>
                    </div>




                    <div className=' mt-11 flex justify-between ' >
                        <button onClick={reviewCancel} className=' px-9 py-2 rounded-[26px] border border-[#697079] font-normal text-sm lg:text-xl cursor-pointer ' >Cancel</button>
                        <button onClick={handleReviewSubmit} className=' px-9 py-2 rounded-[26px] border border-[#D09A40] bg-[#D09A40] text-white font-normal text-sm lg:text-xl cursor-pointer' >Submit Review</button>
                    </div>











                </div>
            </MaxWidth>
        </div>
    )
}

export default ReviewFrom