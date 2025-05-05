This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Objective
Build a responsive web frontend for CrediKhaata, a simple credit tracking app for small shopkeepers. The app will
let them manage trusted customers, track credit sales, record repayments, and view dues — all from a single
dashboard.
Target User
A small shopkeeper using a desktop or mobile browser to track credit sold to trusted customers (like monthly
groceries or tailors keeping dues from customers).
Core Features
1. Login/Sign-Up
• Build a basic email-password auth flow (mocked or API-connected)
• Persist login state using localStorage or context
2. Dashboard View
• List of all customers with:
o Name
o Outstanding balance
o Next due date (calculated from loan data)
o Status: Up-to-date / Overdue

3. Customer Detail Page
• View all credit transactions for a customer:
o Item sold
o Loan amount
o Due date
o Repayment history (amount + date)
• Show remaining balance per loan
4. Forms
• Add new customer form
• Add loan (credit sale) form
• Record repayment form
• Validate forms on the client side
5. Overdue Highlighting
• On Dashboard or Loan List, visually highlight overdue loans in red or with an icon

2

2

Others
• Mobile-responsive design
• Export customer statement as a downloadable PDF (use jspdf or similar)
• Toasts/snackbars for success/error states
• Dark mode toggle
Tech Guidelines
• React (v18+)
• Use Hooks (no class components)
• State management: Context API or use State/use Reduce
• Axios/fetch for API calls
• CSS: Tailwind / Chakra / Styled Components / CSS Modules — your choice
• Form validation: use react-hook-form or any alternative
