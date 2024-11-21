"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react'

const Onboarding = () => {

    const [step, setStep] = useState(1);

    function goToNextStep() {
        setStep(step + 1);
    }

    if (step === 1) {
        return (
            <div className="flex flex-col items-center justify-center text-center gap-10 max-w-4xl mx-auto">

                <div className='flex flex-col items-center'>
                    <h1 className='text-5xl md:text-7xl font-bold mb-8'>Welcome to Monthly!</h1>
                    <h2 className='text-xl md:text-2xl text-subtitle mb-8'>Let's get you started with your account.</h2>

                    <div className='text-sm bg-error/20 p-4 rounded-md'>Warning: This app tracks your bills and expenses, so please use safe credentials.</div>
                </div>

                <div className='flex flex-col items-center gap-20'>

                    <div className='flex flex-col items-center gap-4'>
                        <h2 className="text-sm text-subtitle">First off, let's get your name.</h2>
                        <Input className='w-64' placeholder='Your name'/>
                    </div>

                    <div className='flex flex-col items-center gap-4'>
                        <h2 className="text-sm text-subtitle">Now, let's get your email.</h2>
                        <Input className='w-64' placeholder='Your email'/>
                    </div>

                    <div className='flex flex-col items-center gap-4'>
                        <h2 className="text-sm text-subtitle">Finally, set up a secure password.</h2>
                        <Input className='w-64' placeholder='Your password'/>
                    </div>

                    <Button className='w-fit gap-2' onClick={goToNextStep}>
                        Submit
                    </Button>

                </div>

            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="flex flex-col items-center p-8 max-w-4xl mx-auto">

                <div className='flex flex-col items-center gap-4'>
                    <h1 className="text-3xl font-bold mb-8">Thank you for setting up your account!</h1>
                    <h2 className="text-xl text-subtitle">Let's get you started with your first bill.</h2>

                    <Button className='w-fit gap-2'>
                        <PlusIcon/>
                        Add your first bill
                    </Button>
                </div>

            </div>
        )
    }
}

export default Onboarding
