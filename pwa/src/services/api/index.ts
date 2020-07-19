import axios from 'axios'
import { getAuthToken } from '../../utils/tokenHandler'
import { StockInfo } from '../../pages/Dashboard'

interface Transaction {
    ticker: string
    quantity: number
    total_value: number
}

export default class API {

    private static client = axios.create({
        baseURL: 'http://192.168.2.2:8000'
    })

    private static async authHeaders(): Promise<{ Authorization: string }> {
        const token = await getAuthToken()
        return { Authorization: `Bearer ${token}` }
    }

    static async getStocksData(): Promise<Map<string, StockInfo>> {
        const headers = await this.authHeaders()

        try {
            const { data } = await this.client.get('stocks', { headers })
            return new Map(Object.entries(data.stocks))
        }
        catch (error) {
            alert(error)
            return new Map()
        }
    }

    static async getTransactionsFor(ticker: string): Promise<Transaction[]> {
        const headers = await this.authHeaders()
        const params = { ticker }

        try {
            const { data } = await this.client.get('transactions', {
                headers,
                params,
            })
            return data.transactions
        }
        catch (error) {
            alert(error)
            return []
        }
    }

    static async postNewTransaction(transaction: Transaction) {
        const headers = await this.authHeaders()

        try {
            await this.client.post('transactions', transaction, { headers })
        }
        catch (error) {
            alert(error)
        }
    }
}