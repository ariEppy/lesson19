import React, { useState } from "react";
import type { Transaction } from "../App";

type InputsProps = {
  onAddTransaction: (transaction: Transaction) => void;
  transactions: Transaction[];
};

type TransactionType = "expense" | "income";

export const Inputs = ({ onAddTransaction, transactions }: InputsProps) => {
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || amount <= 0 || !date) {
      alert("Please fill all required fields");
      return;
    }

    // get the latest id
    let id = 0;
    if (transactions.length === 0) id = 1;
    else id = Math.max(...transactions.map((t) => t.id)) + 1;

    const transaction = {
      id,
      type,
      category,
      amount,
      description,
      date,
    };

    console.log(transaction);
    onAddTransaction(transaction);
    setCategory("");
    setAmount(0);
    setDescription("");
    setDate(null);
  };

  return (
    <div className="basis-[80%] ">
      <form onSubmit={handleSubmit} className="space-y-2 mt-5  ">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="bg-white p-2 m-5 rounded text-gray-900 w-50"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white p-2 m-5 rounded text-gray-900 w-50"
          placeholder="Category"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="bg-white p-2 m-5 rounded text-gray-900 w-50"
          placeholder="Amount"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-white p-2 m-5 rounded text-gray-900 w-50"
          placeholder="Description"
        />

        <input
          type="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          className="bg-white p-2 m-5 rounded text-gray-900 w-50"
        />

        <button
          type="submit"
          className="bg-blue-500 m-5 text-white p-2 rounded hover:bg-blue-600 w-50"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};
