import React from "react";
import * as fmt from "./Helpers/formatHelpers.js";

export default function Summary({ value }) {
  const { lancamentos, despesas, receitas, saldo } = value;
  const saldoClassName =
    saldo >= 0 ? "green-text darken-1" : "red-text darken-1";
  return (
    <div className="row card-panel w-100 m-0 teal lighten-4 d-flex justify-content-between align-items-center">
      <div className="col-s3">
        Lançamentos: <strong>{lancamentos}</strong>
      </div>
      <div className="col-s3">
        Receitas:{" "}
        <strong className="green-text darken-1">
          {fmt.formatMoney(receitas)}
        </strong>
      </div>
      <div className="col-s3">
        Despesas:{" "}
        <strong className="red-text darken-1">
          {fmt.formatMoney(despesas)}
        </strong>
      </div>
      <div className="col-s3">
        Saldo:{" "}
        <strong className={saldoClassName}>{fmt.formatMoney(saldo)}</strong>
      </div>
    </div>
  );
}
