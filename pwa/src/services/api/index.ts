import axios from 'axios'
import { getAuthToken, setAuthToken } from '../../utils/tokenHandler'
import { Stock, Transaction } from './types'

export default class API {

    // Backend connection.
    private static client = axios.create({
        baseURL: 'http://stock-tracker-backend.herokuapp.com/'
    })

    /**
     * Sends a login form to the backend in order to fetch the JWT authorization token.
     * The token itself is then stored in async storage and is NOT returned by this function.
     * @param username 
     * @param password 
     */
    static async postLogin(username: string, password: string): Promise<void> {
        const loginForm = new FormData()

        loginForm.append('username', username)
        loginForm.append('password', password)

        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

        try {
            const { data } = await this.client.post('auth/token', loginForm, { headers })
            await setAuthToken(data.access_token)
        }
        catch (error) {
            alert(error)
        }
    }

    /**
     * Registers a new user on the backend.
     * @param username 
     * @param email 
     * @param password 
     */
    static async postRegister(...[username, email, password]: string[]): Promise<void> {
        const data = {
            username,
            email,
            password
        }

        try {
            await this.client.post('auth/register', data)
        }
        catch (error) {
            alert(error)
        }
    }

    // Abstraction of the Authorization headers creation fetching the token from async storage.
    private static async authHeaders(): Promise<{ Authorization: string }> {
        const token = await getAuthToken()
        return { Authorization: `Bearer ${token}` }
    }


    /*
    Authenticated Operations: operations that can only be called after login. Each
    operation depends on the authorization token to access backend data. 
    */

    /**
     * Fetches from backend all data for currently owned stocks.
     * @returns A map object of each stock data identified by it's ticker (syhmbol).
     */
    static async getStocksData(): Promise<Map<string, Stock>> {
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

    /**
     * Fetches data for all transaction operations for a single stock 
     * @param ticker
     * @returns An array with all transactions made by the user for that specific
     * stock ticker.
     */
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

    /**
     * Creates a new transaction (buy or sell) register on the backend.
     * @param transaction 
     */
    static async postNewTransaction(transaction: Transaction): Promise<void> {
        const headers = await this.authHeaders()

        try {
            await this.client.post('transactions', transaction, { headers })
        }
        catch (error) {
            alert(error)
        }
    }
}
