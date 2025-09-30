
import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";

type PolicyViewProps = {
    reviewModal: boolean;
    setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewReview: React.FC<PolicyViewProps> = ({
    reviewModal,
    setReviewModal,
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
                    <h1 className=' text-[#000000] text-4xl ' >Progressive review by John D.</h1>
                    <p className='  mt-3 font-thin lg:text-xl text-sm text-[#000000] ' >Submitted on 2024-09-09 </p>
                    <div className='  mt-7 ' >
                        <h1 className=' font-normal lg:text-xl text-sm text-black  ' >Full Comment</h1>
                    </div>
                    <div className=' mt-2 border border-[#989DA3] rounded-[7px] p-1  ' >
                        <p className='  font-thin ' >&quot;I&lsquo;ve been with Liberty Mutual for 5 years and they&lsquo;ve been fantastic. When I had a fender bender last year, their claims process was smooth and stress-free. The digital app makes everything so easy to manage - I can view my ID cards, make payments,</p>
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
                            <h1 className=" lg:text-lg text-[15px] font-thin">Pricing</h1>
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
                            <h1 className=" lg:text-lg text-[15px] font-thin">Coverage Options</h1>
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
                            <h1 className=" lg:text-lg text-[15px] font-thin">Transparency & Trust</h1>
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
















                    <h1 className='text-lg lg:text-[27px] font-normal text-[#000000] mt-6 ' >Which state are you in?</h1>

                    <div className="w-full  mx-auto mt-4 ">
                        <select className="w-full   border border-[#989DA3] rounded-lg px-6 py-3 text-gray-700 focus:outline-none ">

                            <option disabled selected value="all">Select your State</option>
                            <option value="verified">Verified Reviews</option>
                            <option value="high-rating">High Rating</option>
                            <option value="low-rating">Low Rating</option>
                        </select>
                    </div>













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
