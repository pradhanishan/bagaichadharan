'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreateBillRecordSchema, CreateBillSchema } from '@/schemas';
import { BillFormProps } from '@/types/TBillFormProps';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

function BillForm({ menuItems, staffs, areas }: BillFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateBillSchema>>({
    resolver: zodResolver(CreateBillSchema),
    defaultValues: {
      staffId: '',
      areaId: '',
      records: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'records' });

  const watchedFields = useWatch({ control: form.control, name: 'records', defaultValue: [] });

  const billItemForm = useForm<z.infer<typeof CreateBillRecordSchema>>({
    resolver: zodResolver(CreateBillRecordSchema),
    defaultValues: {
      menuItemId: '',
      quantitySold: 1,
    },
  });

  const handleBillItemFormSubmit: SubmitHandler<z.infer<typeof CreateBillRecordSchema>> = (formData) => {
    startTransition(() => {
      console.log(formData);
      append({ menuItemId: formData.menuItemId, quantitySold: formData.quantitySold });
    });
  };

  const BillItemForm = () => {
    return (
      <Form {...billItemForm}>
        <form
          onSubmit={billItemForm.handleSubmit(handleBillItemFormSubmit)}
          className="space-y-4 flex items-end gap-4 bg-gray-100 p-4 rounded-md shadow-sm"
        >
          <FormField
            control={billItemForm.control}
            name="menuItemId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Select Item</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Item" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
          <FormField
            control={billItemForm.control}
            name="quantitySold"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Quantity Sold"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                    min="1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" disabled={billItemForm.watch('menuItemId').length < 3}>
            <PlusCircledIcon />
          </Button>
        </form>
      </Form>
    );
  };

  const BillTable = ({ headers }: { headers: string[] }) => {
    return (
      <Table>
        <TableCaption>Your bill</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchedFields.map((field, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{field.menuItemId}</TableCell>
                <TableCell>
                  {menuItems.find((menuItem) => menuItem.id === billItemForm.watch('menuItemId'))?.item ||
                    'Not selected'}
                </TableCell>
                <TableCell>{field.quantitySold}</TableCell>
                {/* <TableCell>{menuItems.filter((item) => item.id === field.id)[0].price * field.quantitySold}</TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-6">
      <BillItemForm />
      <Form {...form}>
        <form className="space-y-4 bg-gray-100 p-4 rounded-md shadow-sm">
          <FormField
            control={form.control}
            name="areaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
          <FormField
            control={form.control}
            name="staffId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Staff</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service staff" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
        </form>
      </Form>
      <BillTable headers={['item', 'quantity']} />
    </div>
  );
}

export { BillForm };
