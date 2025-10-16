"use client"
import { useAllNotificationQuery, useDeleteNotificationMutation } from "@/app/api/admin/notificationApi";
import { deleteAlert } from "@/helper/deleteAlert";
import { Notification } from "@/utility/types/notification/notificationType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";



export default function RecentNotification() {


    const { data } = useAllNotificationQuery({});

    console.log(data?.data)

    const notification: Notification[] = data?.data || []

    const [deleteNotification] = useDeleteNotificationMutation();

    const handleDeleteNotification = async (id: number) => {
        try {
            const res = await deleteAlert();
            if (res.isConfirmed) {
                const res = await deleteNotification(id).unwrap();
                if (res) {
                    toast.success(res?.message)
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
        <div className="">
            <div className=" bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[12px] pb-12 pt-8 px-5 mt-7 ">


                <div className=" mt-5 space-y-4 " >
                    {
                        notification.map((item, i) => {
                            return (
                                <div key={i} className="  " >
                                    <div className=" py-3.5 border border-[#989898] rounded-[4px] px-6 " >
                                        <div className=" flex items-center justify-between " >
                                            <div>
                                                <h1 className=" font-medium text-[16px] text-[#000000] " >{item?.body}</h1>
                                                <p className=" mt-3 font-thin text-sm " >{item?.created_at_human}</p>
                                            </div>
                                            <div className=" flex flex-row items-center gap-x-11 " >
                                                <button className=" bg-[#EAF6EC] py-3 px-3 rounded-xl text-[#1C7731] text-xs font-normal cursor-pointer " >Delivered</button>
                                                <span onClick={() => handleDeleteNotification(item?.id)} className=" cursor-pointer " >
                                                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.73056 20.1362V3.69742H0.634644V1.50559H6.11423V0.409668H12.6897V1.50559H18.1693V3.69742H17.0734V20.1362H1.73056ZM3.9224 17.9443H14.8816V3.69742H3.9224V17.9443ZM6.11423 15.7525H8.30607V5.88925H6.11423V15.7525ZM10.4979 15.7525H12.6897V5.88925H10.4979V15.7525Z" fill="#686868" />
                                                    </svg>

                                                </span>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


            </div>
        </div>
    );
}
