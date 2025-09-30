import React from 'react'
import SendNotification from './SendNotification'
import RecentNotification from './RecentNotification'

const Page: React.FC = () => {
  return (
    <div>
      <SendNotification></SendNotification>
      <RecentNotification></RecentNotification>
    </div>
  )
}

export default Page