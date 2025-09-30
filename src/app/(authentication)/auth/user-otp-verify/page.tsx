import React, { Suspense } from 'react'
import UserOtpVerfifyFrom from './UserOtpVerfifyFrom'

const Page: React.FC = () => {
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>} >
                <UserOtpVerfifyFrom />
            </Suspense>
        </div>
    )
}

export default Page 