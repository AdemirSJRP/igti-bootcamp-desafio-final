import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function TransactionForm({
  onSave,
  onClose,
  selectedTransaction,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState(selectedTransaction.type);
  const [description, setDescription] = useState(
    selectedTransaction.description
  );
  const [category, setCategory] = useState(selectedTransaction.category);
  const [value, setValue] = useState(selectedTransaction.value);
  const [yearMonthDay, setYearMonthDay] = useState(
    selectedTransaction.yearMonthDay
  );

  useEffect(() => {
    let errorMessage = "";
    if (!description || description.length === 0) {
      errorMessage += "[A descrição da transação deve ser informada] ";
    }
    if (!category || category.length === 0) {
      errorMessage += "[A categoria da transação deve ser informada] ";
    }
    if (!value || value <= 0) {
      errorMessage += "[O valor da transação deve ser informado] ";
    }
    if (!yearMonthDay) {
      errorMessage += "[A data da transação deve ser informado] ";
    }
    setErrorMessage(errorMessage);
  }, [type, description, category, value, yearMonthDay]);

  const handleClose = () => {
    onClose(null);
  };

  const handleFormSubmit = ($event) => {
    const arrDate = yearMonthDay.split("-");
    $event.preventDefault();
    selectedTransaction.type = type;
    selectedTransaction.description = description;
    selectedTransaction.category = category;
    selectedTransaction.value = value;
    selectedTransaction.yearMonthDay = yearMonthDay;
    selectedTransaction.year = Number(arrDate[0]);
    selectedTransaction.month = Number(arrDate[1]);
    selectedTransaction.day = Number(arrDate[2]);
    selectedTransaction.yearMonth = `${arrDate[0]}-${arrDate[1]}`;
    onSave(selectedTransaction);
  };

  const handleChangeType = ($event) => {
    setType($event.target.value);
  };

  const handleDescriptionChange = ($event) => {
    setDescription($event.target.value);
  };

  const handleCategoryChange = ($event) => {
    setCategory($event.target.value);
  };

  const handleValueChange = ($event) => {
    setValue(Number($event.target.value));
  };

  const handleYearMonthDayChange = ($event) => {
    setYearMonthDay($event.target.value);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <h4 style={{ marginTop: "0", marginBottom: "40px" }}>
            <strong>Edição de Lançamento</strong>
          </h4>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <label>
                <input
                  name="grpType"
                  type="radio"
                  checked={type === "+"}
                  value="+"
                  onChange={handleChangeType}
                />
                <span>Receita</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  name="grpType"
                  type="radio"
                  checked={type === "-"}
                  value="-"
                  onChange={handleChangeType}
                />
                <span>Despesa</span>
              </label>
            </div>
          </div>
          <div className="input-field">
            <input
              id="description"
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
            <label className="active" htmlFor="description">
              Descrição:
            </label>
          </div>
          <div className="input-field">
            <input
              id="category"
              type="text"
              value={category}
              onChange={handleCategoryChange}
            />
            <label className="active" htmlFor="category">
              Categoria:
            </label>
          </div>
          <div style={{ width: "25%" }} className="input-field">
            <input
              value={value}
              id="value"
              type="number"
              step="0.01"
              className="validate"
              onChange={handleValueChange}
            />
            <label className="active" htmlFor="jurosMensal">
              Valor:
            </label>
          </div>
          <div className="input-field">
            <input
              id="yearMonthDay"
              type="date"
              value={yearMonthDay}
              onChange={handleYearMonthDayChange}
            />
            <label className="active" htmlFor="yearMonthDay">
              Data:
            </label>
          </div>
          <div className={styles.flexRow} style={{ marginTop: "40px" }}>
            <span style={{ color: "red", fontWeight: "bold" }}>
              <strong>{errorMessage}</strong>
            </span>
            <button
              className="waves-effect waves-lights btn green dark-4 right"
              onClick={handleFormSubmit}
              disabled={errorMessage.trim().length > 0}
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
