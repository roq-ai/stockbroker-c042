import { UserInterface } from 'interfaces/user';
import { BrokerageInterface } from 'interfaces/brokerage';
import { GetQueryInterface } from 'interfaces';

export interface InvestmentInterface {
  id?: string;
  amount: number;
  user_id?: string;
  brokerage_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  brokerage?: BrokerageInterface;
  _count?: {};
}

export interface InvestmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  brokerage_id?: string;
}
