import { useState } from "react";
import "./App.css";
import { Inputs } from "./components/Inputs";
import { Transactions } from "./components/Transactions";
import { Totals } from "./components/Totals";
import { ByCategory } from "./components/ByCategory";

export type Transaction = {
  id: number;
  type: "expense" | "income";
  category: string;
  amount: number;
  description: string;
  date: Date;
};

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };
  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((trans) =>
        trans.id === updatedTransaction.id ? updatedTransaction : trans
      )
    );
  };

  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((trans) => trans.id !== id));
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="font-bold text-center">
        <h1 className="p-5">Personal Budget Tracker</h1>
      </div>
      <Totals transactions={transactions} />
      <div className="flex">
        <Inputs onAddTransaction={addTransaction} transactions={transactions} />
        <ByCategory transactions={transactions} />
      </div>
      <Transactions
        transactions={transactions}
        onUpdateTransaction={updateTransaction}
        onDeleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default App;
