import { EditBillForm } from '@/components/bill/edit-bill-form';
import { areaService, menuService, salesService, staffService } from '@/services';

export default async function EditBill({ params }: { params: { slug: string } }) {
  const transactionRecords = await salesService.getSalesDetailsByTransaction(params.slug);
  const transactionHasRecords = transactionRecords.length > 0;

  const menuItems = await menuService.getAllMenuItems();
  const staffs = await staffService.getAllServiceStaffs();
  const areas = await areaService.getAllAreas();

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
