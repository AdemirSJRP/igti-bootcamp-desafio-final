import React from "react";
import * as fmt from "./Helpers/formatHelpers.js";
import css from "./transactions.module.css";
export default function Transactions({
  transactions,
  selectTransaction,
  deleteTransaction,
}) {
  const { colDia, colValue, colButtons } = styles;

  const handleEditClick = ($event) => {
    selectTransaction(transactions.find((t) => t._id === $event.target.id));
  };

  const handleDeleteClick = ($event) => {
    deleteTransaction(transactions.find((t) => t._id === $event.target.id)._id);
  };

  return (
    <div className="m-0 w-100 d-flex flex-column justify-content-between">
      {transactions.length === 0 ? (
        <p>Nenhuma transação encontrada</p>
      ) : (
        <div>
          {transactions.map(
            ({ _id, day, type, category, value, description }) => {
              // const style = type === "+" ? earningStyle : expenseStyle;
              const style = type === "+" ? "green" : "red";
              const divClassName = `d-flex justify-content-between align-items-center ${css.cardItem} ${style} lighten-3`;
              const colDayClassName = `mr-3 text-center badge badge-${
                type === "+" ? "success" : "danger"
              }`;
              const deleteButtonClassName = `fa fa-2x fa-trash text-danger mx-1 ${css.pointer}`;
              const editButtonClassName = `fa fa-2x fa-edit text-primary mx-1 ${css.pointer}`;
              return (
                <div className={divClassName} key={_id}>
                  <div className={colDayClassName} style={colDia}>
                    {day}
                  </div>
                  <div className="d-flex flex-column flex-grow-1">
                    <strong>{category}</strong>
                    {description}
                  </div>
                  <div style={colValue}>{fmt.formatMoney(value)}</div>
                  <div style={colButtons}>
                    <i
                      id={_id}
                      className={editButtonClassName}
                      onClick={handleEditClick}
                    ></i>
                    <i
                      id={_id}
                      className={deleteButtonClassName}
                      onClick={handleDeleteClick}
                    ></i>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  colDia: { width: "5%", fontSize: "1.5em", fontWeight: "bold" },
  colValue: { width: "25%", fontSize: "1.2em", textAlign: "right" },
  colButtons: { width: "10%", textAlign: "right" },
};
