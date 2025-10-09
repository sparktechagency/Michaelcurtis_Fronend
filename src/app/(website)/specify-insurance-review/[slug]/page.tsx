import React from 'react';
import SpecifyReviewFrom from './SpecifyReviewFrom';

type PageProps = {
    params: {
        slug: string;
    };
};

const Page: React.FC<PageProps> = ({ params }) => {
    const { slug } = params;

    return (
        <div>
            <SpecifyReviewFrom slug={slug} />
        </div>
    );
};

export default Page;
