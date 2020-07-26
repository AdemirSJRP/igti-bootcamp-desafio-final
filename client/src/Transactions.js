import React from "react";
import * as fmt from "./Helpers/formatHelpers.js";
import css from "./transactions.module.css";
export default function Transactions({ transactions }) {
  //   const { expenseStyle, earningStyle } = styles;
  const { colDia, colValue, colButtons } = styles;
  return (
    <div className="m-2 p-2 w-100 d-flex flex-column justify-content-between">
      {transactions.length === 0 ? (
        <p>Nenhuma transação encontrada</p>
      ) : (
        <div>
          {transactions.map(
            ({ id, day, type, category, value, description }) => {
              // const style = type === "+" ? earningStyle : expenseStyle;
              const style = type === "+" ? "green" : "red";
              const className = `d-flex justify-content-between align-items-center ${css.cardItem} ${style} lighten-3`;
              const deleteButtonClassName = `fa fa-trash text-danger mx-1 ${css.pointer}`;
              const editButtonClassName = `fa fa-edit text-primary mx-1 ${css.pointer}`;
              return (
                <div className={className} key={id}>
                  <div className="text-center" style={colDia}>
                    {day}
                  </div>
                  <div className="d-flex flex-column flex-grow-1">
                    <strong>{category}</strong>
                    {description}
                  </div>
                  <div style={colValue}>{fmt.formatMoney(value)}</div>
                  <div style={colButtons}>
                    <i className={deleteButtonClassName}></i>
                    <i className={editButtonClassName}></i>
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

// const styles = {
//   expenseStyle: {
//     backgroundColor: "#c0392b",
//     color: "white",
//     padding: "10px",
//     display: "flex",
//     fontFamily: "Consolas",
//   },
//   earningStyle: {
//     backgroundColor: "#27ae60",
//     color: "white",
//     padding: "10px",
//     display: "flex",
//     fontFamily: "Consolas",
//   },
// };
