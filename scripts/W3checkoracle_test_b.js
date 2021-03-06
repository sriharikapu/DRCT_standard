/**
*Checks the oracle value after the query was sent.
*Daily_1_OracleQuery_db.js has to be ran first.
*/
var Oracle = artifacts.require("Oracle");
var MasterDeployer = artifacts.require("MasterDeployer");
var Factory = artifacts.require("Factory");
var _date = 1532390400;

/**
*@dev Update the Master Deployer contract. This will loop through each
*factory associated with the master deployer(_master) specified.
*_nowUTC is only used to display a human readable date on the console.
*/
var _master = "0xb9910c2269cb3953e4b4332ef6f782af97a4699f"; 
var _factory = "0xa89e5d248b37e895d12f4c6853b65b6ee1966870";
var _nowUTC  = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');


module.exports =async function(callback) {
 
    let masterDeployer = await MasterDeployer.at(_master);
    var count = parseInt(await masterDeployer.getFactoryCount());
    console.log("Factory_count, UTCtime, factory_address, oracle_address, value, link");

    for(i = 1; i <= count; i++){
        var factory_address = await masterDeployer. getFactorybyIndex(i);
        let factory = await Factory.at(factory_address);
        let oracle_address = await factory.oracle_address.call();
        let oracle = await Oracle.at(oracle_address);
 		var value =  await oracle.retrieveData(_date);
        var value1= value/1000;
        var link = "".concat('<https://rinkeby.etherscan.io/address/',oracle_address,'>' );
        var ar = [count, _nowUTC, factory_address, oracle_address,  value1, link];
        console.log(ar.join(', '));
        
  	}
}
