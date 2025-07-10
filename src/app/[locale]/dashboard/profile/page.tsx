
import React from 'react'
import ChangePassword from "@/components/dashboard/profile/change-password"
import UserInformation from "@/components/dashboard/profile/user-information"
import { Separator } from "@/components/ui/separator"

export default function Page() {
    return (
        <div className='flex flex-col max-w-7xl mx-auto rounded-lg shadow-md'>
            <UserInformation />
            <div className='px-14'>
                <Separator/>
            </div>
            <ChangePassword />
        </div>
    )
}
