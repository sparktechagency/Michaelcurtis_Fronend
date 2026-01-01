'use client'

import { useParams } from 'next/navigation'
import DetailsBanner from './DetailsBanner'

const Page = () => {
    const params = useParams()
    const id = params.id as string

    return (
        <div>
            <DetailsBanner slug={id} />
        </div>
    )
}

export default Page
