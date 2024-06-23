import { BillForm } from '@/components/bill/bill-form';
import { productService } from '@/services';

async function Transaction() {
  const products = await productService.getAllProducts();
  return <BillForm products={products} />;
}

export default Transaction;
