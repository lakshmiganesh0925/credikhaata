'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CustomerContext } from '@/context/CustomerContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'react-toastify';

interface FormData {
  name: string;
}

const AddCustomerForm = () => {
  const { addCustomer } = useContext(CustomerContext)!;
  const form = useForm<FormData>({
    defaultValues: { name: '' },
  });

  const onSubmit = (data: FormData) => {
    addCustomer(data);
    toast.success('Customer added!');
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 bg-card rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Add Customer</h3>
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Customer Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">
          Add Customer
        </Button>
      </form>
    </Form>
  );
};

export default AddCustomerForm;