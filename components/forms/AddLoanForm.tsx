'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CustomerContext } from '@/context/CustomerContent'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'react-toastify';

interface FormData {
  item: string;
  amount: number;
  dueDate: string;
}

const AddLoanForm = ({ customerId }: { customerId: number }) => {
  const { addLoan } = useContext(CustomerContext)!;
  const form = useForm<FormData>({
    defaultValues: { item: '', amount: 0, dueDate: '' },
  });

  const onSubmit = (data: FormData) => {
    addLoan(customerId, data);
    toast.success('Loan added!');
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 bg-card rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Add Loan</h3>
        <FormField
          control={form.control}
          name="item"
          rules={{ required: 'Item is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <FormControl>
                <Input placeholder="Item Sold" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          rules={{ required: 'Amount is required', min: { value: 1, message: 'Amount must be positive' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Loan Amount"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          rules={{ required: 'Due date is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">
          Add Loan
        </Button>
      </form>
    </Form>
  );
};

export default AddLoanForm;