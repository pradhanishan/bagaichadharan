import { BillForm } from '@/components/bill/bill-form-2';
import { BagaichaCard } from '@/components/ui/bagaicha-card';
import { billService } from '@/services';
import { Suspense } from 'react';

export default async function BillPage() {
  const { menuItems, staffs, areas } = await billService.getStaffsBillsAndMenuItems();
  return (
    <BagaichaCard>
      <Suspense fallback={<div>Loading...</div>}>
        <BillForm menuItems={menuItems} staffs={staffs} areas={areas} />
      </Suspense>
    </BagaichaCard>
  );
}
