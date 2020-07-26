import http from "../http-common.js";

const getByPeriod = (period) => {
  return http.get("/transaction", { params: { period } });
};

const getPeriods = () => {
  return http.get("/transaction/periods");
};

const updateTransaction = (transaction) => {
  return http.put(`/transaction/${transaction._id}`, transaction);
};

const addTransaction = (transaction) => {
  return http.post(`/transaction`, transaction);
};

const deleteTransaction = (id) => {
  return http.delete(`/transaction/${id}`);
};

export default {
  getByPeriod,
  getPeriods,
  updateTransaction,
  addTransaction,
  deleteTransaction,
};
