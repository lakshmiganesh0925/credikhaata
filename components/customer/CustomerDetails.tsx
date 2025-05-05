'use client';

import { useContext } from 'react';
import { useParams } from 'next/navigation';
import { CustomerContext } from '@/context/CustomerContent';
import TransactionTable from './TransactionTable';
import AddLoanForm from '../forms/AddLoanForm';
import RepaymentForm from '../forms/RepaymentForm';
import { Button } from '../ui/button';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';

const CustomerDetails = () => {
  const { customers } = useContext(CustomerContext)!;
  const params = useParams();
  const customer = customers.find((c) => c.id === parseInt(params.id as string));

  if (!customer) return <p className="p-4 text-red-500">Customer not found!</p>;

  const exportStatement = () => {
    const doc = new jsPDF();
    doc.text(`Statement for ${customer.name}`, 10, 10);
    customer.loans.forEach((loan, index) => {
      const balance = loan.amount - loan.repayments.reduce((sum, r) => sum + r.amount, 0);
      doc.text(
        `Loan ${index + 1}: ${loan.item}, Amount: ₹${loan.amount}, Due: ${loan.dueDate}, Balance: ₹${balance}`,
        10,
        20 + index * 10
      );
    });
    doc.save(`${customer.name}_statement.pdf`);
    toast.success('Statement exported!');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{customer.name}</h2>
      <Button onClick={exportStatement} className="mb-4">
        Export Statement
      </Button>
      <TransactionTable loans={customer.loans} />
      <div className="grid gap-4 md:grid-cols-2">
        <AddLoanForm customerId={customer.id} />
        <RepaymentForm customerId={customer.id} loans={customer.loans} />
      </div>
    </div>
  );
};

export default CustomerDetails;