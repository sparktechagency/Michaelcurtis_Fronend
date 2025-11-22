"use client"
import React, { useState } from 'react'
import FaqCreateFrom from './FaqCreateFrom';
import FaqUpdateModal from './FaqUpdateModal';
import { useAllFaqQuery, useFaqDeleteMutation } from '@/app/api/admin/faqApi';
import { FaqData } from '@/utility/types/admin/faq/faqType';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { deleteAlert } from '@/helper/deleteAlert';

const FaqList = () => {
    // faq modal 
    const [faqModal, setFaqModal] = useState<boolean>(false);
    const openFaqModal = () => {
        setFaqModal(true)
    }

    // faq update modal 

    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [faqId, setFaqId] = useState<number | null>(null)

    const openUpdateModal = (id: number) => {
        setUpdateModal(true);
        setFaqId(id);
    }








    // faq list 

    const { data } = useAllFaqQuery({});



    const faqList: FaqData[] = data?.data?.data || []




    // faq delelte


    const [faqDelete] = useFaqDeleteMutation();





    const handleDeleteFaq = async (id: number) => {
        try {
            const res = await deleteAlert();
            if (res?.isConfirmed) {
                const res = await faqDelete({ id });
                if (res) {

                    toast.success(res?.data?.message)
                }
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    }













    return (
        <div>
            <div className=' flex justify-between items-center  ' >
                <h1 className=' text-[#000000] text-[27px] font-normal ' >FAQ Management</h1>
                <button onClick={openFaqModal} className=' flex items-center border border-[#D09A40] bg-[#D09A40] text-xl text-white px-5 py-1.5 gap-x-1 cursor-pointer rounded-[34px] ' >
                    <span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 7.99805H8V12.998C8 13.2633 7.89464 13.5176 7.70711 13.7052C7.51957 13.8927 7.26522 13.998 7 13.998C6.73478 13.998 6.48043 13.8927 6.29289 13.7052C6.10536 13.5176 6 13.2633 6 12.998V7.99805H1C0.734784 7.99805 0.48043 7.89269 0.292893 7.70515C0.105357 7.51762 0 7.26326 0 6.99805C0 6.73283 0.105357 6.47848 0.292893 6.29094C0.48043 6.1034 0.734784 5.99805 1 5.99805H6V0.998047C6 0.73283 6.10536 0.478476 6.29289 0.29094C6.48043 0.103403 6.73478 -0.00195313 7 -0.00195312C7.26522 -0.00195313 7.51957 0.103403 7.70711 0.29094C7.89464 0.478476 8 0.73283 8 0.998047V5.99805H13C13.2652 5.99805 13.5196 6.1034 13.7071 6.29094C13.8946 6.47848 14 6.73283 14 6.99805C14 7.26326 13.8946 7.51762 13.7071 7.70515C13.5196 7.89269 13.2652 7.99805 13 7.99805Z" fill="white" />
                    </svg>
                    </span> Add New FAQ
                </button>
            </div>
            {/* faq list  */}
            <div className="mt-14 px-7">
                {faqList?.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between bg-[#FAF5EC] shadow shadow-[#00000040] py-3 px-4 rounded-lg mb-4"
                    >
                        {/* Left section */}
                        <div>
                            <h1 className="text-[#000000] font-medium text-sm">
                                {item.question || "System Maintenance Notice"}
                            </h1>

                            <div className=' className="text-[#000000] font-normal text-sm mt-3 '
                                dangerouslySetInnerHTML={{ __html: item?.answer || "" }}
                            />
                        </div>

                        {/* Right section - actions */}
                        <div className="flex items-center gap-x-6">
                            {/* Edit Icon */}
                            <span
                                onClick={() => { openUpdateModal(item?.id) }}
                                className="block mt-1 cursor-pointer"
                            >
                                <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1594 0.40625C12.4529 0.406576 12.7352 0.51897 12.9486 0.72047C13.1621 0.92197 13.2905 1.19737 13.3077 1.49039C13.3249 1.78341 13.2296 2.07194 13.0412 2.29703C12.8528 2.52212 12.5856 2.66678 12.2941 2.70145L12.1594 2.70951H2.94632V18.8323H19.0691V9.61928C19.0695 9.32576 19.1819 9.04343 19.3834 8.82999C19.5849 8.61656 19.8602 8.48811 20.1533 8.47091C20.4463 8.45371 20.7348 8.54904 20.9599 8.73744C21.185 8.92584 21.3297 9.19307 21.3643 9.48454L21.3724 9.61928V18.8323C21.3726 19.4134 21.1531 19.9731 20.758 20.3992C20.3629 20.8252 19.8213 21.0862 19.2419 21.1298L19.0691 21.1356H2.94632C2.36524 21.1358 1.80556 20.9163 1.37948 20.5212C0.953397 20.1261 0.692406 19.5845 0.648825 19.0051L0.643067 18.8323V2.70951C0.642883 2.12842 0.862344 1.56874 1.25746 1.14266C1.65257 0.71658 2.19413 0.45559 2.77358 0.412008L2.94632 0.40625H12.1594ZM19.349 0.801259C19.5562 0.594716 19.8343 0.474802 20.1268 0.465872C20.4192 0.456942 20.7041 0.559664 20.9236 0.753177C21.143 0.946689 21.2806 1.21648 21.3084 1.50775C21.3361 1.79903 21.2519 2.08994 21.073 2.32141L20.9774 2.43081L9.57625 13.8308C9.36901 14.0373 9.09092 14.1572 8.79846 14.1662C8.50601 14.1751 8.22112 14.0724 8.00166 13.8789C7.7822 13.6854 7.64462 13.4156 7.61687 13.1243C7.58913 12.833 7.67329 12.5421 7.85227 12.3106L7.94785 12.2024L19.349 0.801259Z" fill="#686868" />
                                </svg>

                            </span>

                            {/* Delete Icon */}
                            <span onClick={() => { handleDeleteFaq(item?.id) }} className="cursor-pointer">
                                <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.16335 21.1366V3.86211H0.0117188V1.55886H5.76987V0.407227H12.6796V1.55886H18.4378V3.86211H17.2862V21.1366H1.16335ZM3.46661 18.8333H14.9829V3.86211H3.46661V18.8333ZM5.76987 16.53H8.07312V6.16537H5.76987V16.53ZM10.3764 16.53H12.6796V6.16537H10.3764V16.53Z" fill="#686868" />
                                </svg>


                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {
                faqModal && (
                    <FaqCreateFrom faqModal={faqModal} setFaqModal={setFaqModal}  ></FaqCreateFrom>
                )
            }
            {
                updateModal && (
                    <FaqUpdateModal faqId={faqId} updateModal={updateModal} setUpdateModal={setUpdateModal}  ></FaqUpdateModal>
                )
            }
        </div>
    )
}

export default FaqList