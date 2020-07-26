const mongoose = require("mongoose");

let schema = mongoose.Schema({
  description: { type: String, required: true },
  value: { type: Number, required: true },
  category: { type: String, required: true },
  year: { type: Number, required: true },
  month: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 1 || value > 12)
        throw new Error("O Mês deve ser entre 1 e 12");
    },
  },
  day: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 1 || value > 28)
        throw new Error("O Dia deve ser entre 1 e 28");
    },
  },
  yearMonth: { type: String, required: true },
  yearMonthDay: { type: String, required: true },
  type: { type: String, required: true },
});

// schema.method("toJSON", function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

const TransactionModel = mongoose.model("transaction", schema);

module.exports = TransactionModel;
