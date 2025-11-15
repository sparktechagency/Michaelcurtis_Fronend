import HomePage from '../pages/home-page/HomePage';
import { Metadata } from 'next';

const url = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function generateMetadata(): Promise<Metadata> {
    if (!url) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");

    }

    try {
        const response = await fetch(`${url}meta-datas/home`, {

            next: { revalidate: 1 },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();



        return {
            title: data?.data?.title || "",
            description:
                data?.data?.description ||
                "",
        };
    } catch (error) {
        console.log(error)
        return {
            title: "",
            description: "      ",
        };
    }
}

const Page = () => {
    return (
        <div>
            <HomePage />
        </div>
    );
};

export default Page;
