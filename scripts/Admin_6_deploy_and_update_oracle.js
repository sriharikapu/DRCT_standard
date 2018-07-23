/**
*Deploy new oracle with updated API information and 
*update the factory using deprecated oracle.
*/
var MasterDeployer = artifacts.require("MasterDeployer");
var Oracle = artifacts.require("Oracle");
var Factory = artifacts.require("Factory");

/**
*@dev Current Oracle API's that can be used for BTC/USD or ETH/USD:
* "json(https://api.gdax.com/products/BTC-USD/ticker).price"
* "json(https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT).price"
* "json(https://api.gdax.com/products/ETH-USD/ticker).price"
* "json(https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT).price"
*
*Update oracle APIs(two are needed, the second one is used as backup)
*/

//var _oracle_api = "json(https://api.gdax.com/products/ETH-USD/ticker).price";
//var _oracle_api2 = "json(https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT).price";
//var _factory = "0xa18e394d8de8f0203fa89b9f35212a2ecbede48a";

var _oracle_api = "json(https://api.gdax.com/products/BTC-USD/ticker).price";
var _oracle_api2 = "json(https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT).price";
var _factory = "0x5dbc9e739bcc518c4ce3084e597117eb0dc929e6";

module.exports =async function(callback) {
    let factory;
    let oracle;
    factory = await Factory.at(_factory);
    oracle = await Oracle.new(_oracle_api,_oracle_api2);
    await factory.setOracleAddress(oracle.address);
    console.log('Factory : ',factory.address);
    console.log('Oracle: ',oracle.address);
}
