import React, { useEffect, useState } from "react";
import type { Transaction } from "../App";

type TransactionsProps = {
  transactions: Transaction[];
};
export const Totals = ({ transactions }: TransactionsProps) => {
  const totalIncomes = transactions
    .filter((trans) => trans.type === "income")
    .reduce((sum, trans) => sum + trans.amount, 0);

  const totalExpenses = transactions
    .filter((trans) => trans.type === "expense")
    .reduce((sum, trans) => sum + trans.amount, 0);

  const totalSavings = totalIncomes - totalExpenses;

  return (
    <div className="flex justify-center space-x-4 mt-4 m-5">
      <div className="w-1/3 bg-yellow-100 p-4 text-center">
        <h3 className="font-bold">Total Incomes</h3>
        <p>{totalIncomes}₪</p>
      </div>
      <div className="w-1/3 bg-yellow-100 p-4 text-center">
        <h3 className="font-bold">Total Expenses</h3>
        <p>{totalExpenses}₪</p>
      </div>
      <div className="w-1/3 bg-yellow-100 p-4 text-center">
        <h3 className="font-bold">Total Savings</h3>
        <p>{totalSavings}₪</p>
      </div>
    </div>
  );
};
