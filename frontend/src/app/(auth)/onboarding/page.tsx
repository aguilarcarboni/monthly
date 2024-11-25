"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { User } from '@/types/User';
import { accessAPI } from '@/utils/api';
import { PlusIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const Onboarding = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [step, setStep] = useState(1);

    const router = useRouter();

    function goToNextStep() {
        setStep(step + 1);
    }

    async function onCreateAccount() {
        console.log("Creating account...");

        const user = {
            name: name,
            email: email,
            image: "",
            password: password
        }

        const response = await accessAPI("/user_service/createUser", "POST", {user: user})
        console.log(response);
        if (response['status'] !== 'success') {
            toast({
                title: 'Error',
                description: 'Failed to create account',
                variant: 'error'
            })
            return null;
        }

        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        })
        console.log(result);

        if (result?.ok) {
            router.push('/bills');
        } else {
            toast({
                title: 'Error',
                description: 'Invalid username or password',
            })
        }

    }

    if (step === 1) {
        return (
            <div className="flex flex-col items-center justify-center text-center gap-10 max-w-4xl mx-auto">
                <div>
                    <h1 className="text-3xl font-bold mb-8">Thank you for setting up your account!</h1>
                    <h2 className="text-xl text-subtitle">Lets get you started with your first bill.</h2>                   
                </div>
                <Button className='w-fit gap-2' onClick={goToNextStep}>
                    Next step
                </Button>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="flex flex-col items-center p-8 max-w-4xl mx-auto">

                <div className='flex flex-col items-center'>
                    <h1 className='text-5xl md:text-7xl font-bold mb-8'>Welcome to Monthly!</h1>
                    <h2 className='text-xl md:text-2xl text-subtitle mb-8'>Lets get you started with your account.</h2>
                    <div className='text-sm bg-error/20 p-4 rounded-md'>Warning: This app tracks your bills and expenses, so please use safe credentials.</div>
                </div>

                <div className='flex flex-col items-center gap-20'>

                    <div className='flex flex-col items-center gap-4'>
                        <h2 className="text-sm text-subtitle">First off, lets get your name.</h2>
                        <Input className='w-64' placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className='flex flex-col items-center gap-4'>
                        <h2 className="text-sm text-subtitle">Now, lets get your email.</h2>
                        <Input className='w-64' placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className='flex flex-col items-center gap-4'>
                        <h2 className="text-sm text-subtitle">Finally, set up a secure password.</h2>
                        <Input className='w-64' placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <Button className='w-fit gap-2' onClick={onCreateAccount}>
                        Submit
                    </Button>

                </div>
            </div>
        )
    }

}

export default Onboarding
