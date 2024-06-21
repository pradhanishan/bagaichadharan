'use client';

import { login } from '@/actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

function LoginForm() {
  const [formResponse, setFormResponse] = useState<{ error: string } | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (formData) => {
    startTransition(() => {
      login(formData).then((response) => {
        setFormResponse(response);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-auto md:w-[380px]">
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
        {formResponse && (
          <FormMessage className="bg-rose-200/30 p-2 text-red-600 flex justify-start items-center gap-4">
            <ExclamationTriangleIcon />
            <span>{formResponse.error}</span>
          </FormMessage>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          login
        </Button>
      </form>
    </Form>
  );
}

export { LoginForm };
