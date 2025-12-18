import { useState } from "react";
import type { Transaction } from "../App";

type TransactionsProps = {
  transactions: Transaction[];
  onUpdateTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: number) => void;
};

export const Transactions = ({
  transactions,
  onUpdateTransaction,
  onDeleteTransaction,
}: TransactionsProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedCategory, setEditedCategory] = useState("");
  const [editedAmount, setEditedAmount] = useState(0);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDate, setEditedDate] = useState<Date | null>(null);

  const sortedTransactions = [...transactions].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const startEdit = (trans: Transaction) => {
    setEditingId(trans.id);
    setEditedCategory(trans.category);
    setEditedAmount(trans.amount);
    setEditedDescription(trans.description);
    setEditedDate(trans.date);
  };

  const saveEdit = (trans: Transaction) => {
    if (editedDate === null) return;

    onUpdateTransaction({
      ...trans,
      category: editedCategory,
      amount: editedAmount,
      description: editedDescription,
      date: editedDate,
    });

    setEditingId(null);
  };

  const formatDateForInput = (date: Date | null) =>
    date ? date.toISOString().split("T")[0] : "";

  return (
    <div className="m-5">
      <h2 className="font-bold mb-5">Transactions</h2>

      {sortedTransactions.map((trans) => (
        <div key={trans.id}>
          {editingId === trans.id ? (
            <div>
              <input
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className="bg-white p-2 m-5 rounded text-gray-900 w-50"
              />

              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(Number(e.target.value))}
                className="bg-white p-2 m-5 rounded text-gray-900 w-50"
              />

              <input
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="bg-white p-2 m-5 rounded text-gray-900 w-50"
              />

              <input
                type="date"
                value={formatDateForInput(editedDate)}
                onChange={(e) => setEditedDate(new Date(e.target.value))}
                className="bg-white p-2 m-5 rounded text-gray-900 w-50"
              />
              <div>
                <button
                  className="bg-blue-500 m-5 text-white p-2 rounded hover:bg-blue-600 w-30"
                  onClick={() => saveEdit(trans)}
                >
                  Save
                </button>
                <button
                  className="bg-blue-500 m-5 text-white p-2 rounded hover:bg-blue-600 w-30"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div
                className={`p-4 flex ${
                  trans.type === "expense"
                    ? "bg-pink-200 text-black"
                    : "bg-green-200 text-black"
                }`}
              >
                <div className="basis-[70%] ">
                  <div>{trans.description}</div>
                  <div>{trans.category}</div>
                  <div>
                    {trans.date.getFullYear()}-{trans.date.getMonth()}-
                    {trans.date.getDate()}
                  </div>
                  <div>{trans.amount}₪</div>
                </div>
                <div className="basis-[30%] ">
                  <button
                    className="bg-blue-500 text-white m-2 p-2 rounded hover:bg-blue-600 w-20"
                    onClick={() => startEdit(trans)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-blue-500 text-white m-2 p-2 rounded hover:bg-blue-600 w-20"
                    onClick={() => onDeleteTransaction(trans.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
