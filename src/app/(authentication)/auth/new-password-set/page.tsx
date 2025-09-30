import React, { Suspense } from "react";
import NewPasswordFrom from "./NewPasswordFrom";

const Page: React.FC = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <NewPasswordFrom />
            </Suspense>
        </div>
    );
};

export default Page;
