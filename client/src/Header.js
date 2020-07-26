import React from "react";

export default function Header() {
  const imgSrc = "/img/igti_logo.png";
  return (
    <div className="row m-0 w-100">
      <div className="col m-0 s12 card-panel blue lighten-2">
        <div className="d-flex justify-content-start align-items-center">
          <img alt="Logo Igti" src={imgSrc} width="50" />
          <div className="d-flex w-100 flex-column align-items-center justify-content-center">
            <span className="h2">
              Bootcamp FullStack Developer - Desafio Final
            </span>
            <span className="h4 white-text">Controle Financeiro Pessoal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
