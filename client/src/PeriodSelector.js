import React, { useState, useEffect } from "react";
import TransactionService from "./Services/TransactionService";

export default function PeriodSelector({ value, onChange }) {
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await TransactionService.getPeriods();
      setPeriods(data.data);
    }
    fetchData();
  }, []);

  const handleChangePeriod = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="card-panel w-100 m-0 blue lighten-4 d-flex flex-column justify-content-center align-items-center">
      <div className="input-field m-0 col-s12">
        {periods.length > 0 && (
          <div>
            <span className="mt-2">Selecione o Período:</span>
            <select
              className="browser-default"
              value={value}
              onChange={handleChangePeriod}
            >
              {periods.map(({ yearMonth, yearStr }) => {
                return (
                  <option
                    key={yearMonth}
                    value={yearMonth}
                    onChange={handleChangePeriod}
                  >
                    {yearStr}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        {periods.length === 0 && (
          <span className="h3">Carregando períodos...</span>
        )}
      </div>
    </div>
  );
}
