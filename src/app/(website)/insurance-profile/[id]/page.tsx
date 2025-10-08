import React from "react";
import DetailsBanner from "./DetailsBanner";

interface PageProps {
    params: {
        id: string;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const { id } = params;

    return (
        <div>
            <DetailsBanner slug={id} />
        </div>
    );
};

export default Page;
