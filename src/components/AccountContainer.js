import React, { useState, useEffect } from 'react';
import TransactionsList from './TransactionsList';
import AddTransactionForm from "./AddTransactionForm";
import Search from "./Search";

const AccountContainer = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactionsList, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTransactions(data);
          setFilteredTransactions(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setFilteredTransactions(transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(newSearchTerm.toLowerCase())
    ));
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting transaction.");
      }

      setTransactions(transactions.filter((transaction) => transaction.id !== id));
      setFilteredTransactions(filteredTransactionsList.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div >
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <TransactionsList transactions={filteredTransactionsList} deleteTransaction={deleteTransaction} />
    </div>
  );
};

export default AccountContainer;