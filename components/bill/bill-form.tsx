'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Assuming you have a Table component structure similar to shadcn
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

// Update this import as per your actual implementation

function BillForm({ products }: { products: { id: number; name: string }[] }) {
  const currentUser = useCurrentUser();

  const form = useForm<z.infer<typeof BillSchema>>({
    resolver: zodResolver(BillSchema),
    defaultValues: {
      staffId: currentUser ? currentUser.id : '',
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Table for Existing Records */}
        <div className="bg-white border border-gray-300 rounded-md shadow-sm p-4 dark:bg-gray-800">
          <Table>
            <TableCaption>Bills</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {index !== fields.length - 1 ? (
                      <span className="dark:text-gray-300">
                        {products.find((product) => product.id === +item.productId)?.name}
                      </span>
                    ) : (
                      <span className="dark:text-gray-300">Currently Adding</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {index !== fields.length - 1 ? (
                      <span className="dark:text-gray-300">{item.quantitySold}</span>
                    ) : (
                      <span>
                        <Input
                          type="number"
                          {...form.register(`records.${index}.quantitySold`)}
                          className="dark:bg-gray-700 dark:text-gray-300"
                        />
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {index !== fields.length - 1 ? (
                      <span className="dark:text-gray-300">{item.amountSold}</span>
                    ) : (
                      <span>
                        <Input
                          type="number"
                          {...form.register(`records.${index}.amountSold`)}
                          className="dark:bg-gray-700 dark:text-gray-300"
                        />
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {index !== fields.length - 1 && (
                      <Button type="button" onClick={() => remove(index)} className="text-red-600 hover:text-red-900">
                        <TrashIcon className="w-5 h-5" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* Form inputs for the row being added */}
        <div className="container grid grid-cols-12 gap-4 p-4 border rounded-md shadow-sm bg-blue-50 border-blue-400 dark:bg-gray-800 dark:border-gray-600">
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
                  <SelectContent>
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
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantity Sold"
                      {...field}
                      className="dark:bg-gray-700 dark:text-gray-300"
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
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount Sold"
                      {...field}
                      className="dark:bg-gray-700 dark:text-gray-300"
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
              className="flex items-center"
            >
              <PlusCircledIcon className="mr-2" /> Add
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

export { BillForm };
