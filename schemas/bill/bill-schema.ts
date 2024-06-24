// Assuming TransactionSchema is defined in '@/schemas'
import { z } from 'zod';

const BillSchemaUI = z.object({
  staffId: z.string(), // Ensure staffId is a non-empty string
  areaId: z.string(),
  records: z.array(
    z.object({
      menuItemId: z.string(), // Ensure menuItemId is a non-empty string
      quantitySold: z.string(), // Ensure quantitySold is a number and >= 0
    }),
  ),
});

const BillSchema = z.object({
  staffId: z.number(),
  areaId: z.number(),
  records: z.array(
    z.object({
      menuItemId: z.number(),
      quantitySold: z.number(),
      amountSold: z.number(),
    }),
  ),
});

const EditBillSchema = z.object({
  salesId: z.string(),
  transactionNo: z.string(),
  staffId: z.string(),
  areaId: z.string(),
  records: z.array(
    z.object({
      menuItemId: z.string(),
      quantitySold: z.string(),
    }),
  ),
});

export { BillSchemaUI, BillSchema, EditBillSchema };
