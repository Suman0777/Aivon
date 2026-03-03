import { useState } from "react"
import Api from "../Componet/Api"
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

const handleclickSignup = async () => {
  try {
    const response = await Api.get("/api/v1/user/getalluser")
    console.log(response.data)
  } catch (error) {
    console.log(error.response?.data || error.message)
  }
}

// const handleclickSignup = async () => {
//   try {
//     const response = await Api.post("/api/v1/auth/signup", {
//       name: "John Doe",
//       email: "johndoe@example.com",
//       password: "password123"
//     })
//     console.log(response.data)
//   } catch (error) {
//     console.log(error.response?.data || error.message)
//   }
// }

{/* ================= SIGNUP CARD ================= */}

function SignupCard({ setActiveCard }) {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account.</CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="signup-name">Name</Label>
              <Input id="signup-name" type="text" placeholder="Enter your Name" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="Enter your email" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" placeholder="Enter your password" />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setActiveCard(true)}
        >
          Login
        </Button>
        
        <Button 
          type="submit"
          onClick={handleclickSignup}
        >
          Create
        </Button>
      </CardFooter>

      <BorderBeam duration={8} size={100} />
    </Card>
  )
}



{/* ================= LOGIN CARD ================= */}

function Login({ setActiveCard }) {
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
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" placeholder="Enter your email" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" type="password" placeholder="Enter your password" />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setActiveCard(false)}
        >
          Register
        </Button>
        <Button type="submit">Login</Button>
      </CardFooter>

      <BorderBeam duration={8} size={100} />
    </Card>
  )
}



{/* ================= MAIN PAGE ================= */}

export default function LoginPage() {
  const [activeCard, setActiveCard] = useState(false)

  return (
    <div
      className="flex items-center justify-center min-h-screen relative z-10 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/gradientBackground.png")` }}
    >
      {activeCard ? (
        <Login setActiveCard={setActiveCard} />
      ) : (
        <SignupCard setActiveCard={setActiveCard} />
      )}
    </div>
  )
}