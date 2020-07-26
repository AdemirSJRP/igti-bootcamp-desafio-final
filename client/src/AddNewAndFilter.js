import React from "react";

export default function AddNewAndFilter({ addNew, value, filterChange }) {
  const handleChange = ($event) => {
    filterChange($event.target.value);
  };

  const handleAddNew = ($event) => {
    addNew($event);
  };

  return (
    <div className="w-100 d-flex justify-content-between align-items-center">
      <button className="btn btn-success mx-2" onClick={handleAddNew}>
        Adicionar Lançamento
      </button>
      <div className="input-field mx-2 w-100">
        <input value={value} id="value" autoFocus onChange={handleChange} />
        <label className="active" htmlFor="value">
          Filtro:
        </label>
      </div>
    </div>
  );
}
