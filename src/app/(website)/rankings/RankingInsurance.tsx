"use client"
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
// auto 
type Option = "auto" | "health" | "life" | "home";
const options: Option[] = ["auto", "health", "life", "home"];
// state 
type StateType = {
    name: string
}



import { Checkbox } from '@/components/ui/checkbox';
import TopThree from './TopThree';
import Link from 'next/link';



const RankingInsurance = () => {
    // auto 

    const [selected, setSelected] = useState<Option>("auto");
    const [open, setOpen] = useState(false);


    const autoDropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (autoDropdownRef.current && !autoDropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);







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

    const [score, setScore] = useState(4);




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

    type Insurer = {
        id: number;
        rank: number;
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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Show 4 cards per page

    // Pagination logic
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = insuranceData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(insuranceData.length / itemsPerPage);




    const [selectedInsurers, setselectedInsurers] = React.useState<Insurer[]>([]);
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
        setselectedInsurers(newSelected);
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
                setselectedInsurers(parsed);
                if (parsed.length > 0) setOpenCompareModal(true);
            } catch (error) {
                console.error("Failed to parse localStorage:", error);
            }
        }
    }, []);

    const closeModal = () => {
        setOpenCompareModal(false);  // modal close
        setselectedInsurers([]);             // checkbox uncheck, state empty
        localStorage.removeItem("selectedInsurers"); // LocalStorage clear
    };









    return (
        <>
            <div className=' pt-3 lg:pt-5 pb-10 lg:pb-20 ' >
                <div className=' max-w-7xl mx-auto lg:px-4 ' >
                    <div className=' flex flex-wrap gap-y-7 px-3 gap-x-8 ' >
                        {/* auto  */}
                        <div ref={autoDropdownRef} className="relative w-36">
                            {/* Dropdown button */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="w-full flex justify-between items-center px-4 py-2 border border-[#697079] rounded-lg bg-white shadow-sm text-gray-700 hover:border-gray-400 focus:outline-none"
                            >
                                <span className="capitalize">{selected}</span>
                                <ChevronDown
                                    className={`h-5 w-5 cursor-pointer text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {/* Dropdown menu */}
                            {open && (
                                <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    {options.map((option) => (
                                        <li
                                            key={option}
                                            onClick={() => {
                                                setSelected(option);
                                                setOpen(false);
                                            }}
                                            className={`px-4 py-2 cursor-pointer capitalize textColor font-normal lg:text-xl text-[16px] hover:bg-gray-100 ${selected === option ? "bg-gray-100 font-normal" : ""
                                                }`}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* state  */}

                        <div ref={stateDropdownRef} className="relative w-36">
                            {/* Dropdown button */}
                            <button
                                onClick={() => setOpenState(!openState)}
                                className="w-full flex justify-between items-center px-4 py-2 border border-[#697079] rounded-lg bg-white shadow-sm text-gray-700 hover:border-gray-400 focus:outline-none"
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


                        {/* rating  */}


                        <div className="flex items-center gap-4  rounded-lg px-4 py-2  border border-[#697079]  w-64  ">
                            {/* Label */}
                            <span className="text-gray-600 font-normal">Score: {score}+</span>

                            {/* Slider */}
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={score}
                                onChange={(e) => setScore(Number(e.target.value))}
                                className="w-32 h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-yellow-600"
                            />
                        </div>


                        {/* price  */}


                        <div ref={dropdownRef} className="relative w-36">
                            {/* Dropdown button */}
                            <button
                                onClick={() => setOpenPrice(!openPrice)}
                                className="w-full flex justify-between items-center px-4 py-2 border border-[#697079] rounded-lg bg-white  textColor  focus:outline-none"
                            >
                                <span>{selectedPrice !== null ? `$${selectedPrice}` : "Any Price"}</span>
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

                        {/* reset btn  */}

                        <button className=' font-normal lg:text-xl text-[15px] textColor cursor-pointer  ' >
                            Reset
                        </button>
                    </div>


                    {/* top insurance  */}

                    <TopThree></TopThree>





                    <div className="space-y-4 overflow-x-auto ">
                        {currentItems.map((item, i) => (
                            <div
                                key={item.rank}
                                className="flex flex-wrap items-center justify-center lg:justify-between bg-white border border-gray-300 rounded-xl p-4 shadow-[#00000033]"
                            >
                                {/* Left Section: Logo + Company Info */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-center gap-y-5 ">
                                    <div className=' flex items-center justify-center ' >
                                        <div>
                                            <span className=' text-[#D09A40] lg:text-4xl text-lg font-bold ' >#{i + 1} </span>
                                        </div>
                                        <div className="    ">
                                            {/* <Image
                                        src="https://www.example.com/logo.png"
                                        alt="Company Logo"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    /> */}

                                            <span className=' block ml-9  ' >
                                                <svg width="62" height="65" viewBox="0 0 62 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_52_1682)">
                                                        <rect width="62" height="64.7353" rx="5.47059" fill="#FAF5EC" />
                                                        <path d="M47.1211 35.1501C47.1211 36.8209 46.8629 38.4288 46.3898 39.9412H29.5818L43.9444 25.5786C45.9407 28.2476 47.1211 31.561 47.1211 35.1501Z" fill="#F79F1E" />
                                                        <path d="M20.2108 39.3033C20.2155 38.9298 20.0983 38.7569 19.7434 38.5495C19.4123 38.3561 19.0805 37.8631 19.0626 37.4871C18.988 35.9224 19.013 34.3517 19.0403 32.7839C19.0539 32.0005 19.4885 31.6114 20.2935 31.601C21.4515 31.586 22.6102 31.5791 23.7675 31.6101C24.0681 31.6182 24.3646 31.7797 24.663 31.8708C24.6619 31.9461 24.6606 32.0214 24.6594 32.0967C23.3317 32.5584 22.9583 33.5419 23.0051 34.8366C23.06 36.3546 22.9811 37.8776 23.0396 39.3953C23.0464 39.5707 23.0692 39.757 23.1077 39.9412H23.9228C23.8788 39.7429 23.8638 39.5006 23.8634 39.1897C23.8615 37.5987 23.8571 36.0076 23.8635 34.4167C23.8677 33.3584 24.306 32.9142 25.3489 32.9078C26.6023 32.9001 27.856 32.8974 29.1094 32.9076C30.115 32.9157 30.5548 33.3595 30.5609 34.3782C30.57 35.9044 30.5581 37.4308 30.5661 38.957L31.4069 38.1162C31.4068 37.0182 31.3816 35.9193 31.4211 34.8226C31.4678 33.5258 31.0794 32.5508 29.5443 32.017C30.0049 31.7967 30.2725 31.5643 30.5475 31.5551C31.7759 31.5144 33.0065 31.5209 34.2358 31.5435C34.9642 31.5569 35.3569 31.9369 35.3692 32.6717C35.3773 33.1586 35.3851 33.6457 35.3903 34.1328L43.9444 25.5787C41.0259 21.6728 36.3671 19.1471 31.1181 19.1471C24.8573 19.1471 19.4395 22.7449 16.8103 27.9837C15.7279 30.1402 15.1151 32.573 15.1151 35.1501C15.1151 36.821 15.3733 38.4288 15.8485 39.9412H20.2079C20.209 39.7286 20.2081 39.5159 20.2108 39.3033ZM32.4328 26.7318C33.6245 26.7427 34.5808 27.7094 34.5784 28.9009C34.5759 30.0884 33.6168 31.0662 32.4357 31.0851C31.2143 31.1047 30.23 30.1311 30.23 28.9033C30.23 27.6609 31.184 26.7204 32.4328 26.7318ZM27.2976 27.5223C28.6404 27.5585 29.6908 28.6768 29.6576 30.035C29.624 31.41 28.4711 32.4786 27.0898 32.4148C25.739 32.3525 24.7227 31.2353 24.7702 29.8651C24.8171 28.519 25.9319 27.4856 27.2976 27.5223ZM22.0598 26.8055C23.2581 26.8198 24.1971 27.7734 24.196 28.9746C24.1949 30.2202 23.2446 31.1571 21.9942 31.1455C20.7949 31.1344 19.8535 30.184 19.8505 28.9815C19.8475 27.7596 20.8312 26.7908 22.0598 26.8055Z" fill="#EB001B" />
                                                        <path d="M14.5883 41.4013V40.4839H15.5125V41.4013H14.5883ZM14.5883 45.5191V41.9048H15.5125V45.5191H14.5883Z" fill="#414042" />
                                                        <path d="M19.8786 45.5192H18.9543V43.4913C18.9543 43.2016 18.9037 42.9901 18.8026 42.8567C18.7014 42.7234 18.5612 42.6567 18.3818 42.6567C18.2898 42.6567 18.1956 42.6751 18.099 42.7119C18.0025 42.7487 17.9116 42.8005 17.8266 42.8671C17.7415 42.9338 17.6645 43.0131 17.5955 43.105C17.5266 43.197 17.4759 43.2982 17.4438 43.4085V45.5192H16.5195V41.9048H17.3541V42.5739C17.4874 42.3441 17.6805 42.1647 17.9335 42.0359C18.1863 41.9072 18.4715 41.8428 18.7888 41.8428C19.014 41.8428 19.198 41.8842 19.3406 41.9669C19.4831 42.0497 19.5934 42.1578 19.6717 42.2911C19.7498 42.4245 19.8038 42.5763 19.8338 42.7464C19.8636 42.9165 19.8786 43.089 19.8786 43.2637V45.5192Z" fill="#414042" />
                                                        <path d="M22.2236 45.588C21.9201 45.588 21.6235 45.5398 21.3338 45.4432C21.0441 45.3466 20.7958 45.2086 20.5889 45.0293L20.9337 44.4499C21.1545 44.6063 21.3694 44.7247 21.5787 44.8051C21.7879 44.8856 21.9959 44.9258 22.2029 44.9258C22.3868 44.9258 22.5316 44.8914 22.6374 44.8224C22.7432 44.7534 22.7961 44.6546 22.7961 44.5258C22.7961 44.3971 22.734 44.3028 22.6099 44.243C22.4857 44.1833 22.2833 44.1143 22.0029 44.036C21.7684 43.9717 21.5684 43.9096 21.4028 43.8498C21.2373 43.7901 21.1039 43.7222 21.0028 43.6463C20.9016 43.5705 20.828 43.4832 20.782 43.3842C20.736 43.2854 20.7131 43.167 20.7131 43.029C20.7131 42.8451 20.7486 42.6796 20.82 42.5324C20.8912 42.3853 20.9912 42.26 21.12 42.1565C21.2487 42.053 21.3994 41.9737 21.5718 41.9185C21.7442 41.8634 21.9315 41.8358 22.1339 41.8358C22.4052 41.8358 22.6592 41.8748 22.8961 41.953C23.1329 42.0313 23.3501 42.1577 23.5479 42.3324L23.1755 42.8911C22.9915 42.7531 22.8134 42.6521 22.6409 42.5876C22.4684 42.5233 22.2971 42.491 22.127 42.491C21.9706 42.491 21.8396 42.5233 21.7339 42.5876C21.628 42.6521 21.5752 42.7555 21.5752 42.898C21.5752 42.9625 21.5878 43.0153 21.6132 43.0566C21.6384 43.098 21.6787 43.1349 21.7339 43.167C21.7891 43.1992 21.8615 43.2302 21.9512 43.2601C22.0408 43.29 22.1523 43.3211 22.2857 43.3532C22.5341 43.4177 22.7467 43.482 22.9237 43.5464C23.1007 43.6108 23.2456 43.6843 23.3583 43.767C23.4709 43.8498 23.5537 43.9453 23.6066 44.0533C23.6594 44.1614 23.6859 44.2913 23.6859 44.443C23.6859 44.7972 23.5549 45.0765 23.2928 45.2811C23.0306 45.4858 22.6742 45.588 22.2236 45.588Z" fill="#414042" />
                                                        <path d="M25.562 45.5881C25.1895 45.5881 24.9068 45.4686 24.7136 45.2294C24.5205 44.9904 24.424 44.6363 24.424 44.1672V41.9048H25.3482V43.9672C25.3482 44.5236 25.5483 44.8018 25.9483 44.8018C26.1276 44.8018 26.3012 44.7478 26.4691 44.6397C26.6369 44.5317 26.7736 44.3673 26.8794 44.1466V41.9048H27.8037V44.457C27.8037 44.5535 27.8209 44.6225 27.8554 44.6639C27.8899 44.7052 27.9462 44.7283 28.0244 44.7328V45.5192C27.9324 45.5375 27.8554 45.549 27.7933 45.5536C27.7313 45.5582 27.6749 45.5605 27.6243 45.5605C27.4588 45.5605 27.3243 45.5226 27.2208 45.4467C27.1174 45.3708 27.0564 45.2663 27.0381 45.1329L27.0174 44.8432C26.8564 45.0915 26.6495 45.2777 26.3966 45.4019C26.1437 45.526 25.8655 45.5881 25.562 45.5881Z" fill="#414042" />
                                                        <path d="M31.0452 42.7049C30.7647 42.7096 30.5141 42.7635 30.2934 42.867C30.0727 42.9705 29.914 43.1257 29.8174 43.3326V45.5191H28.8932V41.9048H29.7416V42.6773C29.8059 42.5531 29.8818 42.4417 29.9692 42.3427C30.0565 42.2439 30.1508 42.1577 30.252 42.0841C30.3531 42.0105 30.4555 41.9542 30.5589 41.9151C30.6624 41.8761 30.7624 41.8564 30.859 41.8564C30.9095 41.8564 30.9474 41.8564 30.9728 41.8564C30.998 41.8564 31.0221 41.8588 31.0452 41.8633L31.0452 42.7049Z" fill="#414042" />
                                                        <path d="M32.6735 45.5881C32.4987 45.5881 32.3356 45.5594 32.1838 45.5019C32.032 45.4445 31.901 45.364 31.7906 45.2605C31.6803 45.1571 31.594 45.0363 31.532 44.8984C31.4699 44.7604 31.4388 44.6087 31.4388 44.4432C31.4388 44.2731 31.4768 44.1155 31.5526 43.9707C31.6285 43.8258 31.7342 43.7028 31.87 43.6017C32.0055 43.5006 32.1676 43.4212 32.3563 43.3637C32.5447 43.3062 32.7517 43.2775 32.977 43.2775C33.1379 43.2775 33.2953 43.2913 33.4495 43.3189C33.6035 43.3464 33.7403 43.3856 33.8599 43.4362V43.2292C33.8599 42.9902 33.792 42.8062 33.6564 42.6774C33.5207 42.5487 33.3194 42.4843 33.0529 42.4843C32.8597 42.4843 32.6711 42.5187 32.4872 42.5877C32.3032 42.6567 32.1148 42.7579 31.9217 42.8912L31.6389 42.3049C32.1033 41.9969 32.6046 41.8428 33.1426 41.8428C33.6621 41.8428 34.0656 41.9704 34.353 42.2256C34.6403 42.4808 34.7841 42.8498 34.7841 43.3326V44.457C34.7841 44.5535 34.8014 44.6225 34.8359 44.6639C34.8703 44.7052 34.9267 44.7283 35.0048 44.7328V45.5192C34.8485 45.5513 34.7128 45.5674 34.5979 45.5674C34.4231 45.5674 34.2886 45.5283 34.1944 45.4502C34.1001 45.3721 34.0415 45.2686 34.0185 45.1398L33.9978 44.9397C33.8368 45.1513 33.6415 45.3122 33.4115 45.4226C33.1816 45.5329 32.9357 45.5881 32.6735 45.5881ZM32.9357 44.9122C33.0919 44.9122 33.2402 44.8846 33.3805 44.8294C33.5207 44.7742 33.6299 44.7007 33.7081 44.6087C33.8093 44.5305 33.8599 44.4431 33.8599 44.3466V43.9327C33.7495 43.8913 33.6299 43.858 33.5013 43.8327C33.3725 43.8075 33.2483 43.7948 33.1288 43.7948C32.8896 43.7948 32.6942 43.8488 32.5425 43.9568C32.3907 44.0649 32.3149 44.2017 32.3149 44.3672C32.3149 44.5236 32.3745 44.6535 32.4942 44.7569C32.6137 44.8604 32.7608 44.9122 32.9357 44.9122Z" fill="#414042" />
                                                        <path d="M39.1776 45.5192H38.2533V43.4913C38.2533 43.2016 38.2027 42.9901 38.1015 42.8567C38.0004 42.7234 37.8602 42.6567 37.6808 42.6567C37.5888 42.6567 37.4946 42.6751 37.398 42.7119C37.3014 42.7487 37.2106 42.8005 37.1256 42.8671C37.0405 42.9338 36.9635 43.0131 36.8945 43.105C36.8255 43.197 36.7749 43.2982 36.7427 43.4085V45.5192H35.8185V41.9048H36.6531V42.5739C36.7864 42.3441 36.9795 42.1647 37.2325 42.0359C37.4853 41.9072 37.7705 41.8428 38.0877 41.8428C38.313 41.8428 38.497 41.8842 38.6395 41.9669C38.782 42.0497 38.8924 42.1578 38.9706 42.2911C39.0488 42.4245 39.1028 42.5763 39.1327 42.7464C39.1626 42.9165 39.1775 43.089 39.1775 43.2637L39.1776 45.5192Z" fill="#414042" />
                                                        <path d="M39.9292 43.712C39.9292 43.4591 39.9729 43.22 40.0603 42.9946C40.1475 42.7694 40.2741 42.5716 40.4397 42.4015C40.6052 42.2314 40.8052 42.0957 41.0398 41.9945C41.2742 41.8934 41.5386 41.8428 41.8329 41.8428C42.2283 41.8428 42.5652 41.9279 42.8434 42.098C43.1216 42.2681 43.3297 42.4911 43.4676 42.767L42.5641 43.043C42.4858 42.9096 42.3823 42.8074 42.2537 42.736C42.1248 42.6648 41.9823 42.6291 41.826 42.6291C41.6926 42.6291 41.5685 42.6557 41.4535 42.7085C41.3385 42.7614 41.2385 42.835 41.1535 42.9292C41.0683 43.0235 41.0017 43.1373 40.9534 43.2706C40.9052 43.404 40.881 43.5512 40.881 43.7121C40.881 43.8731 40.9063 44.0202 40.9569 44.1535C41.0074 44.287 41.0753 44.4018 41.1604 44.4984C41.2454 44.5949 41.3454 44.6697 41.4604 44.7226C41.5753 44.7755 41.6972 44.8019 41.8261 44.8019C41.9916 44.8019 42.1444 44.7605 42.2847 44.6777C42.4249 44.5949 42.5227 44.4939 42.5778 44.3742L43.4814 44.6501C43.3573 44.926 43.1526 45.1514 42.8675 45.3261C42.5824 45.5009 42.2399 45.5882 41.8398 45.5882C41.5454 45.5882 41.2811 45.5376 41.0466 45.4365C40.8121 45.3354 40.612 45.1985 40.4465 45.0261C40.2809 44.8537 40.1534 44.6536 40.0636 44.426C39.9741 44.1982 39.9292 43.9603 39.9292 43.712Z" fill="#414042" />
                                                        <path d="M45.8615 45.5881C45.5718 45.5881 45.3097 45.5387 45.0752 45.4398C44.8406 45.341 44.6406 45.2065 44.4751 45.0363C44.3095 44.8663 44.182 44.6685 44.0923 44.4432C44.0025 44.2179 43.9578 43.9811 43.9578 43.7327C43.9578 43.4752 44.0014 43.2326 44.0888 43.005C44.1761 42.7774 44.3026 42.5774 44.4681 42.4049C44.6337 42.2325 44.8348 42.0957 45.0717 41.9945C45.3085 41.8934 45.574 41.8428 45.8683 41.8428C46.1626 41.8428 46.4258 41.8934 46.6581 41.9945C46.8903 42.0957 47.088 42.2314 47.2513 42.4015C47.4145 42.5716 47.5387 42.7694 47.6238 42.9946C47.7088 43.22 47.7513 43.4545 47.7513 43.6982C47.7513 43.758 47.7502 43.8155 47.7479 43.8707C47.7456 43.9258 47.7398 43.9719 47.7307 44.0086H44.9372C44.951 44.1512 44.9854 44.2776 45.0407 44.388C45.0958 44.4983 45.1671 44.5926 45.2545 44.6708C45.3417 44.749 45.4407 44.8087 45.5511 44.8501C45.6615 44.8915 45.7762 44.9122 45.8959 44.9122C46.0798 44.9122 46.2534 44.8674 46.4167 44.7777C46.5799 44.688 46.6914 44.5697 46.7512 44.4224L47.5444 44.6432C47.411 44.9191 47.1984 45.1456 46.9064 45.3226C46.6143 45.4997 46.2661 45.5881 45.8615 45.5881ZM46.7995 43.4085C46.7765 43.1373 46.6764 42.92 46.4995 42.7567C46.3224 42.5935 46.1074 42.5119 45.8545 42.5119C45.7304 42.5119 45.6142 42.5337 45.5063 42.5774C45.3982 42.6212 45.3028 42.6821 45.22 42.7602C45.1372 42.8385 45.0693 42.9326 45.0165 43.043C44.9636 43.1533 44.9326 43.2752 44.9234 43.4086L46.7995 43.4085Z" fill="#414042" />
                                                    </g>
                                                    <rect x="0.455882" y="0.455882" width="61.0882" height="63.8235" rx="5.01471" stroke="#E9D1A7" strokeWidth="0.911765" />
                                                    <defs>
                                                        <clipPath id="clip0_52_1682">
                                                            <rect width="62" height="64.7353" rx="5.47059" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>

                                        </div>

                                        <div className=' ml-10 ' >
                                            <p className="font-normal lg:text-xl text-sm text-black     ">{` ${item.company}`}</p>
                                            <div className=' flex items-center gap-x-3   ' >
                                                <p className=' lg:text-[28px] text-sm text-[#4AF850] font-bold ' >A+</p>
                                                <span>
                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.7108 19.5884L6.93171 23.0698C6.67641 23.2323 6.4095 23.3019 6.13099 23.2787C5.85248 23.2555 5.60878 23.1627 5.3999 23.0002C5.19101 22.8377 5.02855 22.6349 4.9125 22.3917C4.79645 22.1484 4.77324 21.8755 4.84287 21.5728L6.37469 14.993L1.25703 10.5716C1.02494 10.3627 0.880114 10.1246 0.822555 9.85723C0.764996 9.58986 0.782171 9.32899 0.87408 9.07461C0.965989 8.82024 1.10524 8.61135 1.29185 8.44796C1.47845 8.28457 1.73375 8.18013 2.05775 8.13464L8.81166 7.5428L11.4227 1.34591C11.5388 1.0674 11.7189 0.858515 11.963 0.71926C12.2072 0.580004 12.4565 0.510376 12.7108 0.510376C12.9652 0.510376 13.2145 0.580004 13.4586 0.71926C13.7028 0.858515 13.8829 1.0674 13.9989 1.34591L16.61 7.5428L23.3639 8.13464C23.6888 8.18105 23.9441 8.2855 24.1298 8.44796C24.3155 8.61043 24.4547 8.81931 24.5476 9.07461C24.6404 9.32992 24.6581 9.59125 24.6005 9.85862C24.5429 10.126 24.3976 10.3637 24.1646 10.5716L19.047 14.993L20.5788 21.5728C20.6484 21.8745 20.6252 22.1475 20.5092 22.3917C20.3931 22.6358 20.2306 22.8387 20.0218 23.0002C19.8129 23.1617 19.5692 23.2546 19.2907 23.2787C19.0122 23.3028 18.7453 23.2332 18.4899 23.0698L12.7108 19.5884Z" fill="#FFED66" />
                                                    </svg>

                                                </span>
                                                <div className=' flex flex-col mt-2 ' >
                                                    <span className=" lg:text-lg text-xs font-bold ">{item.overall}</span>
                                                    <span className="  text-sm font-thin  ">Overall</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className=' flex items-center lg:gap-x-4  ' >

                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-12 ">
                                            <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item.claim}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Claim</span>
                                        </div>
                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-8 ">
                                            <span className="px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item.service}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Service</span>
                                        </div>
                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-8 ">
                                            <span className="px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item.price}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Price</span>
                                        </div>
                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-8">
                                            <span className="px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl">{item.cover}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Cover</span>
                                        </div>
                                        <div className="flex flex-col space-y-1 ml-4 lg:ml-8">
                                            <span className=" px-5 py-2 bg-[#E9EAEB] rounded-[9px] font-normal text-sm lg:text-xl ">{item.digital}</span>
                                            <span className="text-center lg:text-xl text-sm font-thin text-black ">Trust</span>
                                        </div>
                                    </div>


                                    <div className=' flex items-center justify-center  ' >
                                        <div>
                                            <p className=" text-[#529F22] font-bold lg:text-2xl text-[15px] ml-8 ">{item.priceValue}</p>
                                        </div>
                                        <div className=' ml-5 ' >
                                            <button className="px-2.5 py-2 bg-[#D09A40] text-white rounded-[20px] w-full cursor-pointer ">
                                                View Profile
                                            </button>
                                        </div>
                                        <div className=' ml-7 flex items-center gap-x-3  ' >
                                            <label className="flex items-center gap-2 text-sm">
                                                <Checkbox
                                                    id={`compare-${item.id}`}
                                                    checked={selectedInsurers.some(i => i.id === item.id)}
                                                    onCheckedChange={(checked) => handleCompareChange(item, checked as boolean)}
                                                />
                                                <span className="cursor-pointer text-[16px] text-[#697079]">
                                                    Compare
                                                </span>
                                            </label>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        ))}
                    </div>


                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-3 mt-7 lg:mt-16">
                        <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-[#D09A40] text-white" : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>













                </div>

            </div>
            {openCompareModal && (
                (
                    <div
                        className={`
          fixed px-4 bottom-0 left-0 z-50 w-full  shadow-xl  transition-transform duration-300 ease-in-out
          
        `}
                    >
                        <div className="max-w-[1400px] bg-[#4c545f]  mx-auto  flex justify-between items-center px-9 py-6 rounded-t-[20px]  ">
                            <div className=" flex items-center gap-x-5 " >
                                <span className=" lg:text-[27px] font-bold text-sm text-white " >Comparing {selectedInsurers.length} </span>
                                <span>


                                </span>
                            </div>
                            <div className="  space-x-6 " >
                                <Link href={"/InsuranceTable"} ><button className=" text-white bg-[#D09A40] border border-[#D09A40] px-5 py-2 rounded-[26px] cursor-pointer lg:text-xl text-sm " >
                                    Compare
                                </button></Link>
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
        </>
    )
}

export default RankingInsurance