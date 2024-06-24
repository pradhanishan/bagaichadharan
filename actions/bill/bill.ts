'use server';

import { BillSchema, BillSchemaUI } from '@/schemas';
import { menuService, salesService } from '@/services';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function createBill(formData: z.infer<typeof BillSchemaUI>) {
  // Validate formData against BillSchemaUI
  const uiValidationResult = BillSchemaUI.safeParse(formData);
  if (!uiValidationResult.success) {
    return { error: { message: 'Invalid fields', errors: uiValidationResult.error.errors } };
  }

  // Filter out records with empty menuItemId
  const filteredRecords = uiValidationResult.data.records.filter((record) => record.menuItemId !== '');

  // Convert form data fields to desired types for BillSchema
  const convertedFormData = {
    staffId: parseInt(uiValidationResult.data.staffId),
    areaId: parseInt(uiValidationResult.data.areaId),
    records: filteredRecords.map((record) => ({
      menuItemId: parseInt(record.menuItemId),
      quantitySold: parseFloat(record.quantitySold), // Parsing to float if quantitySold can be decimal
      amountSold: 0, // Assuming initial amountSold is 0
    })),
  };

  // Validate converted form data against BillSchema
  const validatedFormData = BillSchema.safeParse(convertedFormData);
  if (!validatedFormData.success) {
    return { error: { message: 'Invalid fields', errors: validatedFormData.error.errors } };
  }

  // extract staffId, areaId, and records
  const { staffId, areaId, records } = validatedFormData.data;

  // Get current time in UTC
  const nowUTC = new Date();

  // Generate transaction number (YYYYMMDDHHMMSS format) in UTC
  const transactionNo = nowUTC
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, -3);

  // Generate tranDate in YYYYMMDD format in UTC
  const tranDateUTC = new Date(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate());
  const tranDate = parseInt(tranDateUTC.toISOString().slice(0, 10).replace(/-/g, ''));

  try {
    // Fetch menu items based on menuItemIds from records
    const menuItems = await menuService.getMenuItemsById(records.map((record) => record.menuItemId));
    // Prepare objects for insertion into database
    const insertObjects = records.map((record, index) => {
      const menuItem = menuItems.find((item) => item.id === record.menuItemId);
      const amountSold = menuItem ? menuItem.price * record.quantitySold : 0;
      return {
        staffId,
        areaId,
        transactionNo,
        menuId: record.menuItemId,
        quantitySold: record.quantitySold,
        amountSold: parseFloat(amountSold.toFixed(2)), // Ensure amountSold is formatted as string with 2 decimal places
        tranDate, // Include the tranDate in each insert object
      };
    });

    // Create sales transaction using salesService
    const createdSales = await salesService.createSalesTransaction(insertObjects);
  } catch (error) {
    console.log(error);
  }
  // TODO:revalidate transaction related pages.
  redirect(`/dashboard/bill/view/${transactionNo}`);
}
