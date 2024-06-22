import { logout } from '@/actions';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

export default async function Settings() {
  const session = await auth();
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <form action={logout}>
        <Button type="submit">sign out</Button>
      </form>
    </>
  );
}
