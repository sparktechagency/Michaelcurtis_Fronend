
import { useSingleReviewQuery } from "@/app/api/website/review/reviewApi";
import Loading from "@/app/components/loading/Loading";
import { Review } from "@/utility/types/website/review-type/reviewType";
import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";

type PolicyViewProps = {
    reviewModal: boolean;
    setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
    reviewId: number | undefined
};

const ViewReview: React.FC<PolicyViewProps> = ({
    reviewModal,
    setReviewModal,
    reviewId
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState(false);

    // Open animation
    useEffect(() => {
        if (reviewModal) {
            const timer = setTimeout(() => setShowModal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [reviewModal]);

    // Close modal
    const handleClose = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => setReviewModal(false), 500);
    }, [setReviewModal]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                handleClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClose]);

    // Close on ESC and handle focus trap
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();

            if (e.key === "Tab" && modalRef.current) {
                const focusableEls = modalRef.current.querySelectorAll(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                const firstEl = focusableEls[0] as HTMLElement;
                const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;

                if (!e.shiftKey && document.activeElement === lastEl) {
                    firstEl.focus();
                    e.preventDefault();
                } else if (e.shiftKey && document.activeElement === firstEl) {
                    lastEl.focus();
                    e.preventDefault();
                }
            }
        };

        if (reviewModal) {
            document.addEventListener("keydown", handleKeyDown);
            // Focus first button
            setTimeout(() => firstFocusableRef.current?.focus(), 100);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [reviewModal, handleClose]);














    const { data, isLoading } = useSingleReviewQuery(reviewId);


    const singleReviewData: Review = data?.data;



    if (isLoading) {
        return (
            <div className=" z-50 max-w-3xl w-full mx-auto " >
                <Loading></Loading>
            </div>
        )
    }




    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0  bg-opacity-50 transition-opacity duration-500 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className={`fixed top-10 left-1/2 transform -translate-x-1/2 max-w-3xl w-full mx-4 bg-white shadow-lg rounded-lg pt-12 pb-6 px-12 transition-all duration-500 ease-out
          ${showModal ? "translate-y-20 opacity-100 scale-100" : "-translate-y-40 opacity-0 scale-95"}`}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    ref={firstFocusableRef}
                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    ✕
                </button>

                <div className='  ' >
                    <h1 className=' text-[#000000] text-4xl ' >Progressive review by {singleReviewData?.user?.full_name} </h1>
                    <p className='  mt-3 font-thin lg:text-xl text-sm text-[#000000] ' >Submitted on {new Date(singleReviewData?.created_at).toLocaleDateString()} </p>
                    <div className='  mt-7 ' >
                        <h1 className=' font-normal lg:text-xl text-sm text-black  ' >Full Comment</h1>
                    </div>
                    <div className=' mt-2 border border-[#989DA3] rounded-[7px] p-1  ' >
                        <p className='  font-thin ' >
                            {
                                singleReviewData?.comment
                            }
                        </p>
                    </div>
                    <div className="w-full  mx-auto mt-4 ">
                        <h1 className=" text-lg font-normal " >Category Scores</h1>
                    </div>




                    {/* all */}


                    <div className="flex flex-row justify-between items-center">
                        <div className="mt-4" >
                            <h1 className=" lg:text-xl text-[15px] font-thin">Overall</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"


                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (Number(singleReviewData?.overall_rating))
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Claims */}


                    <div className="flex flex-row justify-between items-center mt-5">
                        <div>
                            <h1 className=" lg:text-lg text-[15px] font-thin">Claims</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"

                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (Number(singleReviewData?.scores?.claims)) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Service */}


                    <div className="flex flex-row justify-between items-center mt-4">
                        <div>
                            <h1 className=" lg:text-lg text-[15px] font-thin">Service</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"

                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (Number(singleReviewData?.scores?.service)) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Pricing */}



                    <div className="flex flex-row justify-between items-center mt-4">
                        <div>
                            <h1 className=" lg:text-lg text-[15px] font-thin">Pricing</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"

                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (Number(singleReviewData?.scores?.pricing)) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>




                    {/* Coverage */}




                    <div className="flex flex-row justify-between items-center mt-4">
                        <div>
                            <h1 className=" lg:text-lg text-[15px] font-thin">Coverage Options</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"

                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (Number(singleReviewData?.scores?.coverage)) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Digital Tools */}


                    <div className="flex flex-row justify-between items-center mt-4">
                        <div>
                            <h1 className=" lg:text-lg text-[15px] font-thin">Transparency & Trust</h1>
                        </div>

                        <div className="flex gap-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"

                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`w-8 h-8 cursor-pointer ${star <= (Number(singleReviewData?.scores?.transparency_trust)) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>




                    {/* Your Review */}





















                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        onClick={handleClose}
                        className="flex items-center space-x-2 px-8 cursor-pointer py-3 text-[#D09A40] rounded-[36px] border border-[#D09A40] transition"
                    >
                        Cancel
                    </button>
                    <button className="px-8 cursor-pointer py-3 bg-[#D09A40] text-white rounded-[36px] hover:bg-[#b8802f] transition">
                        Approve
                    </button>
                </div>
            </div>
        </>
    );
};

export default ViewReview;
