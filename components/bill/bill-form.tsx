'use client';

import { billActions } from '@/actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BillSchemaUI } from '@/schemas';
import type { BillFormProps } from '@/types/TBillFormProps';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircledIcon, TrashIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

function BillForm({ menuItems, staffs, areas }: BillFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BillSchemaUI>>({
    resolver: zodResolver(BillSchemaUI),
    defaultValues: {
      staffId: '',
      areaId: '',
      records: [{ menuItemId: '', quantitySold: '0' }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'records' });

  const records = useWatch({ control: form.control, name: 'records' });

  const onSubmit: SubmitHandler<z.infer<typeof BillSchemaUI>> = (formData) => {
    startTransition(() => {
      billActions.createBill(formData);
    });
  };

  const calculateTotalBill = () => {
    let total = 0;
    records.forEach((record) => {
      const menuItem = menuItems.find((item) => item.id === +record.menuItemId);
      if (menuItem) {
        const quantitySold = isNaN(Number(record.quantitySold)) ? 0 : Number(record.quantitySold);
        total += menuItem.price * quantitySold;
      }
    });
    return total.toFixed(2);
  };

  return (
    <Form {...form}>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6"> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Staff and Area Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
            Select Staff and Area
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Staff Selection */}
            <FormField
              control={form.control}
              name="staffId"
              render={({ field }) => (
                <FormItem className="bg-white border border-gray-300 rounded-md shadow-sm p-4 dark:bg-gray-800">
                  <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">Staff</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
                          placeholder="Select Staff"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {staffs.map((staff) => (
                        <SelectItem key={staff.id} value={String(staff.id)}>
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Area Selection */}
            <FormField
              control={form.control}
              name="areaId"
              render={({ field }) => (
                <FormItem className="bg-white border border-gray-300 rounded-md shadow-sm p-4 dark:bg-gray-800">
                  <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">Area</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
                          placeholder="Select Area"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {areas.map((area) => (
                        <SelectItem key={area.id} value={String(area.id)}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Form inputs for the row being added */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
            Enter New Record
          </h2>
          <div className="grid grid-cols-12 gap-4 p-4 border rounded-md shadow-sm bg-blue-50 border-blue-400 dark:bg-gray-800 dark:border-gray-600">
            <FormField
              control={form.control}
              name={`records.${fields.length - 1}.menuItemId`}
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-4">
                  <FormLabel className="dark:text-gray-300">Item</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-48 overflow-y-auto">
                      {menuItems.map((menuItem) => (
                        <SelectItem key={menuItem.id} value={String(menuItem.id)}>
                          {menuItem.item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-12 md:col-span-4 flex gap-4">
              <FormField
                control={form.control}
                name={`records.${fields.length - 1}.quantitySold`}
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormLabel className="dark:text-gray-300">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Quantity Sold"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 md:col-span-4 flex items-end justify-end gap-2 mt-2">
              <Button
                type="button"
                onClick={() => append({ menuItemId: '', quantitySold: '' })}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
              >
                <PlusCircledIcon className="w-5 h-5 mr-2" /> Add
              </Button>
            </div>
          </div>
        </div>

        {/* Bill Container */}
        <div className="bg-white border border-gray-300 rounded-md shadow-sm p-6 mt-6 dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bill</h2>

          {/* Display Selected Staff and Area */}
          <div className="flex justify-between mb-4">
            <div>
              <span className="block text-lg font-medium dark:text-gray-300">Staff: </span>
              <span className="dark:text-gray-300">
                {staffs.find((staff) => staff.id === +form.watch('staffId'))?.name || 'Not selected'}
              </span>
            </div>
            <div>
              <span className="block text-lg font-medium dark:text-gray-300">Area: </span>
              <span className="dark:text-gray-300">
                {areas.find((area) => area.id === +form.watch('areaId'))?.name || 'Not selected'}
              </span>
            </div>
          </div>

          {/* Table for Existing Records */}
          <div className="mb-4">
            <Table>
              <TableCaption className="text-lg font-medium">Bill Records</TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableHead className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase border-b border-gray-300 dark:border-gray-500 w-2/5">
                    Item
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase border-b border-gray-300 dark:border-gray-500 w-1/5">
                    Quantity
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase border-b border-gray-300 dark:border-gray-500 w-1/5">
                    Amount
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase border-b border-gray-300 dark:border-gray-500 w-1/5">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className={index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}
                  >
                    <TableCell className="px-6 py-3 text-sm dark:text-gray-300 w-2/5">
                      {index !== fields.length - 1
                        ? menuItems.find((menuItem) => menuItem.id === +item.menuItemId)?.item || 'Unknown Item'
                        : null}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-sm dark:text-gray-300 w-1/5">
                      {index !== fields.length - 1 ? item.quantitySold : null}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-sm dark:text-gray-300 w-1/5">
                      {index !== fields.length - 1
                        ? menuItems.find((menuItem) => menuItem.id === +item.menuItemId)
                          ? (
                              (menuItems.find((menuItem) => menuItem.id === +item.menuItemId)?.price || 0) *
                              Number(item.quantitySold)
                            ) // Convert quantitySold to Number
                              .toFixed(2)
                          : '0.00'
                        : ''}
                    </TableCell>

                    <TableCell className="px-6 py-3 w-1/5">
                      {index !== fields.length - 1 && (
                        <Button type="button" onClick={() => remove(index)} className="text-red-600 hover:text-red-900">
                          <TrashIcon className="w-5 h-5" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Total Bill Calculation */}
          <div>
            <Table>
              <TableFooter>
                <TableRow className="bg-gray-200 dark:bg-gray-700">
                  <TableCell colSpan={2} className="px-6 py-3 text-lg font-medium text-gray-700 uppercase">
                    Total Bill
                  </TableCell>
                  <TableCell colSpan={2} className="px-6 py-3 text-lg font-medium text-gray-700 uppercase text-right">
                    ₹ {calculateTotalBill()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { BillForm };
