import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialValue = 0;

    const income = this.transactions.reduce(
      (sum, transaction) =>
        sum + (transaction.type === 'income' ? transaction.value : 0),
      initialValue,
    );

    const outcome = this.transactions.reduce(
      (sum, transaction) =>
        sum + (transaction.type === 'outcome' ? transaction.value : 0),
      initialValue,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
