import { RegisterForm } from '@/components/auth/register-form';
import { ToggleAuthForm } from '@/components/auth/toggle-auth-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Register() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        {/* <CardDescription>login to continue</CardDescription> */}
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center">
        <ToggleAuthForm to="login" />
      </CardFooter>
    </Card>
  );
}
