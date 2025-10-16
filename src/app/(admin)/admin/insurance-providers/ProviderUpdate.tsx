"use client"

import { useAllStateQuery, useInsuranceUpdateMutation, useSingleProviderQuery } from "@/app/api/admin/insuranceApi";
import { useAllPolicyQuery } from "@/app/api/admin/policyApi";
import { InsuranceProvider, Policy, State } from "@/utility/types/admin/insurance-provider/providerType";
import { AllPolicyApiResponse } from "@/utility/types/admin/policy/policyType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { Editor } from "primereact/editor";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";


type PolicyViewProps = {
    updateModal: boolean;
    setUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
    providerSlug: string | undefined;
};

const ProviderUpdate: React.FC<PolicyViewProps> = ({
    updateModal,
    setUpdateModal,
    providerSlug
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState(false);

    // Open animation
    useEffect(() => {
        if (updateModal) {
            const timer = setTimeout(() => setShowModal(true), 50);
            return () => clearTimeout(timer);
        }
    }, [updateModal]);

    // Close modal
    const handleClose = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => setUpdateModal(false), 500);
    }, [setUpdateModal]);

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

        if (updateModal) {
            document.addEventListener("keydown", handleKeyDown);
            // Focus first button
            setTimeout(() => firstFocusableRef.current?.focus(), 100);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [updateModal, handleClose]);


    const { data } = useSingleProviderQuery(providerSlug)

    console.log(data?.data)

    const insuranceProvider: InsuranceProvider = data?.data







    const [logo, setLogo] = useState<File | null>(null);



    // Policy Categories




    const [selectedStates, setSelectedStates] = useState<State[]>([]);

    const { data: stateData } = useAllStateQuery([]);
    const allStates: State[] = stateData?.data || [];

    const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        const selectedState = allStates.find((s) => s.id === selectedId);

        if (selectedState && !selectedStates.some((s) => s.id === selectedState.id)) {
            setSelectedStates([...selectedStates, selectedState]);
        }

        e.target.value = ""; // reset dropdown
    };

    const removeState = (id: number) => {
        setSelectedStates(selectedStates.filter((s) => s.id !== id));
    };










    const [preview, setPreview] = useState<string | null>(null);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogo(file);
            setPreview(URL.createObjectURL(file)); // create preview
        }
    };





    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [price, setPrice] = useState("");
    const [pros, setPros] = useState<string[]>([""]);
    const [cons, setCons] = useState<string[]>([""]);
    const [title, setTitle] = useState("");



    const { data: allPolicy } = useAllPolicyQuery({});

    const policyData: AllPolicyApiResponse[] = allPolicy?.data || [];

    const [policies, setPolicies] = useState<number[]>([]);





    useEffect(() => {
        if (insuranceProvider) {
            setName(insuranceProvider.name || "");
            setAbout(insuranceProvider.about || "");
            setPrice(insuranceProvider.price || "");

            // Arrays
            setPros(insuranceProvider.pros || [""]);
            setCons(insuranceProvider.cons || [""]);
            setSelectedStates(insuranceProvider.states || []);

            // Default Policies
            const defaultPolicyIds = insuranceProvider.policies?.map((p: Policy) => p.id) || [];
            setPolicies(defaultPolicyIds);

            // ✅ Set Existing Image URL for Preview
            setPreview(insuranceProvider.logo_url || null);
        }
    }, [insuranceProvider]);


    const [insuranceUpdate, { isLoading }] = useInsuranceUpdateMutation();


    const slug = providerSlug;


    const handleSubmit = async () => {
        const formData = new FormData();


        formData.append("name", name);
        formData.append("about", about);
        formData.append("price", price);
        formData.append("title", title);
        if (logo) {
            formData.append("logo_url", logo);
        }

        // Send arrays with index
        pros.forEach((item, index) => {
            formData.append(`pros[${index}]`, item);
        });

        cons.forEach((item, index) => {
            formData.append(`cons[${index}]`, item);
        });

        selectedStates.forEach((item, index) => {
            console.log(item)
            formData.append(`states[${index}]`, item.id.toString());
        });

        // 3. FormData append
        policies.forEach((id, index) => {
            formData.append(`policies[${index}]`, id.toString());
        });

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const res = await insuranceUpdate({ slug, formData }).unwrap();
            if (res) {
                setShowModal(false);
                setTimeout(() => setUpdateModal(false), 500);
                toast.success(res?.message)
            }

        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message =
                (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);

        }
    };




    // const handleProviderCancel = () => {
    //     setAddModal(false)
    // }



    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-50   bg-opacity-50 transition-opacity duration-500 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className={`fixed z-50 top-0 h-[95vh] overflow-y-auto left-1/2 transform -translate-x-1/2 max-w-3xl w-full mx-4 bg-white shadow-lg rounded-lg pt-12 pb-6 px-12 transition-all duration-500 ease-out
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


                <div>


                    <h2 className=" lg:text-4xl text-xl font-normal mb-6 ">Add New Provider</h2>
                    <form className="  " >
                        {/* Provider Name */}
                        <div className="mb-4">
                            <label className="block  text-lg font-normal text-[#000000] mb-3 ">Provider Name</label>
                            <input
                                type="text"
                                className="w-full p-3 mt-2 border border-[#989DA3] rounded-md focus:outline-none focus:ring-0"
                                placeholder="Enter Provider Name"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}

                                required
                            />
                        </div>

                        <div className=" flex justify-between gap-x-6  " >
                            <div className="mb-4">
                                <label className="block text-lg font-normal text-[#000000] mb-3">Logo</label>
                                <div className="mt-2 w-[332px] h-[150px] border border-dotted flex items-center justify-center relative">
                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        id="logoUpload"
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/gif"
                                        onChange={handleLogoChange}
                                    />

                                    {/* Custom Upload Button */}
                                    <label
                                        htmlFor="logoUpload"
                                        className="cursor-pointer flex flex-col items-center justify-center"
                                    >
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M36.6667 19.9999C36.6667 27.8566 36.6667 31.7849 34.225 34.2249C31.7867 36.6666 27.8567 36.6666 20 36.6666C12.1434 36.6666 8.21504 36.6666 5.77337 34.2249C3.33337 31.7866 3.33337 27.8566 3.33337 19.9999C3.33337 12.1433 3.33337 8.21492 5.77337 5.77325C8.21671 3.33325 12.1434 3.33325 20 3.33325" stroke="#989DA3" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M3.33337 20.8333L6.25337 18.2783C6.98527 17.6384 7.93295 17.3005 8.90458 17.333C9.8762 17.3655 10.7992 17.7659 11.4867 18.4533L18.6367 25.6033C19.1916 26.158 19.9243 26.4992 20.706 26.5669C21.4876 26.6346 22.2681 26.4244 22.91 25.9733L23.4084 25.6233C24.3344 24.9729 25.4536 24.6559 26.5831 24.724C27.7126 24.7921 28.7856 25.2413 29.6267 25.9983L35 30.8333M25 9.16659H30.8334M30.8334 9.16659H36.6667M30.8334 9.16659V14.9999M30.8334 9.16659V3.33325" stroke="#989DA3" strokeWidth="2" strokeLinecap="round" />
                                        </svg>

                                        <span className=" text-[16px] font-normal text-[#677BFF] mt-1.5 flex flex-row ">Upload a fill <p className=" font-thin text-black " >or drag and drop</p> </span>
                                        <h1 className="text-xs font-thin" >PNG,JPG,GIF up to 10 MB</h1>
                                    </label>
                                </div>

                                {/* Image Preview */}
                                {preview && (
                                    <div className="mt-3">
                                        <Image
                                            src={preview}
                                            width={100}
                                            height={100}
                                            alt="Logo Preview"
                                            className="object-contain border rounded-md w-24 h-24"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Select States */}
                            <div className="mb-4 flex-1 w-full">
                                <label className="block text-lg font-normal text-[#000000] mb-3">
                                    States
                                </label>

                                {/* Selected states */}
                                {selectedStates.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3 border border-[#989DA3] rounded-[5px] py-2 px-2">
                                        {selectedStates.map((state) => (
                                            <span
                                                key={state.id}
                                                className="px-3 py-1 bg-[#D09A40] text-white rounded-full text-sm flex items-center"
                                            >
                                                <p>{state.name}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => removeState(state.id)}
                                                    className="ml-2 text-white cursor-pointer"
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Dropdown */}
                                <select
                                    onChange={handleStateSelect}
                                    className="w-full p-3 mt-2 border border-[#989DA3] rounded-md focus:outline-none focus:ring-0 cursor-pointer"
                                >
                                    <option value="">Select a state</option>
                                    {allStates.map((state) => (
                                        <option key={state.id} value={state.id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Policy Categories */}
                        <div className="mt-4">
                            <label className="block text-lg font-normal text-[#000000] mb-4">
                                Policy Categories
                            </label>

                            <div className="flex flex-wrap gap-4">
                                {policyData?.map((item) => {
                                    const isChecked = policies.includes(item.id);

                                    return (
                                        <div key={item.id}>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setPolicies([...policies, item.id]);
                                                        } else {
                                                            setPolicies(policies.filter((p) => p !== item.id));
                                                        }
                                                    }}
                                                    className="form-checkbox h-4 w-4 text-blue-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{item.name}</span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/*  title */}
                        <div className="mb-4 mt-6 ">
                            <label className="block  text-lg font-normal text-[#000000] mb-3 ">Title</label>
                            <input
                                type="text"
                                className="w-full p-3 mt-2 border border-[#989DA3] rounded-md focus:outline-none focus:ring-0"
                                // placeholder="Enter Provider Name"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                                required
                            />
                        </div>

                        {/* About Provider */}
                        <div className=" mt-6 ">
                            <label className="block  text-lg font-normal text-[#000000] mb-3 ">About Provider</label>
                            <Editor
                                value={about}
                                onTextChange={(e) => setAbout(e.htmlValue || "")}
                                style={{ height: "400px" }}
                                placeholder="Write about yourself..."
                            />
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                <span>{about.length}/1000</span>
                                <span>{about.length > 0 ? `${1000 - about.length}` : '1000'} characters left</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mt-5">
                            <label className="block text-lg font-normal text-[#000000] mb-3">
                                Price
                            </label>
                            <input
                                type="number"
                                min="0"
                                className="w-full p-3 mt-2 border border-[#989DA3] rounded-md focus:outline-none focus:ring-0"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>



                        <div className=" flex flex-row gap-x-6 mt-6 " >
                            {/* Pros */}
                            <div className="mb-6 w-full">
                                <label
                                    htmlFor="pros"
                                    className="block text-lg font-normal text-[#000000] mb-3"
                                >
                                    Pros
                                </label>

                                {/* List of Pros */}
                                {pros.map((pro, index) => (
                                    <div key={index} className="mb-3 flex flex-col items-start gap-2">
                                        <textarea
                                            value={pro}
                                            onChange={(e) => {
                                                const newPros = [...pros];
                                                newPros[index] = e.target.value;
                                                setPros(newPros);
                                            }}
                                            placeholder="What went well?"
                                            className="w-full h-28 p-3 border border-[#989DA3] rounded-md focus:outline-none focus:ring-0 bg-[#E6FBDC]"
                                        />

                                        {/* Remove button next to each textarea */}
                                        {pros.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newPros = pros.filter((_, i) => i !== index);
                                                    setPros(newPros);
                                                }}
                                                className="px-5 py-2 text-black border border-[#d09a40] cursor-pointer rounded-[26px]   "
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {/* Add More Pros button at the bottom */}
                                <button
                                    type="button"
                                    onClick={() => setPros([...pros, ""])}
                                    className="mt-2 px-4 py-2 bg-[#d09a40] rounded-[26px] text-white cursor-pointer  "
                                >
                                    + Add More Pros
                                </button>
                            </div>

                            {/* Cons */}
                            <div className="mb-6 w-full">
                                <label
                                    htmlFor="cons"
                                    className="block text-lg font-normal text-[#000000] mb-3"
                                >
                                    Cons
                                </label>

                                {cons.map((con, index) => (
                                    <div key={index} className="mb-3 flex flex-col items-start gap-2">
                                        <textarea
                                            value={con}
                                            onChange={(e) => {
                                                const newCons = [...cons];
                                                newCons[index] = e.target.value;
                                                setCons(newCons);
                                            }}
                                            placeholder="What could be improved?"
                                            className="w-full h-28 p-3 border border-[#989DA3] rounded-md focus:outline-none focus:ring-0 bg-[#FBE5DC]"
                                        />

                                        {/* Remove button next to each textarea */}
                                        {cons.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newCons = cons.filter((_, i) => i !== index);
                                                    setCons(newCons);
                                                }}
                                                className="px-5 py-2 text-black border border-[#d09a40] cursor-pointer rounded-[26px]   "
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {/* Add More Cons button at the bottom */}
                                <button
                                    type="button"
                                    onClick={() => setCons([...cons, ""])}
                                    className="mt-2 px-4 py-2 bg-[#d09a40] rounded-[26px] text-white cursor-pointer  "
                                >
                                    + Add More Cons
                                </button>
                            </div>



                        </div>



                    </form>



                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            onClick={handleClose}
                            className="flex items-center space-x-2 px-8 cursor-pointer py-3 text-[#D09A40] rounded-[36px] border border-[#D09A40] transition"
                        >
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className="px-8 cursor-pointer py-3 bg-[#D09A40] text-white rounded-[36px] hover:bg-[#b8802f] transition">
                            {
                                isLoading ? "...loading..." : "Save"
                            }
                        </button>
                    </div>





                </div>




            </div>
        </>
    );
};

export default ProviderUpdate;
