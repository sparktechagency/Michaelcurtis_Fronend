import SpecifyReviewFrom from "./[slug]/SpecifyReviewFrom";


interface PageProps {
    params: {
        slug: string;
    };
}

const Page = ({ params }: PageProps) => {
    const { slug } = params;

    return (
        <div>
            <SpecifyReviewFrom slug={slug} />
        </div>
    );
};

export default Page;
