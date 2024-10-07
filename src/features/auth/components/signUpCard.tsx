import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Separator } from '@/components/ui/Separator'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { SignInflow } from '../types'
import { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { TriangleAlert } from 'lucide-react'


interface SignUpCardProps {
    setAuth  : (state: SignInflow) => void
}


const SignUpCard = ({setAuth } : SignUpCardProps)  => {

    const { signIn } = useAuthActions();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    

    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {

        if(password !== confirmPassword){
            setError("passwords do not match");
            return;
        }
        e.preventDefault();
        setPending(true);
        signIn("password", {name, email, password, flow: "signUp"})
            .catch(() => {
                setError("Something went Wrong");
            })
            .finally(() => setPending(false));
    }

    const handleProviderSignUp = (value: "github" | "google") => {
        setPending(true);
        signIn(value)
            .finally(() => setPending(false));


    }

  return (
    <Card className="w-full h-full p-8">
        <CardHeader className='px-0 pt-0'>
            <CardTitle>
                SignUp to continue
            </CardTitle>
        <CardDescription>
            use your email or another service to continue
        </CardDescription>
        </CardHeader>
        {!!error && (
            <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                <TriangleAlert className='size-4' />
                <p>{error}</p>
            </div>
        )}
        <CardContent className='space-y-5 px-0 pb-0'>
            <form  onSubmit={onPasswordSignUp} className="space-y-2.5">
                <Input 
                    disabled= {pending}
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    placeholder= "Full Name" 
                    type="text"
                    required
                
                />
                <Input 
                    disabled= {pending}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder= "Email" 
                    type="email"
                    required
                
                />
                <Input 
                    disabled= {pending}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder= "Password" 
                    type="password"
                    required
                
                />
                <Input 
                    disabled= {pending}
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    placeholder= "Confirm Password" 
                    type="password"
                    required
                
                />
                <Button type='submit' className='w-full' size="lg" disabled={false}>
                    Continue 
                </Button>
            </form> 
            <Separator />
            <div className='flex flex-col gap=y=2.5'>
                <Button disabled = {false}
                        onClick={() => handleProviderSignUp("google")}
                        variant="outline"
                        size="lg"
                        className='w-full relative'
                >
                    <FcGoogle className='size-5 absolute top-2.5 left-2.5' />
                    
                    Continue with Google
                </Button>
                <Button disabled = {pending}
                        onClick={() => handleProviderSignUp("github")}
                        variant="outline"
                        size="lg"
                        className='w-full relative'
                >
                    <FaGithub className='size-5 absolute top-2.5 left-2.5' />
                    
                    Continue with Github
                </Button>
            </div>
            <p className='text-xs text-muted-foreground'>
                Already have an Account? <span onClick={() => setAuth("signIn")} className='text-sky=700 hover:underline cursor-pointer'>sign In</span>
            </p>
        </CardContent>
    </Card>
  )
}

export default SignUpCard