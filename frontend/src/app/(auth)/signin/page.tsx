"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';

function SignIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const {toast} = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl: callbackUrl ? callbackUrl : '/',
    });
    if (result?.ok) {
      router.push(callbackUrl ? callbackUrl : '/');
    } else {
      toast({
        title: 'Error',
        description: 'Invalid username or password',
      })
    }
    setIsLoading(false);
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className='w-96 h-fit gap-5 flex flex-col justify-center items-center'>
        <CardHeader className='flex flex-col gap-2'>
        <CardTitle className='text-center text-3xl' >Sign In</CardTitle>
        <div className='flex flex-col gap-2 bg-error/20 p-2 rounded-md items-center justify-center'>
            <p className='text-sm text-subtitle text-center'>You must create an account to use the app's services.</p>
            <Link 
              href={
                callbackUrl ? 
                `/create-account?callbackUrl=${encodeURIComponent(callbackUrl)}` 
                : 
                '/create-account'
              } 
              className='underline text-subtitle font-bold'
            >
              Create an account
            </Link> 
        </div>
      </CardHeader>
      <CardContent className='w-full'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}

export default SignIn;