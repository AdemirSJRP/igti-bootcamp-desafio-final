const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const getByDescription = async (req, res) => {
  const searchExpression = req.query.description;
  try {
    if (!searchExpression) {
      res.send({
        error:
          'É necessário informar o parâmetro "description", cujo valor deve ser a descrição da transação que deseja buscar',
      });
      return;
    }
    const movs = await TransactionModel.find({
      description: { $regex: new RegExp(searchExpression), $options: "i" },
    });
    if (!movs) {
      res.status(404).send({
        error: `Nenhum movimento encontrado para a descrição ${searchExpression}`,
      });
    } else {
      res.send(movs);
    }
  } catch (error) {
    res.status(400).send({
      error: `Erro ao carregar movimentos com a descrição: ${searchExpression}`,
      error,
    });
  }
};

const getByPeriod = async (req, res) => {
  const yearMonth = req.query.period;
  try {
    if (!yearMonth) {
      res.send({
        error:
          'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
      });
      return;
    }
    const movs = await TransactionModel.find({ yearMonth: yearMonth });
    if (!movs) {
      res.status(404).send({
        error: `Nenhum movimento encontrado para o período ${yearMonth}`,
      });
    } else {
      res.send(movs.sort((a, b) => a.day - b.day));
    }
  } catch (error) {
    res.status(400).send({
      error: `Erro ao carregar movimentos do período: ${yearMonth}`,
      error,
    });
  }
};

const getPeriods = async (req, res) => {
  try {
    const movs = await TransactionModel.distinct("yearMonth");
    const months = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];
    const periodos = movs.sort().map((mov) => {
      const arr = mov.split("-");
      return {
        yearMonth: mov,
        yearStr: `${months[Number(arr[1]) - 1]}/${arr[0]}`,
      };
    });
    res.send(periodos);
  } catch (error) {
    res.status(400).send({
      error: `Erro ao carregar períodos`,
      error,
    });
  }
};

const create = async (req, res) => {
  const body = req.body;
  try {
    const newTransaction = new TransactionModel(body);
    const resp = await newTransaction.save();
    res.send(resp);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Erro em POST: /transaction",
      error,
    });
    console.log("Erro ao efetuar Post em /transaction", error);
  }
};

const update = async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).send({
        error: "Não existem dados para atualizar",
      });
    }
    const transaction = await TransactionModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!transaction) {
      res
        .status(404)
        .send(`Transação de Id ${id} não encontrada para atualizar`);
    } else {
      res.send(transaction);
    }
  } catch (error) {
    res
      .status(400)
      .send({ error: `Erro ao atualizar a transaction id: ${id}`, error });
    console.log(`Erro em PUT /transaction`, error);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(400).send({
        error: "O Id da transaction que deseja excluir não foi informado",
      });
    }
    const transaction = await TransactionModel.findByIdAndRemove(id);
    if (!transaction) {
      res.status(404).send({
        error: `Transaction de Id ${id} não encontrada para exclusão`,
      });
    } else {
      res.send(transaction);
    }
  } catch (error) {
    res.status(400).send({
      error: `Nao foi possivel deletar a transaction id: ${id}`,
      error,
    });
    console.log(`Erro em DELETE /transaction`, error);
  }
};

module.exports = {
  getByDescription,
  getByPeriod,
  getPeriods,
  create,
  update,
  remove,
};
