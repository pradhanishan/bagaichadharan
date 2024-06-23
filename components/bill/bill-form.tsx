'use client';

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
import { useCurrentUser } from '@/hooks/use-current-user';
import { BillSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircledIcon, TrashIcon } from '@radix-ui/react-icons';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

type Product = {
  id: number;
  name: string;
};

type Staff = {
  id: number;
  name: string;
};

type Area = {
  id: number;
  name: string;
};

type BillFormProps = {
  products: Product[];
  staffs: Staff[];
  areas: Area[];
};

function BillForm({ products, staffs, areas }: BillFormProps) {
  const currentUser = useCurrentUser();

  const form = useForm<z.infer<typeof BillSchema>>({
    resolver: zodResolver(BillSchema),
    defaultValues: {
      staffId: currentUser ? String(currentUser.id) : '',
      areaId: '',
      records: [{ productId: '', quantitySold: 0, amountSold: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'records' });

  const records = useWatch({ control: form.control, name: 'records' });

  const isAddButtonDisabled = !records.every(
    (record) => record.productId && record.quantitySold !== undefined && record.amountSold !== undefined,
  );

  const onSubmit: SubmitHandler<z.infer<typeof BillSchema>> = (formData) => {
    console.log(formData);
  };

  const calculateTotalBill = () => {
    return records.reduce((total, record) => total + (Number(record.amountSold) || 0), 0).toFixed(2);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Staff and Area Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Select Staff and Area</h2>
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
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Enter New Record</h2>
          <div className="grid grid-cols-12 gap-4 p-4 border rounded-md shadow-sm bg-blue-50 border-blue-400 dark:bg-gray-800 dark:border-gray-600">
            <FormField
              control={form.control}
              name={`records.${fields.length - 1}.productId`}
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
                      {products.map((product) => (
                        <SelectItem key={product.id} value={String(product.id)}>
                          {product.name}
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
                        className="dark:bg-gray-700 dark:text-gray-300 w-full px-2 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`records.${fields.length - 1}.amountSold`}
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormLabel className="dark:text-gray-300">Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Amount Sold"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-300 w-full px-2 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                onClick={() => append({ productId: '', quantitySold: 0, amountSold: 0 })}
                disabled={isAddButtonDisabled}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
              >
                <PlusCircledIcon className="w-5 h-5 mr-2" /> Add
              </Button>
            </div>
          </div>
        </div>

        {/* Bill Container */}
        <div className="bg-white border border-gray-300 rounded-md shadow-sm p-6 mt-6 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Bill</h2>

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
                  <TableHead className="py-3 px-6 text-left text-sm font-bold text-gray-700 uppercase border-b border-gray-300 dark:border-gray-500 w-2/5">
                    Item
                  </TableHead>
                  <TableHead className="py-3 px-6 text-left text-sm font-bold text-gray-700 uppercase border-b border-gray-300 dark:border-gray-500 w-1/5">
                    Quantity
                  </TableHead>
                  <TableHead className="py-3 px-6 text-left text-sm font-bold text-gray-700 uppercase border-b border-gray-300 dark:border-gray-500 w-1/5">
                    Amount
                  </TableHead>
                  <TableHead className="py-3 px-6 text-left text-sm font-bold text-gray-700 uppercase border-b border-gray-300 dark:border-gray-500 w-1/5">
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
                    <TableCell className="py-3 px-6 text-sm dark:text-gray-300 w-2/5">
                      {index !== fields.length - 1
                        ? products.find((product) => product.id === +item.productId)?.name || 'Unknown Product'
                        : 'Currently Adding'}
                    </TableCell>
                    <TableCell className="py-3 px-6 text-sm dark:text-gray-300 w-1/5">
                      {index !== fields.length - 1 ? (
                        item.quantitySold
                      ) : (
                        <Input
                          type="number"
                          {...form.register(`records.${index}.quantitySold`)}
                          className="dark:bg-gray-700 dark:text-gray-300 w-full px-2 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-6 text-sm dark:text-gray-300 w-1/5">
                      {index !== fields.length - 1 ? (
                        item.amountSold
                      ) : (
                        <Input
                          type="number"
                          {...form.register(`records.${index}.amountSold`)}
                          className="dark:bg-gray-700 dark:text-gray-300 w-full px-2 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-6 w-1/5">
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
                  <TableCell colSpan={2} className="py-3 px-6 text-lg font-medium text-gray-700 uppercase">
                    Total Bill
                  </TableCell>
                  <TableCell colSpan={2} className="py-3 px-6 text-lg font-medium text-gray-700 uppercase text-right">
                    $ {calculateTotalBill()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
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
