import { BillForm } from '@/components/bill/bill-form';
import { areaService, productService, staffService } from '@/services';

async function CreateBill() {
  const products = await productService.getAllProducts();
  const staffs = await staffService.getAllStaffs();
  const areas = await areaService.getAllAreas();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 py-12 px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900 dark:text-gray-100">
            Bill Form
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600 dark:text-gray-400">
            Please fill out the details below to record the bill of a transaction.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-8">
          <BillForm products={products} staffs={staffs} areas={areas} />
        </div>
      </div>
    </div>
  );
}

export default CreateBill;
