import TransactionsRepository, {
  Balance,
} from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ListTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): ListTransactions {
    const transactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance();

    return {
      transactions,
      balance,
    };
  }
}

export default ListTransactionsService;
