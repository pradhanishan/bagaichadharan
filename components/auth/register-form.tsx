'use client';

import { register } from '@/actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = (formData) => {
    startTransition(() => {
      register(formData);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-auto md:w-[380px]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="eg:john" {...field} type="text" autoComplete="off" disabled={isPending} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg:johndoe@gmail.com"
                  {...field}
                  type="email"
                  autoComplete="off"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          register
        </Button>
      </form>
    </Form>
  );
}

export { RegisterForm };
