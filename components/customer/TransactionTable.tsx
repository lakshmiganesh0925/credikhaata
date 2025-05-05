import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Loan {
  id: number;
  item: string;
  amount: number;
  dueDate: string;
  repayments: { amount: number; date: string }[];
}

const TransactionTable = ({ loans }: { loans: Loan[] }) => {
  const calculateBalance = (loan: Loan) => {
    const totalRepaid = loan.repayments.reduce((sum, r) => sum + r.amount, 0);
    return loan.amount - totalRepaid;
  };

  const isOverdue = (dueDate: string) => new Date(dueDate) < new Date();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Repayments</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => {
          const balance = calculateBalance(loan);
          const overdue = isOverdue(loan.dueDate) && balance > 0;
          return (
            <TableRow key={loan.id}>
              <TableCell>{loan.item}</TableCell>
              <TableCell>₹{loan.amount}</TableCell>
              <TableCell>{loan.dueDate}</TableCell>
              <TableCell>₹{balance}</TableCell>
              <TableCell className={overdue ? 'text-red-500' : 'text-green-500'}>
                {overdue ? 'Overdue' : 'Up-to-date'}
              </TableCell>
              <TableCell>
                {loan.repayments.map((r, i) => (
                  <p key={i}>₹{r.amount} on {r.date}</p>
                ))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;