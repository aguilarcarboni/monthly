"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { User } from '@/lib/types/User';
import { accessAPI } from '@/utils/api';
import { PlusIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
            <div className="flex flex-col items-center justify-center text-center gap-6 h-fit p-10">
                
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Thank you for setting up your account!</h1>
                <h2 className="text-lg md:text-xl text-subtitle">Lets get you started with your first bill.</h2>  

                <div className='flex flex-col gap-8 max-w-3xl'>
                    <h3 className='text-lg md:text-xl font-semibold tracking-wide'>Step 1: Sign In or Create an Account.</h3>
                    <p className='text-base md:text-lg text-subtitle tracking-wide'>
                        The very first thing you have to do before using our services is to login to your account.
                        This will provide you with a safe and protected experience. You can find the sign in and the create account buttons in the top right by the navigation window:
                    </p>

                    <div className='flex justify-center w-full'>
                        <Image 
                            src="/assets/icons/navigation_menu.png" 
                            alt="Navigation Menu" 
                            width={500} 
                            height={50} 
                            className="max-w-full h-auto rounded-md shadow-md" 
                        />
                    </div>

                    <p className='text-base md:text-lg text-subtitle tracking-wide'>
                        If you already have an account press <span className='text-black font-semibold'>Sign in</span>. In <span className='font-semibold'>Username</span> and <span className='font-semibold'>Password</span>, write your account's name and password respectively. Following is an example of a sign in:
                    </p>

                    <div className='flex justify-center w-full'>
                        <Image src="/assets/icons/example_sign_in.png" alt="Sign In" width={300} height={250} className="max-w-full h-auto rounded-md shadow-md" />
                    </div>

                    <p className='text-base md:text-lg text-subtitle tracking-wide'>
                        If it's your first time visiting us continue reading this guide. At the end we'll aid you in creating your account.
                    </p>

                    <h3 className='text-lg md:text-xl font-semibold tracking-wide'>Step 2: Add your First Bill.</h3>
                    <p className='text-base md:text-lg text-subtitle tracking-wide'>
                        After logging into your account, head over to the "Bills" section in the app. You can find it in the navigation menu as <span className='font-semibold'>Bills</span>. Once, there press the <span className='text-green-600 font-semibold'>Green</span> button; this will pop up the following screen:
                    </p>
                    <div className='flex justify-center w-full'>
                        <Image src="/assets/icons/bill_pop_up.png" alt="Bill Pop Up" width={500} height={50} className="max-w-full h-auto rounded-md shadow-md" />
                    </div>
                    <p className='text-base md:text-lg text-subtitle tracking-wide'>
                        In there you will place the bill information from top to down as follows. First, write the name of the bill where it says <span className='font-semibold'>Bill Name</span>. Second, write the amount where there is a <span className='font-semibold'>100</span>. Third; write the day, month, and year of the bill.
                    </p>
                    <div className='flex justify-center w-full'>
                        <Image src="/assets/icons/filling_bill_up_1.png" alt="Bill 1" width={500} height={50} className="max-w-full h-auto rounded-md shadow-md" />
                    </div>
                    <p className='text-base md:text-lg text-subtitle tracking-wide'>
                        Fourth, select the category from which this bill originates by pressing <span className='font-semibold'>Select a category</span>. 
                        This helps you separate information about your bills and allowing you to better recognize them.
                    </p>
                    <div className='flex justify-center w-full'>
                        <Image src="/assets/icons/filling_bill_up_2.png" alt="Bill 2" width={500} height={50} className="max-w-full h-auto rounded-md shadow-md" />
                    </div>
                    <p className='text-base md:text-lg text-subtitle tracking-wide'> 
                        And Lastly, select a renewal option for periodic bills by clicking <span className='font-semibold'>Select a renewal option</span>. This option is there to help the user schedule periodic bills without the need of repeteadly adding them.
                    </p>
                    <div className='flex justify-center w-full'>
                        <Image src="/assets/icons/filling_bill_up_3.png" alt="Bill 3" width={500} height={50} className="max-w-full h-auto rounded-md shadow-md" />
                    </div>

                    <h3 className='text-lg md:text-xl font-semibold tracking-wide'>Step 3: Handle your Bills.</h3>
                    <p className='text-base md:text-lg text-subtitle tracking-wide'>
                        Monthly also provides the capacity of deleting, paying and editing bills. To access this you must press the three dots in the far right of a bill.
                    </p>
                    <div className='flex justify-center w-full'>
                        <Image src="/assets/icons/functionality.png" alt="Bill 3" width={1000} height={100} className="max-w-full h-auto rounded-md shadow-md" />
                    </div>
                    <p className='text-base md:text-lg text-subtitle tracking-wide'>
                        When editing a bill, the process is similar to the creation of a bill. Paying, on the other hand requires you to input a payment method. An example of a payment method:
                    </p>
                    <div className='flex justify-center w-full'>
                        <Image src="/assets/icons/paying.png" alt="Bill 3" width={500} height={100} className="max-w-full h-auto rounded-md shadow-md" />
                    </div>
                </div>

                <Button className='w-fit gap-2 mt-6' onClick={goToNextStep}>
                    Next step
                </Button>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="flex flex-col items-center gap-5 max-w-4xl mx-auto">

                <div className='flex flex-col items-center'>
                    <h1 className='text-5xl md:text-7xl font-bold mb-8'>Welcome to Monthly!</h1>
                    <h2 className='text-xl md:text-2xl text-subtitle mb-8'>Lets get you started with your account.</h2>
                    <div className='text-sm bg-error/20 p-4 rounded-md'>Warning: This app tracks your bills and expenses, so please use safe credentials.</div>
                </div>

                <div className='flex flex-col items-center gap-5'>

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
                        Create my account
                    </Button>

                </div>
            </div>
        )
    }

}

export default Onboarding
