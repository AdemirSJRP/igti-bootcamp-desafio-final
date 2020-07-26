import http from "../http-common.js";

const getByPeriod = (period) => {
  return http.get("/transaction", { params: { period } });
};

const getPeriods = () => {
  return http.get("/transaction/periods");
};

export default { getByPeriod, getPeriods };
