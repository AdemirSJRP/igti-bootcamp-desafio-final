import React, { useState, useEffect } from "react";
import Header from "./Header";
import PeriodSelector from "./PeriodSelector";
import TransactionService from "./Services/TransactionService";
import Summary from "./Summary";
import AddNewAndFilter from "./AddNewAndFilter";
import Transactions from "./Transactions";
import TransactionForm from "./TransactionForm";

export default function App() {
  const [period, setPeriod] = useState("2019-07");
  const [filter, setFilter] = useState("");
  const [summary, setSummary] = useState({
    lancamentos: 0,
    receitas: 0,
    despesas: 0,
    saldo: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await TransactionService.getByPeriod(period);
      const newTransactions = data.data;
      setAllTransactions(newTransactions);
      setReload(false);
    }
    fetchData();
  }, [period, reload]);

  useEffect(() => {
    filterTransactions();
  }, [allTransactions, filter]);

  const filterTransactions = () => {
    const newTransactions =
      filter.length > 0
        ? allTransactions.filter(
            (t) =>
              t.description.toLowerCase().indexOf(filter.toLowerCase()) >= 0
          )
        : allTransactions;
    calcSummary(newTransactions);
  };

  const calcSummary = (transactions) => {
    const receitas = transactions
      .filter((t) => t.type === "+")
      .map((t) => t.value)
      .reduce((a, b) => a + b, 0);
    const despesas = transactions
      .filter((t) => t.type === "-")
      .map((t) => t.value)
      .reduce((a, b) => a + b, 0);
    const newSummary = {
      lancamentos: transactions.length,
      receitas,
      despesas,
      saldo: receitas - despesas,
    };
    setTransactions(transactions.sort((a, b) => a.day - b.day));
    setSummary(newSummary);
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const handleAddNew = (event) => {
    setIsNew(true);
    const now = new Date();
    const yearMonthDay = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
    setSelectedTransaction({
      type: "+",
      description: "",
      value: 0,
      category: "",
      yearMonthDay,
    });
    setIsModalOpen(true);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleFormSave = async (formData) => {
    setIsModalOpen(false);
    if (isNew) {
      await TransactionService.addTransaction(formData);
    } else {
      await TransactionService.updateTransaction(formData);
    }
    setIsNew(false);
    setReload(true);
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = async (id) => {
    await TransactionService.deleteTransaction(id);
    setReload(true);
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header />
      <PeriodSelector value={period} onChange={handlePeriodChange} />
      <Summary value={summary} />
      <div className="container mt-2">
        <AddNewAndFilter
          value={filter}
          addNew={handleAddNew}
          filterChange={handleFilterChange}
        />
        <Transactions
          transactions={transactions}
          selectTransaction={handleSelectTransaction}
          deleteTransaction={handleDeleteTransaction}
        />
      </div>
      {isModalOpen && (
        <TransactionForm
          onSave={handleFormSave}
          onClose={handleFormClose}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
