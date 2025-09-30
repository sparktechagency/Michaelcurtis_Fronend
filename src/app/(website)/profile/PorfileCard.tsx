import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PorfileCard = () => {
    return (
        <div>
            <div className=' max-w-6xl mx-auto pt-10 pb-28 ' >
                <div className=' flex flex-col space-y-5 lg:space-y-0 lg:flex-row items-start gap-x-6  ' >
                    {/* left side  */}
                    <div className=' lg:max-w-[30%] w-full flex-1  ' >
                        <div className='bg-white shadow shadow-[#00000033] py-8 px-5 rounded-[6px]' >
                            <div className=' flex flex-row  items-center gap-x-9  ' >
                                <div>
                                    <Image src={"/images/insurance/user-img.svg"} width={61} height={61} alt="" className=" w-[64px] h-[64px] cursor-pointer border border-[#BD8C3A] p-1 rounded-full " />
                                </div>
                                <div>
                                    <h1 className=' lg:text-xl text-sm  font-normal text-[#000000] ' >John Doe</h1>
                                    <p className=' lg:text-lg font-thin text-xs ' >Example@gmail.com</p>
                                </div>
                            </div>
                            <div className=' lg:mt-6 mt-3 flex justify-between items-center ' >
                                <p className='lg:text-[16px] text-xs font-thin text-black ' >States :</p>
                                <h1 className=' lg:text-[16px] text-xs font-normal text-black ' >California</h1>
                            </div>
                            <div className=' lg:mt-6 mt-3 flex justify-between items-center ' >
                                <p className='lg:text-[16px] text-xs font-thin text-black ' >Joined:</p>
                                <h1 className=' lg:text-[16px] text-xs font-normal text-black ' >September 10, 2025</h1>
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
                        <div className='bg-white shadow shadow-[#00000033] px-6 pt-6 pb-12  rounded-[12px]  ' >
                            <div>
                                <div className=' flex flex-row  items-start gap-x-8  ' >
                                    <div>
                                        <Image src={"/images/insurance/user-img.svg"} width={65} height={65} alt="" className=" w-[65px] h-[65px] cursor-pointer rounded-full " />
                                    </div>
                                    <div>
                                        <h1 className=' lg:text-xl text-sm  font-normal text-[#000000] ' >John Doe</h1>
                                        <div className=' flex flex-row items-center gap-x-1.5  ' >
                                            <div>
                                                <h1>Auto</h1>
                                            </div>
                                            <div>
                                                <div className=' w-1 h-1 rounded-full bg-black ' />
                                            </div>
                                            <div>
                                                <h1>California</h1>
                                            </div>
                                        </div>
                                        <div className=' flex flex-row items-center justify-between  ' >
                                            <div className=' flex flex-row items-center gap-x-1 ' >
                                                <h1 className=' font-bold lg:text-[16px]  ' >4.5</h1>
                                                <div className=' flex items-center gap-x-1 cursor-pointer ' >
                                                    <span>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.03247 12.8171L4.21706 15.1156C4.04851 15.2228 3.87229 15.2688 3.68842 15.2535C3.50454 15.2382 3.34365 15.1769 3.20575 15.0696C3.06784 14.9624 2.96058 14.8284 2.88396 14.6678C2.80735 14.5073 2.79203 14.3271 2.838 14.1273L3.84931 9.7832L0.470601 6.86418C0.317371 6.72627 0.221756 6.56906 0.183755 6.39254C0.145754 6.21602 0.157093 6.04379 0.217772 5.87585C0.278451 5.70791 0.370388 5.57 0.493585 5.46213C0.616781 5.35425 0.785334 5.2853 0.999242 5.25527L5.45822 4.86453L7.18205 0.773306C7.25867 0.589431 7.37757 0.451524 7.53877 0.359586C7.69997 0.267648 7.86453 0.22168 8.03247 0.22168C8.20041 0.22168 8.36498 0.267648 8.52618 0.359586C8.68738 0.451524 8.80628 0.589431 8.8829 0.773306L10.6067 4.86453L15.0657 5.25527C15.2802 5.28591 15.4488 5.35487 15.5714 5.46213C15.6939 5.56939 15.7859 5.70729 15.8472 5.87585C15.9085 6.0444 15.9201 6.21694 15.8821 6.39346C15.8441 6.56998 15.7482 6.72688 15.5943 6.86418L12.2156 9.7832L13.227 14.1273C13.2729 14.3265 13.2576 14.5066 13.181 14.6678C13.1044 14.829 12.9971 14.963 12.8592 15.0696C12.7213 15.1763 12.5604 15.2376 12.3765 15.2535C12.1927 15.2694 12.0164 15.2235 11.8479 15.1156L8.03247 12.8171Z" fill="#FEE453" />
                                                        </svg>
                                                    </span>
                                                    <span>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.01624 12.8171L4.20083 15.1156C4.03227 15.2228 3.85606 15.2688 3.67218 15.2535C3.48831 15.2382 3.32742 15.1769 3.18951 15.0696C3.0516 14.9624 2.94434 14.8284 2.86773 14.6678C2.79111 14.5073 2.77579 14.3271 2.82176 14.1273L3.83307 9.7832L0.454365 6.86418C0.301136 6.72627 0.205521 6.56906 0.16752 6.39254C0.129519 6.21602 0.140858 6.04379 0.201537 5.87585C0.262215 5.70791 0.354153 5.57 0.47735 5.46213C0.600546 5.35425 0.769098 5.2853 0.983007 5.25527L5.44198 4.86453L7.16582 0.773306C7.24243 0.589431 7.36134 0.451524 7.52253 0.359586C7.68373 0.267648 7.8483 0.22168 8.01624 0.22168C8.18418 0.22168 8.34875 0.267648 8.50994 0.359586C8.67114 0.451524 8.79005 0.589431 8.86666 0.773306L10.5905 4.86453L15.0495 5.25527C15.264 5.28591 15.4325 5.35487 15.5551 5.46213C15.6777 5.56939 15.7696 5.70729 15.8309 5.87585C15.8922 6.0444 15.9039 6.21694 15.8659 6.39346C15.8279 6.56998 15.732 6.72688 15.5781 6.86418L12.1994 9.7832L13.2107 14.1273C13.2567 14.3265 13.2414 14.5066 13.1647 14.6678C13.0881 14.829 12.9809 14.963 12.843 15.0696C12.7051 15.1763 12.5442 15.2376 12.3603 15.2535C12.1764 15.2694 12.0002 15.2235 11.8317 15.1156L8.01624 12.8171Z" fill="#FEE453" />
                                                        </svg>

                                                    </span>
                                                    <span>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.99994 12.8171L4.18453 15.1156C4.01598 15.2228 3.83976 15.2688 3.65589 15.2535C3.47201 15.2382 3.31112 15.1769 3.17321 15.0696C3.03531 14.9624 2.92805 14.8284 2.85143 14.6678C2.77482 14.5073 2.75949 14.3271 2.80546 14.1273L3.81678 9.7832L0.438069 6.86418C0.284839 6.72627 0.189224 6.56906 0.151223 6.39254C0.113222 6.21602 0.124561 6.04379 0.18524 5.87585C0.245919 5.70791 0.337857 5.57 0.461053 5.46213C0.58425 5.35425 0.752802 5.2853 0.96671 5.25527L5.42569 4.86453L7.14952 0.773306C7.22613 0.589431 7.34504 0.451524 7.50624 0.359586C7.66743 0.267648 7.832 0.22168 7.99994 0.22168C8.16788 0.22168 8.33245 0.267648 8.49365 0.359586C8.65484 0.451524 8.77375 0.589431 8.85037 0.773306L10.5742 4.86453L15.0332 5.25527C15.2477 5.28591 15.4162 5.35487 15.5388 5.46213C15.6614 5.56939 15.7534 5.70729 15.8146 5.87585C15.8759 6.0444 15.8876 6.21694 15.8496 6.39346C15.8116 6.56998 15.7157 6.72688 15.5618 6.86418L12.1831 9.7832L13.1944 14.1273C13.2404 14.3265 13.2251 14.5066 13.1485 14.6678C13.0718 14.829 12.9646 14.963 12.8267 15.0696C12.6888 15.1763 12.5279 15.2376 12.344 15.2535C12.1601 15.2694 11.9839 15.2235 11.8154 15.1156L7.99994 12.8171Z" fill="#FEE453" />
                                                        </svg>

                                                    </span>
                                                    <span>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.98371 12.8171L4.16829 15.1156C3.99974 15.2228 3.82353 15.2688 3.63965 15.2535C3.45578 15.2382 3.29489 15.1769 3.15698 15.0696C3.01907 14.9624 2.91181 14.8284 2.8352 14.6678C2.75858 14.5073 2.74326 14.3271 2.78923 14.1273L3.80054 9.7832L0.421834 6.86418C0.268604 6.72627 0.172989 6.56906 0.134988 6.39254C0.0969871 6.21602 0.108326 6.04379 0.169005 5.87585C0.229684 5.70791 0.321621 5.57 0.444818 5.46213C0.568014 5.35425 0.736567 5.2853 0.950475 5.25527L5.40945 4.86453L7.13328 0.773306C7.2099 0.589431 7.3288 0.451524 7.49 0.359586C7.6512 0.267648 7.81577 0.22168 7.98371 0.22168C8.15165 0.22168 8.31621 0.267648 8.47741 0.359586C8.63861 0.451524 8.75752 0.589431 8.83413 0.773306L10.558 4.86453L15.0169 5.25527C15.2315 5.28591 15.4 5.35487 15.5226 5.46213C15.6452 5.56939 15.7371 5.70729 15.7984 5.87585C15.8597 6.0444 15.8713 6.21694 15.8333 6.39346C15.7953 6.56998 15.6994 6.72688 15.5456 6.86418L12.1669 9.7832L13.1782 14.1273C13.2242 14.3265 13.2088 14.5066 13.1322 14.6678C13.0556 14.829 12.9483 14.963 12.8104 15.0696C12.6725 15.1763 12.5116 15.2376 12.3278 15.2535C12.1439 15.2694 11.9677 15.2235 11.7991 15.1156L7.98371 12.8171Z" fill="#FEE453" />
                                                        </svg>

                                                    </span>
                                                    <span>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.96741 12.8171L4.152 15.1156C3.98344 15.2228 3.80723 15.2688 3.62336 15.2535C3.43948 15.2382 3.27859 15.1769 3.14068 15.0696C3.00278 14.9624 2.89552 14.8284 2.8189 14.6678C2.74229 14.5073 2.72696 14.3271 2.77293 14.1273L3.78425 9.7832L0.405537 6.86418C0.252308 6.72627 0.156692 6.56906 0.118692 6.39254C0.0806907 6.21602 0.0920296 6.04379 0.152708 5.87585C0.213387 5.70791 0.305325 5.57 0.428521 5.46213C0.551718 5.35425 0.72027 5.2853 0.934179 5.25527L5.39316 4.86453L7.11699 0.773306C7.1936 0.589431 7.31251 0.451524 7.47371 0.359586C7.6349 0.267648 7.79947 0.22168 7.96741 0.22168C8.13535 0.22168 8.29992 0.267648 8.46112 0.359586C8.62231 0.451524 8.74122 0.589431 8.81783 0.773306L10.5417 4.86453L15.0006 5.25527C15.2152 5.28591 15.3837 5.35487 15.5063 5.46213C15.6289 5.56939 15.7208 5.70729 15.7821 5.87585C15.8434 6.0444 15.855 6.21694 15.817 6.39346C15.779 6.56998 15.6831 6.72688 15.5293 6.86418L12.1506 9.7832L13.1619 14.1273C13.2079 14.3265 13.1925 14.5066 13.1159 14.6678C13.0393 14.829 12.932 14.963 12.7941 15.0696C12.6562 15.1763 12.4953 15.2376 12.3115 15.2535C12.1276 15.2694 11.9514 15.2235 11.7828 15.1156L7.96741 12.8171Z" fill="#BABDC1" />
                                                        </svg>

                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className=' flex justify-end -mt-7 ' >
                                        <button className=' bg-[#DAF0C8] py-1.5 px-3.5 rounded-[12px] text-[#31BA2D] font-normal text-[16px]  ' >Published</button>
                                    </div>
                                </div>
                            </div>
                            <div className=' mt-9 ' >
                                <p>
                                    &quot;I&apos;`ve been with Liberty Mutual for 5 years and they&apos;ve been fantastic. When I had a fender bender last year, their claims process was smooth and stress-free. The digital app makes everything so easy to manage - I can view my ID cards, make payments, and even file a claim right from my phone. Their rates are a bit higher than some competitors, but the service is worth it.&rdquo;
                                </p>
                            </div>
                            <div className=' flex flex-row gap-x-5 mt-5 ' >
                                <div className="flex flex-col space-y-1  ">
                                    <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">4.8</span>
                                    <span className="text-center lg:text-xl text-sm font-thin text-black ">Claim</span>
                                </div>
                                <div className="flex flex-col space-y-1  ">
                                    <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">4.9</span>
                                    <span className="text-center lg:text-xl text-sm font-thin text-black ">Service</span>
                                </div>
                                <div className="flex flex-col space-y-1  ">
                                    <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">4.9</span>
                                    <span className="text-center lg:text-xl text-sm font-thin text-black ">Price</span>
                                </div>
                                <div className="flex flex-col space-y-1  ">
                                    <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">4.9</span>
                                    <span className="text-center lg:text-xl text-sm font-thin text-black ">Cover</span>
                                </div>
                                <div className="flex flex-col space-y-1  ">
                                    <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">4.9</span>
                                    <span className="text-center lg:text-xl text-sm font-thin text-black ">Digital</span>
                                </div>
                            </div>
                            <div className=' flex justify-end  ' >
                                <span className=' cursor-pointer ' >
                                    <svg width="58" height="39" viewBox="0 0 58 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.65" y="0.65" width="55.9" height="37.7" rx="7.15" stroke="#E04F4F" strokeWidth="1.3" />
                                        <path d="M21.6009 29.8999C21.0228 29.8999 20.5284 29.6941 20.1176 29.2824C19.7068 28.8708 19.5009 28.3772 19.5001 27.8017V11.6999H18.8501C18.6655 11.6999 18.5112 11.6375 18.3873 11.5127C18.2633 11.3879 18.2009 11.2332 18.2001 11.0486C18.1992 10.864 18.2616 10.7098 18.3873 10.5858C18.5129 10.4619 18.6672 10.3999 18.8501 10.3999H23.4001C23.4001 10.1313 23.4997 9.89726 23.6991 9.69793C23.8984 9.49859 24.1324 9.39893 24.4011 9.39893H30.1991C30.4677 9.39893 30.7017 9.49859 30.9011 9.69793C31.1004 9.89726 31.2001 10.1313 31.2001 10.3999H35.7501C35.9347 10.3999 36.0889 10.4623 36.2129 10.5871C36.3368 10.7119 36.3992 10.8666 36.4001 11.0512C36.4009 11.2358 36.3385 11.3901 36.2129 11.514C36.0872 11.638 35.9329 11.6999 35.7501 11.6999H35.1001V27.8004C35.1001 28.3776 34.8942 28.8716 34.4826 29.2824C34.0709 29.6932 33.5769 29.8991 33.0006 29.8999H21.6009ZM33.8001 11.6999H20.8001V27.8004C20.8001 28.0336 20.875 28.2251 21.025 28.375C21.1749 28.525 21.3669 28.5999 21.6009 28.5999H33.0006C33.2337 28.5999 33.4252 28.525 33.5752 28.375C33.7251 28.2251 33.8001 28.0336 33.8001 27.8004V11.6999ZM25.1005 25.9999C25.2851 25.9999 25.4398 25.9375 25.5646 25.8127C25.6894 25.6879 25.7513 25.5337 25.7505 25.3499V14.9499C25.7505 14.7653 25.6881 14.6111 25.5633 14.4871C25.4385 14.3632 25.2838 14.3008 25.0992 14.2999C24.9146 14.2991 24.7603 14.3615 24.6364 14.4871C24.5124 14.6128 24.4505 14.7671 24.4505 14.9499V25.3499C24.4505 25.5345 24.5129 25.6888 24.6377 25.8127C24.7625 25.9375 24.9167 25.9999 25.1005 25.9999ZM29.501 25.9999C29.6856 25.9999 29.8398 25.9375 29.9638 25.8127C30.0877 25.6879 30.1497 25.5337 30.1497 25.3499V14.9499C30.1497 14.7653 30.0873 14.6111 29.9625 14.4871C29.8377 14.3623 29.6834 14.2999 29.4997 14.2999C29.3151 14.2999 29.1604 14.3623 29.0356 14.4871C28.9108 14.6119 28.8488 14.7662 28.8497 14.9499V25.3499C28.8497 25.5345 28.9121 25.6888 29.0369 25.8127C29.1617 25.9367 29.3164 25.9991 29.501 25.9999Z" fill="#E04F4F" />
                                    </svg>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PorfileCard