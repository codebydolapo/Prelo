"use client"

import Header from '@/components/Header'
import React, { useState } from 'react'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'

type PricingTier = {
    tierName: string;
    price: number | "Custom";
    offerings: string[];
    position?: string | number;
};

const pricingTiers: PricingTier[] = [
    {
        tierName: "Starter",
        price: 0,
        offerings: [
            "Up to 3 collaborative documents",
            "Real-time editing with in-document chat",
            "Basic user roles (Viewer/Editor)"
        ]
    },
    {
        tierName: "Pro",
        price: 12,
        offerings: [
            "Unlimited documents & 25 team members",
            "AI-powered document translation",
            "Custom roles, branding & integrations"
        ]
    },
    {
        tierName: "Enterprise",
        price: 20,
        offerings: [
            "Unlimited users & SSO integration",
            "Dedicated account manager & onboarding",
            "API access, audit logs & premium support"
        ]
    }
];


function PricingList({ tierName, price, offerings, position }: PricingTier) {

    const [open, setOpen] = useState(false)


    return (
        <div className={`md:w-[30%] w-full ${position == 1 ? "bg-[#063970]" : "border-[1px] border-gray-200"} flex flex-col items-center px-4 py-8 md:shadow-md shadow-2xl rounded-md md:my-0 my-4`}>
            <h1 className={`md:text-2xl text-xl font-semibold ${position == 1 && "text-white"}`}>{tierName}</h1>
            <h1 className={`md:text-[6rem] text-[5rem] font-semibold ${position == 1 && "text-white"}`}>${price}</h1>
            <h1 className={`text-sm font-extralight ${position == 1 && "text-white"} italic`}>Per user, per month</h1>
            <div className={`p-2 ${position == 1 && "bg-[#1da1f2]"} ${position !== 1 && "border-[#1da1f2]"} rounded-sm mt-4`}>
                <h1 className={`text-base font-semibold ${position == 1 && "text-white"}`}>Start my 15-day free trial</h1>
            </div>
            <div className={`my-8 w-[50%] h-[1px] ${position !== 1 ? "bg-black" : "bg-white"}`} />

            <div className="w-[90%] md:hidden">

                <button className='w-full flex items-center justify-between cursor-pointer mb-8' onClick={() => setOpen(!open)}>
                    <h2 className={`text-sm font-semiBold font-bold ${position == 1 ? "text-[#1da1f2]" : "text-black "}`}>Features</h2>
                    {open ? <ChevronDown className={`size-7 ${position == 1 ? "text-[#1da1f2]" : "text-black "}`} /> : <ChevronRight className={`size-7 ${position == 1 ? "text-white" : "text-black "}`} />}
                </button>
                {open &&
                    offerings.map((offering, index) => {
                        return (
                            <div className="flex space-x-2" key={index}>
                                <Check className="size-6 text-[#0f0]" />
                                <h1 className={`text-sm font-bold ${position == 1 && "text-white"}`}>{offering}</h1>
                            </div>
                        )
                    })
                }
            </div>

            <div className="md:flex hidden flex-col p-2 space-y-3">
                {
                    offerings.map((offering, index) => {
                        return (
                            <div className="flex space-x-2" key={index}>
                                <Check className="size-6 text-[#0f0]" />
                                <h1 className={`text-sm font-bold ${position == 1 && "text-white"}`}>{offering}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


function pricing() {


    return (
        <div className='max-w-screen h-full flex flex-col'>
            <Header stripped={false} page={"pricing"} />
            <div className="flex-1 md:px-28 px-2 md:py-10 py-5">
                <div className="w-full flex flex-col items-center justify-center px-0">
                    <p className="font-extrabold text-[#1da1f2] md:text-5xl text-4xl text-center ">Unmatched Productivity At The Palm Of Your Hand...</p>
                    <div className="md:flex hidden items-center justify-around space-x-16  mt-8 ">
                        <div className="p-2 flex space-x-2">
                            <Check className="size-6 text-[#1da1f2]" />
                            <p className="md:text-sm text-xs font-semibold">Free 15-day trial</p>
                        </div>
                        <div className="p-2 flex space-x-2">
                            <Check className="size-6 text-[#1da1f2]" />
                            <p className="md:text-sm text-xs font-semibold">Unlimited team members</p>
                        </div>
                        <div className="p-2 flex space-x-2">
                            <Check className="size-6 text-[#1da1f2]" />
                            <p className="md:text-sm text-xs font-semibold">Cancel Anytime</p>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col items-center justify-around w-full md:px-28 px-4  mt-12">
                        {
                            pricingTiers.map(({ tierName, price, offerings }, index) => {
                                return (
                                    <PricingList
                                        key={index}
                                        tierName={tierName}
                                        price={price}
                                        offerings={offerings}
                                        position={index}
                                    />

                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default pricing