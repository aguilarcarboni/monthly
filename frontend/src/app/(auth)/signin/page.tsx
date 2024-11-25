"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {toast} = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/');
    } else {
      toast({
        title: 'Error',
        description: 'Invalid username or password',
      })
    }
    setIsLoading(false);
  }

  return (
    <div className='flex items-center justify-center my-64'>
      <Card className='w-96 h-fit gap-5 flex flex-col justify-center items-center'>
        <CardHeader className='flex flex-col gap-2'>
        <CardTitle className='text-center font-bold text-4xl' >Sign In</CardTitle>
        <Button variant='ghost' className='w-fit'>
          <Link 
                href='/onboarding'
                className='underline text-subtitle'
              >
                Create an account
          </Link> 
        </Button>
      </CardHeader>
      <CardContent className='w-full'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input
            type="text"
              placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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