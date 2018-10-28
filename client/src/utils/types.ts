export interface ITransactionForm {
  currentTarget: {
    elements: {
      amount: HTMLInputElement
      category: HTMLInputElement
      date: HTMLInputElement
      notes: HTMLInputElement
      title: HTMLInputElement
      type: HTMLInputElement & { value: 'expense' | 'income' }
    }
  }
}

export interface ITransaction {
  _id: string
  amount: number
  category: string
  date: string
  notes?: string
  title: string
  type: 'expense' | 'income'
}

export interface IUser {
  email?: string
  password: string
  token: string
  username: string
}

export interface IApiError {
  message: string
  response: {
    status: number
    data: {
      message: string
    }
  }
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
