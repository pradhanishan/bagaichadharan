import { EditBillForm } from '@/components/bill/edit-bill-form';
import { billService } from '@/services';

export default async function EditBill({ params }: { params: { slug: string } }) {
  const transactionRecords = await billService.getTransactionDetailsByTransaction(params.slug);
  const { menuItems, staffs, areas } = await billService.getStaffsBillsAndMenuItems();
  const transactionHasRecords = transactionRecords.length > 0;

  if (!transactionHasRecords) {
    return <div className="text-center text-lg font-semibold mt-4">No transaction found</div>;
  }

  // Prepare initial records array for EditBillForm
  const initialRecords = transactionRecords.map((record) => ({
    menuItemId: String(record.menuItemId),
    quantitySold: String(record.quantitySold),
  }));

  return (
    <div>
      <EditBillForm
        salesId={transactionRecords[0].salesId}
        transactionNo={transactionRecords[0].transactionNo}
        menuItems={menuItems}
        staffs={staffs}
        areas={areas}
        initial={{
          salesId: transactionRecords[0].salesId,
          staffId: String(transactionRecords[0].staffId),
          areaId: String(transactionRecords[0].areaId),
          records: initialRecords,
        }}
      />
    </div>
  );
}
