import { ModeToggle } from '@/components/mode-toggle';
import { TransactionForm } from '@/components/staff/transaction-form';

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <TransactionForm />
    </main>
  );
}
