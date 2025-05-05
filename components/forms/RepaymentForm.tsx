'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CustomerContext } from '@/context/CustomerContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'react-toastify';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  loanId: number;
  amount: number;
  date: string;
}

interface Loan {
  id: number;
  item: string;
  amount: number;
}

const RepaymentForm = ({ customerId, loans }: { customerId: number; loans: Loan[] }) => {
  const { addRepayment } = useContext(CustomerContext)!;
  const form = useForm<FormData>({
    defaultValues: { loanId: 0, amount: 0, date: '' },
  });

  const onSubmit = (data: FormData) => {
    addRepayment(customerId, data.loanId, { amount: data.amount, date: data.date });
    toast.success('Repayment recorded!');
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 bg-card rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Record Repayment</h3>
        <FormField
          control={form.control}
          name="loanId"
          rules={{ required: 'Loan is required', validate: (value) => value !== 0 || 'Please select a loan' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan</FormLabel>
              <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Loan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loans.map((loan) => (
                    <SelectItem key={loan.id} value={loan.id.toString()}>
                      {loan.item} (₹{loan.amount})
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
          name="amount"
          rules={{ required: 'Amount is required', min: { value: 1, message: 'Amount must be positive' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Repayment Amount"
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
          name="date"
          rules={{ required: 'Date is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">
          Record Repayment
        </Button>
      </form>
    </Form>
  );
};

export default RepaymentForm;