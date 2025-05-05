'use client';

import { useContext } from 'react';
import { CustomerContext } from '@/context/CustomerContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import AddCustomerForm from '@/components/forms/AddCustomerForm';

interface Loan {
  id: number;
  item: string;
  amount: number;
  dueDate: string;
  repayments: { amount: number; date: string }[];
}

interface Customer {
  id: number;
  name: string;
  loans: Loan[];
}

const CustomerList = () => {
  const context = useContext(CustomerContext);

  // Check if context is undefined
  if (!context) {
    throw new Error('CustomerList must be used within a CustomerProvider');
  }

  const { customers } = context;

  const calculateBalance = (loan: Loan): number => {
    const totalRepaid = loan.repayments.reduce((sum, r) => sum + r.amount, 0);
    return loan.amount - totalRepaid;
  };

  const isOverdue = (dueDate: string): boolean => new Date(dueDate) < new Date();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <AddCustomerForm />
      {customers.length === 0 ? (
        <p className="text-muted-foreground mt-4">No customers found. Add a customer to get started.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {customers.map((customer: Customer) => {
            const totalBalance = customer.loans.reduce((sum, loan) => sum + calculateBalance(loan), 0);
            const nextDueDate = customer.loans[0]?.dueDate || 'N/A';
            const hasOverdue = customer.loans.some(
              (loan) => isOverdue(loan.dueDate) && calculateBalance(loan) > 0
            );

            return (
              <Link
                href={`/customer/${customer.id}`}
                key={customer.id}
                role="link"
                aria-label={`View details for ${customer.name}`}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{customer.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Balance: ₹{totalBalance.toFixed(2)}</p>
                    <p>Next Due: {nextDueDate}</p>
                    <p className={hasOverdue ? 'text-red-500' : 'text-green-500'}>
                      Status: {hasOverdue ? 'Overdue' : 'Up-to-date'}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerList;