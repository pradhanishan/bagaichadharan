// Assuming TransactionSchema is defined in '@/schemas'
import { z } from 'zod';

const BillSchema = z.object({
  staffId: z.string().min(1), // Ensure staffId is a non-empty string
  areaId: z.string().min(1),
  records: z.array(
    z.object({
      productId: z.string().min(1), // Ensure productId is a non-empty string
      quantitySold: z.number().min(0), // Ensure quantitySold is a number and >= 0
      amountSold: z.number().min(0), // Ensure amountSold is a number and >= 0
    }),
  ),
});

export { BillSchema };
