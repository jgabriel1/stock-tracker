* stock info repository will create a stock info entity and list all infos available by id,
* stock balance repository will perform the reduce actions in the database, we'll treat it as a separate entity,

- Ultimate stock listing will start by querying the balance repository to get a list of all balances identified by the stock id and then, with the list of stock ids, the stock infos repository will be queried to get the
ticker and fullName properties of that specific stock. After that, having all the tickers, the price information repository will be then evoked in order to get the price information. After all that, EITHER the calculator service will be called and it will return the final data that will be thrown by the usecase, OR, all the data will be set to the Stock model and it will "statefully" calculate each information (totalInvested and currentWorth)


