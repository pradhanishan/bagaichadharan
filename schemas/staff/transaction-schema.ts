import { z } from 'zod';

const TransactionSchema = z.object({
  staffId: z.string({ message: 'Invalid input' }).min(1, { message: 'No Staff Id found' }),
  products: z.object({ productId: z.string(), quantity: z.number().gt(0), price: z.number().gt(0) }).array(),
});

export { TransactionSchema };
