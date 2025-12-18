import React from "react";
import type { Transaction } from "../App";

type TransactionsProps = {
  transactions: Transaction[];
};

export const ByCategory = ({ transactions }: TransactionsProps) => {
  const all: { name: string; total: number }[] = [];

  transactions.forEach((trans) => {
    if (trans.type === "expense") {
      const existing = all.find((cat) => cat.name === trans.category);

      if (existing) {
        existing.total += trans.amount;
      } else {
        all.push({ name: trans.category, total: trans.amount });
      }
    }
  });

  console.log(all);

  return (
    <div className="basis-[20%] ">
      <h3 className="font-bold text-center p-5 mr-5 w-50 bg-blue-200">
        Expenses By Category:
      </h3>
      {all.map((cat) => (
        <div
          key={cat.name}
          className="bg-blue-200 p-2 border-blue-300 text-black p-5 mr-5"
        >
          {cat.name}: {cat.total}₪
        </div>
      ))}
    </div>
  );
};
