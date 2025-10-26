import React from 'react'

const MetaForm = () => {
    return (
        <>
            <div className=' flex justify-between  items-center  ' >
                <div className=' w-full ' >
                    <h1 className=' mb-6 text-3xl font-semibold  ' >Home Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">
                        {/* Home page */}
                        <form>
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Ranking page  */}
                <div className=' w-full ' >
                    <h1 className=' mb-6 text-3xl font-semibold ' >Ranking Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">
                        <form>
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className=' flex justify-between mt-6 ' >
                <div className=' w-full ' >
                    {/* Provider page  */}
                    <h1 className=' mb-6 text-3xl font-semibold  ' >Provider Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form>
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Ranking page  */}
                <div className=' w-full ' >
                    <h1 className=' mb-6 text-3xl font-semibold ' >Policies Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">
                        <form>
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className=' flex justify-between mt-6 ' >
                <div className=' w-full ' >
                    {/* Blog  */}
                    <h1 className=' mb-6 text-3xl font-semibold  ' >Blog Page</h1>
                    <div className="max-w-2xl  p-6 bg-white rounded-lg shadow-md">

                        <form>
                            {/* Title */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter title"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    cols={30}
                                    rows={10}
                                    placeholder="Enter description"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#D09A40] text-white rounded-md cursor-pointer focus:outline-none  focus:ring-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>








        </>
    )
}

export default MetaForm
