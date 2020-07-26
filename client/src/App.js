import React, { useState, useEffect } from "react";
import Header from "./Header";
import PeriodSelector from "./PeriodSelector";
import TransactionService from "./Services/TransactionService";
import Summary from "./Summary";
import AddNewAndFilter from "./AddNewAndFilter";
import Transactions from "./Transactions";

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

  useEffect(() => {
    async function fetchData() {
      const data = await TransactionService.getByPeriod(period);
      const newTransactions = data.data;
      setAllTransactions(newTransactions);
    }
    fetchData();
  }, [period]);

  useEffect(() => {
    filterTransactions();
  }, [allTransactions, filter]);

  const filterTransactions = () => {
    console.log("transactions", allTransactions, filter);
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
    console.log("calcSummary", transactions);
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
    setTransactions(transactions);
    setSummary(newSummary);
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const handleAddNew = (event) => {
    console.log("addnewFilter");
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header />
      <PeriodSelector value={period} onChange={handlePeriodChange} />
      <Summary value={summary} />
      <AddNewAndFilter
        value={filter}
        addNew={handleAddNew}
        filterChange={handleFilterChange}
      />
      <Transactions transactions={transactions} />
    </div>
  );
}
