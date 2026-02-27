
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BorderBeam } from "@/components/ui/border-beam"
import { useState } from "react"



export function Signupcard({setActiveCard}) {
    return (
      <Card className="relative w-[350px] overflow-hidden">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create a new account.
          </CardDescription>
        </CardHeader>

        <CardContent>
            <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="Enter your Name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    </div>
             </div>
        </form>
        </CardContent>
        
      <CardFooter className="flex justify-between">
        <Button variant="outline"
        onClick={()=> setActiveCard(false)}
        >Back</Button>
        <Button>Create</Button>
      </CardFooter>
        <BorderBeam duration={8} size={100} />
      </Card>
    )
}



export function LOgin({setActiveCard}) {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
        onClick={()=> setActiveCard(true)}
        variant="outline">Register</Button>

        <Button>Login</Button>
      </CardFooter>
      <BorderBeam duration={8} size={100} />
    </Card>
  )
}


const LoginPage = () => {
const [activeCard, setActiveCard] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen relative z-10 w-full bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url("/gradientBackground.png")` }}
    >
        {activeCard === false ? <LOgin setActiveCard={setActiveCard} /> : <Signupcard setActiveCard={setActiveCard} />}
    </div>
  )
}

export default LoginPage
