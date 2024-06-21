import { LoginForm } from '@/components/auth/login-form';
import { ToggleAuthForm } from '@/components/auth/toggle-auth-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        {/* <CardDescription>login to continue</CardDescription> */}
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center">
        <ToggleAuthForm to="register" />
      </CardFooter>
    </Card>
  );
}
