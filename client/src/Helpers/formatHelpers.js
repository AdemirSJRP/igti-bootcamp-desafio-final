const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatMoney(value) {
  return moneyFormatter.format(value);
}

function formatPercent(value) {
  return percentFormatter.format(value);
}

export { formatMoney, formatPercent };
