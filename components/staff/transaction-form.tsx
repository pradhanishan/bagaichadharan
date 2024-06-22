'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { TransactionSchema } from '@/schemas';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

function TransactionForm() {
  const user = useCurrentUser();

  console.log(user);

  const form = useForm<z.infer<typeof TransactionSchema>>({
    defaultValues: {
      staffId: '',
      products: [{ productId: '', quantity: 0, price: 0 }],
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof TransactionSchema>> = (formData) => {
    console.log('Clicked');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="staffId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
export { TransactionForm };
