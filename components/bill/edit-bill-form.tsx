'use client';

import { billActions } from '@/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import bagaichaImage from '@/public/bagaicha.jpeg';
import { EditBillSchema } from '@/schemas';
import type { EditBillFormProps } from '@/types/TBillFormProps';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { TrashIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

function EditBillForm({ salesId, transactionNo, menuItems, staffs, areas, initial }: EditBillFormProps) {
  console.log();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EditBillSchema>>({
    resolver: zodResolver(EditBillSchema),
    defaultValues: {
      salesId: initial.salesId,
      staffId: initial.staffId,
      areaId: initial.areaId,
      records: [...initial.records, { menuItemId: '', quantitySold: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'records' });

  const records = useWatch({ control: form.control, name: 'records' });

  const onSubmit: SubmitHandler<z.infer<typeof EditBillSchema>> = (formData) => {
    startTransition(() => {
      billActions.editBill(formData);
    });
  };

  console.log('Fields');
  console.log(fields);

  return (
    <Form {...form}>
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
        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6"> */}
        <Card className="shadow-lg mx-auto my-8 max-w-2xl border border-gray-300 rounded-lg">
          <CardHeader className="bg-green-800 p-4 rounded-t-lg flex items-center">
            <div className="flex gap-4 w-full justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold text-yellow-500">Bagaicha Restro And Bar</CardTitle>
                <CardDescription className="mt-2 text-sm text-gray-300">
                  <span className="font-semibold">Transaction No:</span> {transactionNo}
                </CardDescription>
                <CardDescription className="mt-1 text-sm text-gray-300">
                  <span className="font-semibold">Seat:</span> {initial.areaId}
                </CardDescription>
                <CardDescription className="mt-1 text-sm text-gray-300">
                  <span className="font-semibold">Service:</span> {initial.staffId}{' '}
                </CardDescription>
              </div>
              <div className="flex-shrink-0 mr-4">
                <Image src={bagaichaImage} alt="Bagaicha image logo" width={280} height={120} className="rounded" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 bg-gray-50">
            <Table className="min-w-full border">
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="w-[150px] p-3 text-left text-gray-700 font-semibold">Item</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-semibold">Quantity</TableHead>
                  <TableHead className="p-3 text-left text-gray-700 font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields
                  .filter((field) => field.menuItemId !== '')
                  .map((item, idx) => {
                    return (
                      <TableRow className="border-b hover:bg-gray-100" key={idx}>
                        <TableCell className="p-3 text-gray-600">
                          {menuItems.find((menuItem) => String(menuItem.id) === item.menuItemId)?.item ||
                            'Item not found'}
                        </TableCell>
                        <TableCell className="p-3 text-gray-600">
                          <div className="col-span-12 md:col-span-4 flex gap-4">
                            <FormField
                              control={form.control}
                              name={`records.${idx}.quantitySold`}
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
                        </TableCell>
                        <TableCell className="p-3 text-gray-600">
                          <Button
                            onClick={() => {
                              remove(idx);
                            }}
                          >
                            <TrashIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-gray-200">
                  <TableCell colSpan={2} className="p-3 text-right font-bold text-gray-700">
                    Total
                  </TableCell>
                  <TableCell className="p-3 text-right font-bold text-gray-700">₹100</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between p-4 bg-gray-100 rounded-b-lg">
            <Button
              type="submit"
              variant="outline"
              className="border border-gray-300 text-gray-700 hover:bg-gray-200 flex gap-2 justify-center items-center"
              onClick={() => {
                redirect(`/dashboard/`);
              }}
            >
              Done
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export { EditBillForm };
