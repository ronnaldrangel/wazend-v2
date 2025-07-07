import React from 'react'
import SectionsSteps from "@/components/dashboard/afilliates/section-steps"
import ActiveProgram from "@/components/dashboard/afilliates/active"
import { Separator } from "@/components/ui/separator"

export default function Page() {
    return (
        <div className='flex flex-col max-w-7xl mx-auto rounded-lg shadow-md'>
            <SectionsSteps />
            <div className='px-14'>
                <Separator/>
            </div>
            <ActiveProgram />
        </div>
    )
}
