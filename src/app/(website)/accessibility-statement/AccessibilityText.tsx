import React from 'react'

const AccessibilityText = () => {
    return (
        <div className=' pb-7 lg:pb-14 ' >
            <div className=' lg:mt-14 mt-7 mb-5 lg:mb-10  max-w-4xl mx-auto shadow shadow-[#00000040] rounded-[7px] px-6 py-5 bg-white lg:py-10 lg:px-12 ' >
                <h1 className=' lg:text-4xl text-lg font-normal text-black  lg:mb-4 pb-2 ' >Our Commitment</h1>
                <p className=' lg:text-xl text-xs font-thin text-black ' >
                    We are continually improving the user experience for everyone and applying the relevant accessibility standards. Our goal is to enable all users to independently gather information and transact business through our website. We aim to conform to the World Wide Web Consortium’s (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
                </p>

                <div className=' lg:mt-8 mt-4 ' >
                    <h1 className='lg:text-4xl text-lg font-normal text-black' >Accessibility Features</h1>
                    <p className=' lg:mt-4 mt-2 text-[#000000] lg:text-xl text-xs font-thin ' >We have implemented the following features to enhance accessibility on our site:</p>
                </div>

                <div className='lg:mt-7 mt-3.5' >
                    {/* Keyboard Navigation */}
                    <div className=' flex  gap-x-4  ' >
                        <div>
                            <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#FAF5EC" />
                                <g clipPath="url(#clip0_243_1090)">
                                    <path d="M19.3503 10.6545V17.3045H26.0003V10.6545H19.3503ZM24.3366 15.6409H21.0139V12.3182H24.3366V15.6409ZM2.72754 25.6182H9.37754V18.9682H2.72754V25.6182ZM4.39118 20.6318H7.7139V23.9545H4.39118V20.6318ZM2.72754 17.3045H9.37754V10.6545H2.72754V17.3045ZM4.39118 12.3182H7.7139V15.6409H4.39118V12.3182ZM11.0412 17.3045H17.6912V10.6545H11.0412V17.3045ZM12.7003 12.3182H16.023V15.6409H12.7003V12.3182ZM11.0412 25.6182H17.6912V18.9682H11.0412V25.6182ZM12.7003 20.6318H16.023V23.9545H12.7003V20.6318ZM19.3503 25.6182H26.0003V18.9682H19.3503V25.6182ZM21.0139 20.6318H24.3366V23.9545H21.0139V20.6318Z" fill="#D09A40" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_243_1090">
                                        <rect width="16" height="23.2727" fill="white" transform="translate(10 6)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <div>
                            <div>
                                <h1 className=' lg:text-xl text-xs font-normal text-[#000000] ' >Keyboard Navigation</h1>
                                <p className=' mt-1 lg:text-lg text-xs font-thin text-[#000000] ' >
                                    All interactive elements are accessible using the Tab key, arrow keys, and other standard keyboard commands without requiring a mouse.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Screen Reader Compatibility */}

                    <div className=' flex  gap-x-4 lg:mt-5 mt-2.5 items-start ' >
                        <div>
                            <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#FAF5EC" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.75 24.96V28H17.25V24.96C15.5332 24.775 13.9454 23.962 12.7917 22.6773C11.6381 21.3925 10.9999 19.7267 11 18V16H12.5V18C12.5 19.4587 13.0795 20.8576 14.1109 21.8891C15.1424 22.9205 16.5413 23.5 18 23.5C19.4587 23.5 20.8576 22.9205 21.8891 21.8891C22.9205 20.8576 23.5 19.4587 23.5 18V16H25V18C25.0001 19.7267 24.3619 21.3925 23.2083 22.6773C22.0546 23.962 20.4668 24.775 18.75 24.96ZM14 12C14 10.9391 14.4214 9.92172 15.1716 9.17157C15.9217 8.42143 16.9391 8 18 8C19.0609 8 20.0783 8.42143 20.8284 9.17157C21.5786 9.92172 22 10.9391 22 12V18C22 19.0609 21.5786 20.0783 20.8284 20.8284C20.0783 21.5786 19.0609 22 18 22C16.9391 22 15.9217 21.5786 15.1716 20.8284C14.4214 20.0783 14 19.0609 14 18V12Z" fill="#D09A40" />
                            </svg>


                        </div>
                        <div>
                            <div>
                                <h1 className=' lg:text-xl text-xs font-normal text-[#000000] ' >Screen Reader Compatibility</h1>
                                <p className=' mt-1 lg:text-lg text-xs font-thin text-[#000000] ' >
                                    Our site is built with semantic HTML and ARIA labels to ensure compatibility with modern screen readers like JAWS, NVDA, and VoiceOver.
                                </p>
                            </div>

                        </div>
                    </div>




                    {/* Color Contrast */}

                    <div className=' flex  gap-x-4 lg:mt-5 mt-2.5 items-start ' >
                        <div>
                            <div className=' flex  gap-x-4  items-start ' >
                                <div>
                                    <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#FAF5EC" />
                                        <path d="M18 26.5C22.6944 26.5 26.5 22.6944 26.5 18C26.5 13.3056 22.6944 9.5 18 9.5C13.3056 9.5 9.5 13.3056 9.5 18C9.5 22.6944 13.3056 26.5 18 26.5Z" stroke="#D09A40" />
                                        <path d="M22.2425 13.757C21.1172 12.6317 19.591 11.9995 17.9995 11.9995C16.4081 11.9995 14.8818 12.6317 13.7565 13.757C12.6312 14.8823 11.999 16.4086 11.999 18C11.999 19.5915 12.6312 21.1177 13.7565 22.243L17.9995 18L22.2425 13.757Z" fill="#D09A40" />
                                    </svg>



                                </div>
                                <div>
                                    <div>
                                        <h1 className=' lg:text-xl text-xs font-normal text-[#000000] ' >Color Contrast</h1>
                                        <p className=' mt-1 lg:text-lg text-xs font-thin text-[#000000] ' >
                                            We have carefully selected our color palette to ensure that text and interactive elements meet or exceed the WCAG 2.1 AA contrast ratio requirements
                                        </p>
                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>







                    {/* Responsive Design */}

                    <div className=' flex  gap-x-4 lg:mt-5 mt-2.5 items-start ' >
                        <div>
                            <div className=' flex  gap-x-4  items-start ' >
                                <div>
                                    <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#FAF5EC" />
                                        <g clipPath="url(#clip0_243_1115)">
                                            <path d="M14.25 29.25H24.75M17.25 11.25H27.75C28.1478 11.25 28.5294 11.408 28.8107 11.6893C29.092 11.9706 29.25 12.3522 29.25 12.75V23.25C29.25 23.6478 29.092 24.0294 28.8107 24.3107C28.5294 24.592 28.1478 24.75 27.75 24.75H11.25C10.8522 24.75 10.4706 24.592 10.1893 24.3107C9.90804 24.0294 9.75 23.6478 9.75 23.25V21.75H29.25M22.5 29.25H16.5L17.25 24.75H21.75L22.5 29.25Z" stroke="#D09A40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.75 15.75H14.25M8.25 6.75H12.75C12.75 6.75 14.25 6.75 14.25 8.25V17.25C14.25 17.25 14.25 18.75 12.75 18.75H8.25C8.25 18.75 6.75 18.75 6.75 17.25V8.25C6.75 8.25 6.75 6.75 8.25 6.75Z" stroke="#D09A40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_243_1115">
                                                <rect width="24" height="24" fill="white" transform="translate(6 6)" />
                                            </clipPath>
                                        </defs>
                                    </svg>




                                </div>
                                <div>
                                    <div>
                                        <h1 className=' lg:text-xl text-xs font-normal text-[#000000] ' >Responsive Design</h1>
                                        <p className=' mt-1 lg:text-lg text-xs font-thin text-[#000000] ' >
                                            Our website is designed to be fully responsive, providing an optimal experience on all devices, and supports browser zoom functionality without breaking the layout.
                                        </p>
                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>













                </div>

            </div>
        </div>
    )
}

export default AccessibilityText