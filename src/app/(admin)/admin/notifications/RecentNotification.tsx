


export default function RecentNotification() {


    return (
        <div className="">
            <div className=" bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[12px] pb-12 pt-8 px-5 mt-7 ">
                <h2 className=" text-xl font-medium text-[#000000] ">
                    Recent Notifications
                </h2>
                <h1 className=" mt-2.5 font-normal text-[16px]  " >
                    Recently sent notifications and their status
                </h1>

                <div className=" mt-5 " >
                    <div className=" py-3.5 border border-[#989898] rounded-[4px] px-6 " >
                        <div className=" flex items-center justify-between " >
                            <div>
                                <h1 className=" font-medium text-[16px] text-[#000000] " >System Maintenance Notice</h1>
                                <p className=" mt-3 font-thin text-sm " >Sent to all users - 2 hours ago</p>
                            </div>
                            <div className=" flex flex-row items-center gap-x-11 " >
                                <button className=" bg-[#EAF6EC] py-3 px-3 rounded-xl text-[#1C7731] text-xs font-normal cursor-pointer " >Delivered</button>
                                <span className=" cursor-pointer " >
                                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.73056 20.1362V3.69742H0.634644V1.50559H6.11423V0.409668H12.6897V1.50559H18.1693V3.69742H17.0734V20.1362H1.73056ZM3.9224 17.9443H14.8816V3.69742H3.9224V17.9443ZM6.11423 15.7525H8.30607V5.88925H6.11423V15.7525ZM10.4979 15.7525H12.6897V5.88925H10.4979V15.7525Z" fill="#686868" />
                                    </svg>

                                </span>
                            </div>
                        </div>


                    </div>
                    <div className=" py-3.5 border border-[#989898] rounded-[4px] px-6 mt-3 " >
                        <div className=" flex items-center justify-between " >
                            <div>
                                <h1 className=" font-medium text-[16px] text-[#000000] " >System Maintenance Notice</h1>
                                <p className=" mt-3 font-thin text-sm " >Sent to all users - 2 hours ago</p>
                            </div>
                            <div className=" flex flex-row items-center gap-x-11 " >
                                <button className=" bg-[#EAF6EC] py-3 px-3 rounded-xl text-[#1C7731] text-xs font-normal cursor-pointer " >Delivered</button>
                                <span className=" cursor-pointer  " >
                                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.73056 20.1362V3.69742H0.634644V1.50559H6.11423V0.409668H12.6897V1.50559H18.1693V3.69742H17.0734V20.1362H1.73056ZM3.9224 17.9443H14.8816V3.69742H3.9224V17.9443ZM6.11423 15.7525H8.30607V5.88925H6.11423V15.7525ZM10.4979 15.7525H12.6897V5.88925H10.4979V15.7525Z" fill="#686868" />
                                    </svg>

                                </span>
                            </div>
                        </div>


                    </div>
                </div>


            </div>
        </div>
    );
}
