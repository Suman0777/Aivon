import { useState } from "react"
import { useNavigate } from "react-router"
import Api from "../Componet/Api"
import { useAuth } from "../src/context/AuthContext"
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

{/* ================= SIGNUP CARD ================= */}

function SignupCard({ setActiveCard }) {
  const { login } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSignup = async () => {
    setError("")
    setSuccess("")
    setLoading(true)

    if (!name || !email || !password) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    try {
      const response = await Api.post("/api/v1/user/signup", {
        name,
        email,
        password
      })
      setSuccess("Account created successfully! Please login.")
      login(response.data.token)
      setName("")
      setEmail("")
      setPassword("")
      setTimeout(() => setActiveCard(true), 1500)
    } catch (error) {
      setError(error.response?.data?.msg || "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleSignup() }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="signup-name">Name</Label>
              <Input 
                id="signup-name" 
                type="text" 
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="signup-email">Email</Label>
              <Input 
                id="signup-email" 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="signup-password">Password</Label>
              <Input 
                id="signup-password" 
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 mt-2">{error}</div>
            )}
            {success && (
              <div className="text-sm text-green-500 mt-2">{success}</div>
            )}
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setActiveCard(true)}
          disabled={loading}
        >
          Login
        </Button>
        
        <Button 
          type="submit"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </Button>
      </CardFooter>

      <BorderBeam duration={8} size={100} />
    </Card>
  )
}



{/* ================= LOGIN CARD ================= */}

function Login({ setActiveCard }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleLogin = async () => {
    setError("")
    setSuccess("")
    setLoading(true)

    if (!email || !password) {
      setError("Email and password are required")
      setLoading(false)
      return
    }

    try {
      const response = await Api.post("/api/v1/user/signin", {
        email,
        password
      })
      setSuccess("Login successful!")
      login(response.data.token)
      setEmail("")
      setPassword("")
      // Redirect to dashboard after login
      setTimeout(() => {
        navigate("/dashboard")
      }, 1000)
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input 
                id="login-email" 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="login-password">Password</Label>
              <Input 
                id="login-password" 
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 mt-2">{error}</div>
            )}
            {success && (
              <div className="text-sm text-green-500 mt-2">{success}</div>
            )}
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setActiveCard(false)}
          disabled={loading}
        >
          Register
        </Button>
        <Button 
          type="submit"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
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