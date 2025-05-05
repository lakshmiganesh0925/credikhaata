'use client';

import { createContext, useState, ReactNode } from 'react';

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

interface CustomerContextType {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'loans'>) => void;
  addLoan: (customerId: number, loan: Omit<Loan, 'id' | 'repayments'>) => void;
  addRepayment: (customerId: number, loanId: number, repayment: { amount: number; date: string }) => void;
}

export const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'John Doe',
      loans: [
        { id: 1, item: 'Groceries', amount: 500, dueDate: '2025-04-30', repayments: [{ amount: 200, date: '2025-04-15' }] },
      ],
    },
  ]);

  const addCustomer = (customer: Omit<Customer, 'id' | 'loans'>) => {
    setCustomers([...customers, { ...customer, id: customers.length + 1, loans: [] }]);
  };

  const addLoan = (customerId: number, loan: Omit<Loan, 'id' | 'repayments'>) => {
    setCustomers(
      customers.map((c) =>
        c.id === customerId ? { ...c, loans: [...c.loans, { ...loan, id: c.loans.length + 1, repayments: [] }] } : c
      )
    );
  };

  const addRepayment = (customerId: number, loanId: number, repayment: { amount: number; date: string }) => {
    setCustomers(
      customers.map((c) =>
        c.id === customerId
          ? {
              ...c,
              loans: c.loans.map((l) =>
                l.id === loanId ? { ...l, repayments: [...l.repayments, repayment] } : l
              ),
            }
          : c
      )
    );
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, addLoan, addRepayment }}>
      {children}
    </CustomerContext.Provider>
  );
};