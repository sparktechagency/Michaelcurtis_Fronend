import React from 'react'
import AccessibilityBanner from './AccessibilityBanner'
import AccessibilityText from './AccessibilityText'

const Page: React.FC = () => {
    return (
        <div className=' bg-[#f9fafb] border-b border-[#989DA3] ' >
            <AccessibilityBanner></AccessibilityBanner>
            <AccessibilityText></AccessibilityText>
        </div>
    )
}

export default Page