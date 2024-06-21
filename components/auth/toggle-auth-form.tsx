import Link from 'next/link';

function ToggleAuthForm({ to }: { to: 'login' | 'register' }) {
  return (
    <Link href={`/auth/${to}`}>
      <p className="cursor-pointer duration-150 focus:cursor-pointer focus:underline focus:underline-offset-4 hover:cursor-pointer hover:underline hover:underline-offset-4 opacity-70 text-xs transition-all">
        {to === 'login' ? 'I already have an account.' : 'I do not have an account.'}
      </p>
    </Link>
  );
}

export { ToggleAuthForm };
