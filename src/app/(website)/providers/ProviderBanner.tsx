"use client"
import MaxWidth from '@/app/components/max-width/MaxWidth'
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, LucideSearch } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
type StateType = {
    name: string
}

const ProviderBanner = () => {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", query);
        // You can add your search logic here
    };




    // state 
    const [selectedState, setSelectedState] = useState<string>("All States");
    const [openState, setOpenState] = useState(false);

    const stateList: StateType[] = [
        { name: "California" },
        { name: "Texas" },
        { name: "Florida" },
        { name: "New York" },
    ];


    const stateDropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target as Node)) {
                setOpenState(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    // rating 

    // rating 

    const [score, setScore] = useState(1);



    // price 

    const priceList: number[] = [50, 100, 200, 500, 1000];


    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [openPrice, setOpenPrice] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenPrice(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);







    const fullStars = Math.floor(4.5);
    const halfStars = 4.5 % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    type Insurer = {
        id: number;
        company: string;
        overall: number;
        claim: number;
        service: number;
        price: number;
        cover: number;
        digital: number;
        priceValue: string

    };

    const insuranceData = [
        { id: 1, rank: 4, company: "Progressive", overall: 4.6, claim: 4.8, service: 4.9, price: 4.2, cover: 4.2, digital: 4.2, priceValue: "$450" },
        { id: 2, rank: 5, company: "Progressive", overall: 4.6, claim: 4.8, service: 4.9, price: 4.2, cover: 4.2, digital: 4.2, priceValue: "$450" },
        { id: 3, rank: 6, company: "Progressive", overall: 4.6, claim: 4.8, service: 4.9, price: 4.2, cover: 4.2, digital: 4.2, priceValue: "$450" },
        { id: 4, rank: 8, company: "Progressive", overall: 4.6, claim: 4.8, service: 4.9, price: 4.2, cover: 4.2, digital: 4.2, priceValue: "$450" },
        { id: 5, rank: 9, company: "Progressive", overall: 4.6, claim: 4.8, service: 4.9, price: 4.2, cover: 4.2, digital: 4.2, priceValue: "$450" },
    ];






    const [selected, setSelected] = React.useState<Insurer[]>([]);
    const [openCompareModal, setOpenCompareModal] = React.useState(false);

    // ✅ Checkbox toggle handler
    const handleCompareChange = (data: Insurer, checked: boolean) => {
        const stored = localStorage.getItem("selectedInsurers");
        const prevSelected: Insurer[] = stored ? JSON.parse(stored) : [];

        let newSelected: Insurer[];

        if (checked) {
            // ✅ Add if not exists
            if (!prevSelected.some(i => i.id === data.id)) {
                newSelected = [...prevSelected, data];
            } else {
                newSelected = prevSelected;
            }
        } else {
            // ✅ Remove if unchecked
            newSelected = prevSelected.filter(i => i.id !== data.id);
        }

        // Update state + LocalStorage
        setSelected(newSelected);
        localStorage.setItem("selectedInsurers", JSON.stringify(newSelected));

        // Modal open condition
        if (newSelected.length > 0 && !openCompareModal) {
            setOpenCompareModal(true);
        }
    };

    React.useEffect(() => {
        const stored = localStorage.getItem("selectedInsurers");
        if (stored) {
            try {
                const parsed: Insurer[] = JSON.parse(stored);
                setSelected(parsed);
                if (parsed.length > 0) setOpenCompareModal(true);
            } catch (error) {
                console.error("Failed to parse localStorage:", error);
            }
        }
    }, []);

    const closeModal = () => {
        setOpenCompareModal(false);  // modal close
        setSelected([]);             // checkbox uncheck, state empty
        localStorage.removeItem("selectedInsurers"); // LocalStorage clear
    };














    return (
        <div>
            <MaxWidth>
                <div className=' flex flex-col md:flex-row gap-x-6 my-10  lg:space-y-0 space-y-6 mb-20 ' >
                    {/* left side  */}
                    <div className=' md:max-w-[30%]  flex-1 p-6 shadow-lg h-[80vh] w-full ' >
                        <div className=' flex justify-between ' >
                            <h1 className=' lg:text-2xl text-sm font-normal ' >Filters</h1>
                            <p className='lg:text-2xl  cursor-pointer font-normal text-[#D09A40] lg:text-[16px] text-xs ' >Clear all</p>
                        </div>
                        {/* search  */}
                        <div className=' lg:mt-5 mt-3 ' >
                            <form
                                onSubmit={handleSearch}
                                className="w-full max-w-md mx-auto relative"
                            >
                                {/* Search Input */}
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search providers..."
                                    className="w-full pl-12 pr-4 py-3 rounded-[3px] border border-[#989DA3] focus:outline-none focus:ring-0 transition"
                                />

                                {/* Search Icon */}
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <LucideSearch size={20} />
                                </span>
                            </form>
                        </div>
                        {/* Policy Type */}
                        <h1 className=' mt-5 font-normal lg:text-lg text-black ' >Policy Type</h1>
                        <div className='  flex items-center gap-x-3 mt-4 ' >
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-2xl cursor-pointer "
                                style={{ accentColor: '#D09A40' }}
                            // Optional: onChange handler
                            />
                            <label className=" text-[#697079] font-normal  cursor-pointer ">
                                Auto
                            </label>
                        </div>
                        {/* Health */}
                        <div className='  flex items-center gap-x-3 mt-4 ' >
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-2xl cursor-pointer "
                                style={{ accentColor: '#D09A40' }}
                            // Optional: onChange handler
                            />
                            <label className=" text-[#697079] font-normal  cursor-pointer ">
                                Health
                            </label>
                        </div>
                        {/* Life */}
                        <div className='  flex items-center gap-x-3 mt-4 ' >
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-2xl cursor-pointer "
                                style={{ accentColor: '#D09A40' }}
                            // Optional: onChange handler
                            />
                            <label className=" text-[#697079] font-normal  cursor-pointer ">
                                Life
                            </label>
                        </div>
                        {/* Home */}
                        <div className='  flex items-center gap-x-3 mt-4 ' >
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-2xl cursor-pointer "
                                style={{ accentColor: '#D09A40' }}
                            // Optional: onChange handler
                            />
                            <label className=" text-[#697079] font-normal  cursor-pointer ">
                                Home
                            </label>
                        </div>

                        {/* State */}
                        <div className='mt-2' >
                            <h1 className=' lg:text-lg text-xs font-normal  ' >State</h1>
                            <div ref={stateDropdownRef} className="relative  mt-4  ">
                                {/* Dropdown button */}
                                <button
                                    onClick={() => setOpenState(!openState)}
                                    className="w-full flex justify-between items-center px-4 py-3 border border-[#697079] rounded-[4px] bg-white shadow-sm text-gray-700 hover:border-gray-400 focus:outline-none"
                                >
                                    <span className="capitalize">{selectedState}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 cursor-pointer text-gray-500 transition-transform duration-200 ${openState ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </button>

                                {/* Dropdown menu */}
                                {openState && (
                                    <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                        {stateList.map((option) => (
                                            <li
                                                key={option.name}
                                                onClick={() => {
                                                    setSelectedState(option.name);
                                                    setOpenState(false);
                                                }}
                                                className={`px-4 py-2 cursor-pointer textColor font-normal lg:text-xl text-[16px]  capitalize hover:bg-gray-100 ${selectedState === option.name ? "bg-gray-100 font-normal" : ""
                                                    }`}
                                            >
                                                {option.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>


                        {/* Minimum Rating */}


                        <div className='mt-4 ' >
                            <h1 className=' lg:text-lg text-xs font-normal text-black ' >Minimum Rating</h1>
                            <div className="flex gap-x-3 lg:gap-x-10 items-center   rounded-lg px-4 py-2  border border-[#697079]   mt-2 ">
                                {/* Label */}
                                <span className="text-gray-600 font-normal">Score: {score}+</span>

                                {/* Slider */}
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={score}
                                    onChange={(e) => setScore(Number(e.target.value))}
                                    className="w-32 h-2  rounded-lg appearance-none cursor-pointer bg-gray-200 accent-yellow-600"
                                />
                            </div>
                        </div>


                        {/* Price Signal */}


                        <div className=' mt-4 ' >

                            {/* price  */}

                            <h1 className='lg:text-lg text-xs font-normal text-black' >Price Signal</h1>


                            <div ref={dropdownRef} className="relative pb-7 ">
                                {/* Dropdown button */}
                                <button
                                    onClick={() => setOpenPrice(!openPrice)}
                                    className="w-full mt-2 flex justify-between items-center px-4 py-3 border border-[#697079] rounded-[4px] bg-white  textColor  focus:outline-none"
                                >
                                    <span>{selectedPrice !== null ? `$${selectedPrice}` : "Low to High"}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 cursor-pointer textColor transition-transform duration-200 ${openPrice ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </button>

                                {/* Dropdown menu */}
                                {openPrice && (
                                    <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                        {priceList.map((price) => (
                                            <li
                                                key={price}
                                                onClick={() => {
                                                    setSelectedPrice(price);
                                                    setOpenPrice(false);
                                                }}
                                                className={`px-4 py-2 cursor-pointer  textColor font-normal lg:text-xl text-[16px]  ${selectedPrice === price ? "bg-gray-100 font-normal" : ""
                                                    }`}
                                            >
                                                ${price}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>




                    </div>
                    {/* right side  */}
                    <div className=' max-w-[70%]  flex-1  ' >
                        <div>
                            <h1 className=' lg:text-4xl text-xl font-normal ' >124 Insurance Providers</h1>
                        </div>
                        <div className='  flex flex-wrap justify-between  gap-x-5 gap-y-6  mx-auto mt-6 ' >
                            {
                                insuranceData?.map((item, i) => {
                                    return (
                                        <div className=' rounded-xl shadow shadow-[#00000040] ' key={i} >

                                            <div className=' mt-5 ' >
                                                <div className='  py-6 px-4  ' >
                                                    <div className=' flex justify-between items-center ' >
                                                        <div className=' flex gap-x-5  ' >
                                                            <span>
                                                                <svg width="51" height="54" viewBox="0 0 51 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="0.375" y="0.375" width="50.25" height="52.5" rx="4.125" fill="#FAF5EC" />
                                                                    <rect x="0.375" y="0.375" width="50.25" height="52.5" rx="4.125" stroke="#E9D1A7" strokeWidth="0.75" />
                                                                    <path d="M38.761 28.9138C38.761 30.2882 38.5486 31.6108 38.1595 32.8549H24.3335L36.1479 21.0405C37.79 23.236 38.761 25.9616 38.761 28.9138Z" fill="#F79F1E" />
                                                                    <path d="M16.6251 32.3301C16.6289 32.0228 16.5326 31.8806 16.2406 31.7101C15.9683 31.551 15.6953 31.1454 15.6806 30.8361C15.6192 29.549 15.6398 28.257 15.6622 26.9674C15.6734 26.3229 16.0309 26.0029 16.6931 25.9943C17.6456 25.982 18.5988 25.9764 19.5507 26.0019C19.798 26.0085 20.0419 26.1414 20.2874 26.2163C20.2864 26.2782 20.2854 26.3402 20.2844 26.4021C19.1923 26.7819 18.8851 27.5909 18.9236 28.6558C18.9688 29.9045 18.9039 31.1573 18.952 32.4058C18.9576 32.55 18.9764 32.7033 19.008 32.8549H19.6785C19.6423 32.6917 19.6299 32.4924 19.6297 32.2366C19.6281 30.9279 19.6244 29.6192 19.6297 28.3104C19.6332 27.4399 19.9937 27.0746 20.8516 27.0693C21.8826 27.0629 22.9139 27.0607 23.9449 27.0691C24.7721 27.0758 25.1339 27.4408 25.1389 28.2788C25.1463 29.5343 25.1366 30.7898 25.1432 32.0453L25.8348 31.3536C25.8347 30.4504 25.814 29.5465 25.8465 28.6444C25.8849 27.5777 25.5654 26.7756 24.3027 26.3365C24.6815 26.1553 24.9016 25.9641 25.1279 25.9566C26.1383 25.9231 27.1506 25.9285 28.1618 25.9471C28.7609 25.9581 29.084 26.2706 29.0941 26.8751C29.1008 27.2756 29.1072 27.6763 29.1115 28.0769L36.1479 21.0405C33.7472 17.8276 29.9149 15.75 25.5973 15.75C20.4472 15.75 15.9906 18.7095 13.8279 23.0189C12.9376 24.7927 12.4335 26.7939 12.4335 28.9138C12.4335 30.2882 12.6458 31.6108 13.0367 32.8549H16.6227C16.6236 32.68 16.6229 32.505 16.6251 32.3301ZM26.6787 21.989C27.659 21.998 28.4456 22.7932 28.4436 23.7733C28.4416 24.7501 27.6526 25.5544 26.6811 25.57C25.6763 25.5861 24.8667 24.7852 24.8667 23.7753C24.8667 22.7533 25.6514 21.9797 26.6787 21.989ZM22.4545 22.6393C23.5591 22.669 24.4231 23.5889 24.3959 24.7061C24.3682 25.8372 23.4198 26.7162 22.2836 26.6638C21.1724 26.6125 20.3364 25.6935 20.3756 24.5664C20.4141 23.4592 21.3311 22.6091 22.4545 22.6393ZM18.146 22.0496C19.1317 22.0614 19.9042 22.8458 19.9033 23.834C19.9023 24.8586 19.1206 25.6292 18.0921 25.6197C17.1056 25.6105 16.3312 24.8287 16.3287 23.8396C16.3263 22.8345 17.1354 22.0376 18.146 22.0496Z" fill="#EB001B" />
                                                                    <path d="M12.0001 34.0561V33.3015H12.7604V34.0561H12.0001ZM12.0001 37.4434V34.4703H12.7604V37.4434H12.0001Z" fill="#414042" />
                                                                    <path d="M16.3519 37.4431H15.5916V35.775C15.5916 35.5367 15.5499 35.3627 15.4668 35.253C15.3835 35.1433 15.2682 35.0884 15.1207 35.0884C15.045 35.0884 14.9675 35.1036 14.888 35.1339C14.8086 35.1642 14.7339 35.2067 14.6639 35.2615C14.5939 35.3164 14.5306 35.3816 14.4739 35.4573C14.4172 35.5329 14.3755 35.6161 14.349 35.7069V37.4431H13.5888V34.47H14.2753V35.0204C14.3849 34.8313 14.5438 34.6838 14.7519 34.5778C14.9598 34.472 15.1944 34.4189 15.4554 34.4189C15.6407 34.4189 15.792 34.453 15.9093 34.5211C16.0265 34.5892 16.1173 34.6781 16.1817 34.7877C16.246 34.8975 16.2904 35.0223 16.315 35.1622C16.3396 35.3022 16.3519 35.444 16.3519 35.5877V37.4431Z" fill="#414042" />
                                                                    <path d="M18.2809 37.4999C18.0312 37.4999 17.7872 37.4602 17.5489 37.3807C17.3107 37.3013 17.1064 37.1878 16.9362 37.0403L17.2198 36.5637C17.4014 36.6923 17.5782 36.7897 17.7503 36.8559C17.9224 36.9221 18.0936 36.9552 18.2638 36.9552C18.4151 36.9552 18.5342 36.9268 18.6213 36.8701C18.7082 36.8133 18.7518 36.732 18.7518 36.6261C18.7518 36.5202 18.7007 36.4426 18.5986 36.3934C18.4965 36.3444 18.33 36.2876 18.0993 36.2232C17.9064 36.1703 17.7419 36.1192 17.6057 36.07C17.4695 36.021 17.3598 35.9651 17.2766 35.9027C17.1934 35.8403 17.1328 35.7685 17.0951 35.6871C17.0572 35.6058 17.0383 35.5084 17.0383 35.3949C17.0383 35.2436 17.0676 35.1075 17.1263 34.9864C17.1848 34.8653 17.2671 34.7623 17.3731 34.6772C17.4789 34.5921 17.6029 34.5268 17.7447 34.4814C17.8865 34.436 18.0406 34.4133 18.2071 34.4133C18.4302 34.4133 18.6392 34.4455 18.834 34.5098C19.0288 34.5742 19.2075 34.6782 19.3702 34.8218L19.0638 35.2814C18.9125 35.1679 18.766 35.0848 18.6241 35.0318C18.4823 34.9789 18.3413 34.9524 18.2014 34.9524C18.0728 34.9524 17.965 34.9789 17.878 35.0318C17.791 35.0848 17.7475 35.1699 17.7475 35.2871C17.7475 35.3401 17.7579 35.3836 17.7787 35.4176C17.7995 35.4516 17.8326 35.482 17.878 35.5084C17.9234 35.5348 17.983 35.5604 18.0568 35.585C18.1305 35.6096 18.2222 35.6351 18.332 35.6616C18.5362 35.7146 18.7111 35.7675 18.8568 35.8204C19.0024 35.8734 19.1215 35.9339 19.2142 36.002C19.3069 36.0701 19.375 36.1486 19.4185 36.2375C19.4619 36.3264 19.4837 36.4332 19.4837 36.558C19.4837 36.8493 19.376 37.0791 19.1603 37.2474C18.9447 37.4158 18.6515 37.4999 18.2809 37.4999Z" fill="#414042" />
                                                                    <path d="M21.0269 37.5C20.7206 37.5 20.488 37.4017 20.3291 37.205C20.1702 37.0083 20.0908 36.717 20.0908 36.3312V34.4702H20.8511V36.1667C20.8511 36.6244 21.0156 36.8532 21.3447 36.8532C21.4922 36.8532 21.635 36.8088 21.7731 36.7199C21.9111 36.631 22.0236 36.4958 22.1106 36.3142V34.4702H22.8709V36.5695C22.8709 36.649 22.8851 36.7057 22.9134 36.7397C22.9418 36.7738 22.9881 36.7927 23.0525 36.7965V37.4433C22.9767 37.4584 22.9134 37.4678 22.8624 37.4716C22.8113 37.4754 22.7649 37.4773 22.7234 37.4773C22.5872 37.4773 22.4766 37.4461 22.3915 37.3837C22.3064 37.3213 22.2562 37.2353 22.2411 37.1255L22.2241 36.8872C22.0917 37.0915 21.9215 37.2447 21.7135 37.3468C21.5054 37.4489 21.2766 37.5 21.0269 37.5Z" fill="#414042" />
                                                                    <path d="M25.5374 35.1284C25.3067 35.1322 25.1005 35.1766 24.919 35.2617C24.7374 35.3468 24.6069 35.4745 24.5275 35.6446V37.4432H23.7672V34.4702H24.4651V35.1056C24.518 35.0035 24.5804 34.9118 24.6523 34.8304C24.7241 34.7491 24.8017 34.6782 24.8849 34.6177C24.9681 34.5572 25.0523 34.5108 25.1374 34.4786C25.2225 34.4466 25.3048 34.4304 25.3842 34.4304C25.4258 34.4304 25.457 34.4304 25.4778 34.4304C25.4986 34.4304 25.5184 34.4324 25.5374 34.4361L25.5374 35.1284Z" fill="#414042" />
                                                                    <path d="M26.8767 37.4998C26.7329 37.4998 26.5987 37.4761 26.4739 37.4289C26.349 37.3817 26.2413 37.3154 26.1505 37.2303C26.0597 37.1452 25.9888 37.0459 25.9377 36.9324C25.8866 36.819 25.8611 36.6941 25.8611 36.558C25.8611 36.4181 25.8923 36.2885 25.9547 36.1693C26.0171 36.0501 26.104 35.949 26.2157 35.8658C26.3272 35.7826 26.4606 35.7174 26.6157 35.67C26.7708 35.6228 26.941 35.5991 27.1264 35.5991C27.2587 35.5991 27.3882 35.6105 27.515 35.6332C27.6417 35.6558 27.7542 35.6881 27.8526 35.7296V35.5594C27.8526 35.3628 27.7967 35.2114 27.6852 35.1055C27.5736 34.9996 27.408 34.9466 27.1887 34.9466C27.0298 34.9466 26.8747 34.975 26.7235 35.0317C26.5721 35.0885 26.4171 35.1717 26.2583 35.2814L26.0256 34.7991C26.4076 34.5457 26.82 34.4189 27.2625 34.4189C27.6899 34.4189 28.0218 34.5239 28.2582 34.7338C28.4946 34.9438 28.6129 35.2473 28.6129 35.6445V36.5693C28.6129 36.6487 28.6271 36.7055 28.6554 36.7395C28.6838 36.7736 28.7301 36.7925 28.7944 36.7963V37.4431C28.6658 37.4695 28.5542 37.4828 28.4596 37.4828C28.3159 37.4828 28.2052 37.4506 28.1277 37.3863C28.0502 37.3221 28.0019 37.237 27.9831 37.131L27.9661 36.9664C27.8336 37.1405 27.6729 37.2728 27.4838 37.3636C27.2946 37.4544 27.0924 37.4998 26.8767 37.4998ZM27.0923 36.9438C27.2208 36.9438 27.3429 36.9211 27.4582 36.8757C27.5736 36.8303 27.6634 36.7698 27.7278 36.6941C27.8109 36.6298 27.8526 36.5579 27.8526 36.4785V36.1381C27.7618 36.104 27.6634 36.0766 27.5576 36.0558C27.4517 36.0351 27.3495 36.0246 27.2512 36.0246C27.0545 36.0246 26.8937 36.0691 26.7689 36.1579C26.6441 36.2468 26.5817 36.3594 26.5817 36.4955C26.5817 36.6242 26.6308 36.731 26.7292 36.8161C26.8275 36.9012 26.9485 36.9438 27.0923 36.9438Z" fill="#414042" />
                                                                    <path d="M32.2269 37.4431H31.4666V35.775C31.4666 35.5367 31.4249 35.3627 31.3417 35.253C31.2586 35.1433 31.1432 35.0884 30.9957 35.0884C30.92 35.0884 30.8425 35.1036 30.763 35.1339C30.6836 35.1642 30.6088 35.2067 30.5389 35.2615C30.4689 35.3164 30.4056 35.3816 30.3489 35.4573C30.2921 35.5329 30.2504 35.6161 30.224 35.7069V37.4431H29.4637V34.47H30.1503V35.0204C30.2599 34.8313 30.4188 34.6838 30.6269 34.5778C30.8349 34.472 31.0694 34.4189 31.3304 34.4189C31.5157 34.4189 31.667 34.453 31.7843 34.5211C31.9015 34.5892 31.9923 34.6781 32.0566 34.7877C32.1209 34.8975 32.1653 35.0223 32.19 35.1622C32.2145 35.3022 32.2268 35.444 32.2268 35.5877L32.2269 37.4431Z" fill="#414042" />
                                                                    <path d="M32.8452 35.9568C32.8452 35.7488 32.8812 35.5521 32.953 35.3667C33.0248 35.1814 33.1289 35.0187 33.2651 34.8788C33.4013 34.7389 33.5658 34.6273 33.7587 34.544C33.9516 34.4609 34.1691 34.4192 34.4112 34.4192C34.7364 34.4192 35.0135 34.4892 35.2424 34.6291C35.4712 34.7691 35.6424 34.9525 35.7558 35.1795L35.0126 35.4064C34.9482 35.2968 34.8631 35.2126 34.7573 35.1539C34.6513 35.0954 34.5341 35.066 34.4055 35.066C34.2958 35.066 34.1936 35.0879 34.0991 35.1313C34.0045 35.1748 33.9223 35.2353 33.8523 35.3129C33.7822 35.3904 33.7275 35.4841 33.6877 35.5937C33.648 35.7034 33.6282 35.8245 33.6282 35.9568C33.6282 36.0893 33.649 36.2103 33.6906 36.32C33.7321 36.4297 33.7879 36.5242 33.8579 36.6037C33.9279 36.6831 34.0102 36.7446 34.1048 36.788C34.1993 36.8316 34.2996 36.8533 34.4055 36.8533C34.5417 36.8533 34.6674 36.8192 34.7828 36.7512C34.8981 36.6831 34.9785 36.5999 35.0239 36.5015L35.7672 36.7285C35.6651 36.9554 35.4967 37.1408 35.2622 37.2845C35.0277 37.4283 34.746 37.5001 34.4168 37.5001C34.1747 37.5001 33.9572 37.4585 33.7643 37.3753C33.5715 37.2922 33.4069 37.1796 33.2707 37.0377C33.1345 36.8959 33.0296 36.7313 32.9558 36.5441C32.8821 36.3568 32.8452 36.161 32.8452 35.9568Z" fill="#414042" />
                                                                    <path d="M37.7248 37.4998C37.4865 37.4998 37.2709 37.4591 37.078 37.3778C36.8851 37.2965 36.7206 37.1859 36.5844 37.0459C36.4482 36.906 36.3433 36.7433 36.2695 36.558C36.1957 36.3727 36.1589 36.1779 36.1589 35.9736C36.1589 35.7618 36.1948 35.5622 36.2667 35.375C36.3385 35.1878 36.4425 35.0232 36.5787 34.8814C36.7149 34.7395 36.8803 34.627 37.0752 34.5438C37.2699 34.4606 37.4884 34.4189 37.7304 34.4189C37.9725 34.4189 38.1891 34.4606 38.3801 34.5438C38.5711 34.627 38.7338 34.7386 38.8681 34.8785C39.0023 35.0185 39.1045 35.1812 39.1745 35.3664C39.2444 35.5519 39.2794 35.7447 39.2794 35.9452C39.2794 35.9944 39.2784 36.0416 39.2766 36.087C39.2746 36.1324 39.2699 36.1703 39.2624 36.2005H36.9646C36.9759 36.3178 37.0042 36.4218 37.0497 36.5126C37.095 36.6033 37.1536 36.6809 37.2255 36.7452C37.2973 36.8096 37.3787 36.8587 37.4695 36.8927C37.5603 36.9268 37.6547 36.9438 37.7531 36.9438C37.9044 36.9438 38.0472 36.9069 38.1815 36.8331C38.3158 36.7594 38.4075 36.662 38.4567 36.5409L39.1092 36.7225C38.9994 36.9494 38.8245 37.1358 38.5844 37.2814C38.3441 37.427 38.0576 37.4998 37.7248 37.4998ZM38.4964 35.7069C38.4775 35.4838 38.3952 35.3051 38.2496 35.1707C38.104 35.0365 37.9271 34.9693 37.7191 34.9693C37.617 34.9693 37.5215 34.9873 37.4327 35.0232C37.3437 35.0592 37.2653 35.1093 37.1972 35.1736C37.1291 35.238 37.0732 35.3154 37.0298 35.4062C36.9863 35.497 36.9607 35.5973 36.9532 35.7069L38.4964 35.7069Z" fill="#414042" />
                                                                </svg>
                                                            </span>
                                                            <div>
                                                                <h1 className=' text-black font-normal lg:text-xl text-sm ' >Progressive Insurance</h1>
                                                                <button className=' text-[#946D2D] lg:text-[14px] font-normal bg-[#F0E0C4] py-1 px-2 rounded-[3px] mt-1 ' >
                                                                    Sponsored
                                                                </button>
                                                            </div>

                                                        </div>



                                                    </div>
                                                    <div className=' mt-3  ' >

                                                        <div className="flex items-center space-x-1 mt-2 ">
                                                            <p className=' text-[#4AF850] font-bold lg:text-lg text-[30px]  ' >
                                                                A+
                                                            </p>
                                                            <span className="font-bold text-black lg:text-[16px] text-xs ">4.5</span>
                                                            {/* Full Stars */}
                                                            {[...Array(fullStars)].map((_, i) => (

                                                                <svg key={`full-${i}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8.03247 12.8174L4.21706 15.1158C4.04851 15.2231 3.87229 15.2691 3.68842 15.2537C3.50454 15.2384 3.34365 15.1771 3.20575 15.0699C3.06784 14.9626 2.96058 14.8287 2.88396 14.6681C2.80735 14.5075 2.79203 14.3273 2.838 14.1275L3.84931 9.78344L0.470601 6.86442C0.317371 6.72651 0.221756 6.5693 0.183755 6.39278C0.145754 6.21626 0.157093 6.04403 0.217772 5.87609C0.278451 5.70815 0.370388 5.57024 0.493585 5.46237C0.616781 5.3545 0.785334 5.28554 0.999242 5.25551L5.45822 4.86478L7.18205 0.77355C7.25867 0.589675 7.37757 0.451768 7.53877 0.35983C7.69997 0.267893 7.86453 0.221924 8.03247 0.221924C8.20041 0.221924 8.36498 0.267893 8.52618 0.35983C8.68738 0.451768 8.80628 0.589675 8.8829 0.77355L10.6067 4.86478L15.0657 5.25551C15.2802 5.28616 15.4488 5.35511 15.5714 5.46237C15.6939 5.56963 15.7859 5.70754 15.8472 5.87609C15.9085 6.04464 15.9201 6.21718 15.8821 6.3937C15.8441 6.57022 15.7482 6.72713 15.5943 6.86442L12.2156 9.78344L13.227 14.1275C13.2729 14.3267 13.2576 14.5069 13.181 14.6681C13.1044 14.8293 12.9971 14.9632 12.8592 15.0699C12.7213 15.1765 12.5604 15.2378 12.3765 15.2537C12.1927 15.2697 12.0164 15.2237 11.8479 15.1158L8.03247 12.8174Z" fill="#FEE453" />
                                                                </svg>

                                                            ))}

                                                            {/* Half Star */}
                                                            {halfStars === 1 && (
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M7.96741 12.8174L4.152 15.1158C3.98344 15.2231 3.80723 15.2691 3.62336 15.2537C3.43948 15.2384 3.27859 15.1771 3.14068 15.0699C3.00278 14.9626 2.89552 14.8287 2.8189 14.6681C2.74229 14.5075 2.72696 14.3273 2.77293 14.1275L3.78425 9.78344L0.405537 6.86442C0.252308 6.72651 0.156692 6.5693 0.118692 6.39278C0.0806907 6.21626 0.0920296 6.04403 0.152708 5.87609C0.213387 5.70815 0.305325 5.57024 0.428521 5.46237C0.551718 5.3545 0.72027 5.28554 0.934179 5.25551L5.39316 4.86478L7.11699 0.77355C7.1936 0.589675 7.31251 0.451768 7.47371 0.35983C7.6349 0.267893 7.79947 0.221924 7.96741 0.221924C8.13535 0.221924 8.29992 0.267893 8.46112 0.35983C8.62231 0.451768 8.74122 0.589675 8.81783 0.77355L10.5417 4.86478L15.0006 5.25551C15.2152 5.28616 15.3837 5.35511 15.5063 5.46237C15.6289 5.56963 15.7208 5.70754 15.7821 5.87609C15.8434 6.04464 15.855 6.21718 15.817 6.3937C15.779 6.57022 15.6831 6.72713 15.5293 6.86442L12.1506 9.78344L13.1619 14.1275C13.2079 14.3267 13.1925 14.5069 13.1159 14.6681C13.0393 14.8293 12.932 14.9632 12.7941 15.0699C12.6562 15.1765 12.4953 15.2378 12.3115 15.2537C12.1276 15.2697 11.9514 15.2237 11.7828 15.1158L7.96741 12.8174Z" fill="#BABDC1" />
                                                                </svg>

                                                            )}

                                                            {/* Empty Stars */}
                                                            {[...Array(emptyStars)].map((_, i) => (
                                                                <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="gray" viewBox="0 0 24 24" width="20" height="20">
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                            ))}

                                                            {/* Rating Text */}

                                                            <span className=" text-black font-thin lg:text-[16px] text-xs ml-2 ">(1,450)</span>
                                                        </div>
                                                    </div>
                                                    <div className=' flex flex-row gap-x-5 mt-3 ' >
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
                                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Trust</span>
                                                        </div>
                                                    </div>
                                                    <div className=' flex items-center mt-3 gap-x-3 ' >
                                                        <span>
                                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.85425 19.3673C9.85425 19.3673 3.5 14.0157 3.5 8.75C3.5 6.89348 4.2375 5.11301 5.55025 3.80025C6.86301 2.4875 8.64348 1.75 10.5 1.75C12.3565 1.75 14.137 2.4875 15.4497 3.80025C16.7625 5.11301 17.5 6.89348 17.5 8.75C17.5 14.0157 11.1457 19.3673 11.1457 19.3673C10.7922 19.6928 10.2104 19.6893 9.85425 19.3673ZM10.5 11.8125C10.9022 11.8125 11.3004 11.7333 11.672 11.5794C12.0435 11.4255 12.3811 11.1999 12.6655 10.9155C12.9499 10.6311 13.1755 10.2935 13.3294 9.92197C13.4833 9.55041 13.5625 9.15217 13.5625 8.75C13.5625 8.34783 13.4833 7.94959 13.3294 7.57803C13.1755 7.20647 12.9499 6.86887 12.6655 6.58449C12.3811 6.30011 12.0435 6.07452 11.672 5.92062C11.3004 5.76671 10.9022 5.6875 10.5 5.6875C9.68777 5.6875 8.90882 6.01016 8.33449 6.58449C7.76016 7.15882 7.4375 7.93777 7.4375 8.75C7.4375 9.56223 7.76016 10.3412 8.33449 10.9155C8.90882 11.4898 9.68777 11.8125 10.5 11.8125Z" fill="#697079" />
                                                            </svg>

                                                        </span>
                                                        <h1 className=' font-thin lg:text-[14px] text-xs text-black ' >
                                                            Available in 48 states
                                                        </h1>
                                                    </div>


                                                    <div className='  flex items-center gap-x-3 mt-4 ' >
                                                        <label className="flex items-center gap-2 text-sm">
                                                            <Checkbox
                                                                id={`compare-${item.id}`}
                                                                checked={selected.some(i => i.id === item.id)}
                                                                onCheckedChange={(checked) => handleCompareChange(item, checked as boolean)}
                                                            />
                                                            <span className="cursor-pointer text-[16px] text-[#697079]">
                                                                Compare
                                                            </span>
                                                        </label>

                                                    </div>

                                                    <div>
                                                        <button className=' cursor-pointer bg-[#D09A40] border border-[#D09A40] py-1 w-full rounded-[34px] lg:mt-12 mt-4 text-[#FFFFFF] lg:text-xl text-sm font-normal ' >View Profile</button>
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
            </MaxWidth>
            {openCompareModal && (
                (
                    <div
                        className={`
          fixed px-4 bottom-0 left-0 z-50 w-full  shadow-xl  transition-transform duration-300 ease-in-out
          
        `}
                    >
                        <div className="max-w-[1400px] bg-[#4c545f]  mx-auto  flex justify-between items-center px-9 py-6 rounded-t-[20px]  ">
                            <div className=" flex items-center gap-x-5 " >
                                <span className=" lg:text-[27px] font-bold text-sm text-white " >Comparing {selected.length} </span>
                                <span>


                                </span>
                            </div>
                            <div className="  space-x-6 " >
                                <Link href={"/InsuranceTable"}>
                                    <button className=" text-white bg-[#D09A40] border border-[#D09A40] px-5 py-2 rounded-[26px] cursor-pointer lg:text-xl text-sm " >  Compare Now</button>
                                </Link>
                                <button
                                    onClick={closeModal}
                                    className="text-white  border border-[#D09A40] px-5 py-2 rounded-[26px] cursor-pointer lg:text-xl text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )
            }
        </div>
    )
}

export default ProviderBanner