export interface Stock {
    ticker: string
    total_invested: number
    total_sold: number
    currently_owned_shares: number
    average_bought_price: number
}

export interface Transaction {
    ticker: string
    quantity: number
    total_value: number
    timestamp?: number
    average_price?: number
}