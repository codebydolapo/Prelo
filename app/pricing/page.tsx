"use client"

import Header from '@/components/Header'
import React from 'react'
import { Check } from 'lucide-react'

type PricingTier = {
    tierName: string;
    price: number | "Custom";
    offerings: string[];
    backgroundColor?: string;
    accentColor?: string;
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


function PricingList({ tierName, price, offerings, backgroundColor, accentColor, position }: PricingTier) {
    return (
        <div className={`w-[30%] ${position == 1 && "bg-[#063970]"} flex flex-col items-center px-4 py-8 shadow-md rounded-md`}>
        <h1 className={`text-2xl font-semibold ${position == 1 && "text-white"}`}>{tierName}</h1>
            <h1 className={`text-[6rem] font-semibold ${position == 1 && "text-white"}`}>${price}</h1>
            <h1 className={`text-sm font-extralight ${position == 1 && "text-white"} italic`}>Per user, per month</h1>
            <div className={`p-2 ${position == 1 && "bg-[#1da1f2]"} ${position !== 1 && "border-[#1da1f2]"} rounded-sm mt-4`}>
                <h1 className={`text-base font-semibold ${position == 1 && "text-white"}`}>Start my 15-day free trial</h1>
            </div>
            <div className={`my-8 w-[50%] h-[1px] ${position !== 1 ? "bg-black" : "bg-white"}`} />

            <div className="flex flex-col p-2 space-y-3">
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
        <div className='w-full h-full border-2 border-black flex flex-col'>
            <Header stripped={false} page={"pricing"} />
            <div className="flex-1 px-28 py-10">
                <div className="w-full flex flex-col items-center justify-center">
                    <p className="font-extrabold text-[#000000d7] text-5xl text-center">Unmatched Productivity At The Palm Of Your Hand...</p>
                    <div className="flex items-center justify-around space-x-16  mt-8">
                        <div className="p-2 flex space-x-2">
                            <Check className="size-6 text-[#1da1f2]" />
                            <p className="text-sm font-semibold">Free 15-day trial</p>
                        </div>
                        <div className="p-2 flex space-x-2">
                            <Check className="size-6 text-[#1da1f2]" />
                            <p className="text-sm font-semibold">Unlimited team members</p>
                        </div>
                        <div className="p-2 flex space-x-2">
                            <Check className="size-6 text-[#1da1f2]" />
                            <p className="text-sm font-semibold">Cancel Anytime</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-around w-full px-28  mt-12">
                        {
                            pricingTiers.map(({ tierName, price, offerings }, index) => {
                                return (
                                    <PricingList
                                        key={index}
                                        tierName={tierName}
                                        price={price}
                                        offerings={offerings}
                                        backgroundColor={index === 1 ? "#063970" : "#fff"}
                                        accentColor={index === 1 ? "#1da1f2" : "#fff"}
                                        position = {index}
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