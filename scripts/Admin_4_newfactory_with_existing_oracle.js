/**
Deploy new factory
*/
 
var Oracle = artifacts.require("Oracle");
var Wrapped_Ether = artifacts.require("Wrapped_Ether");
var Factory = artifacts.require("Factory");
var MasterDeployer = artifacts.require("MasterDeployer");
var UserContract= artifacts.require("UserContract");
var Deployer = artifacts.require("Deployer");

/**
*@dev Current Oracle API's that can be used for BTC/USD or ETH/USD:
* "json(https://api.gdax.com/products/BTC-USD/ticker).price"
* "json(https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT).price"
* "json(https://api.gdax.com/products/ETH-USD/ticker).price"
* "json(https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT).price"
*/

/**
*@dev Update oracle APIs(two are needed, the second one is used as backup),
*and factory details(duration, multiplier, swapFee)
*the type is only used to print to the console.
*/
//var _oracle_api = "json(https://api.gdax.com/products/ETH-USD/ticker).price";
//var _oracle_api2 = "json(https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT).price";
var type = "BTC/USD";
var  duration = 1;
var multiplier = 1;
var swapFee = 0;

/**
*@dev Update the addresses below. get these addresses from the log after running 
*4_Admin_setup.js
*/
//BTC oracle
var _oracle = "0xf6d293faa7321d671b24a3a6abb224b1b1aaefde";

//ETH oracle
//var _oracle = "0xf0d3fdb12f118ed3f64c6f0c373365ae21849206";


var _master = "0xf4ba99fdf2fabd797d2f5a1d22a30556abe74579";
var _member = "0xdcff3a825f6ab9a861bdf481017d91b25ac980a4";
var _wrapped = "0xc733a8ba37590e71096f10b23a049f3a30386c6f";

module.exports =async function(callback) {
    console.log("Type,duration, multiplier, swapFee")
    var  ar = [type,duration,multiplier, swapFee];
    console.log(ar.join(', '));
    let masterDeployer = await MasterDeployer.at(_master);
    let factory;
    let base;
    let deployer;
    let userContract;
    let oracle;
      let res = await masterDeployer.deployFactory();
      res = res.logs[0].args._factory;
      factory = await Factory.at(res);
      await factory.setVariables(1000000000000000, duration, multiplier, swapFee);
      await factory.setMemberContract(_member);
      await factory.setWhitelistedMemberTypes([0]);
      base = await Wrapped_Ether.at(_wrapped);
      userContract = await UserContract.new();
      deployer = await Deployer.new(factory.address);
      await factory.setBaseToken(base.address);
      await factory.setUserContract(userContract.address);
      await factory.setDeployer(deployer.address);
      await factory.setOracleAddress(_oracle);
      await userContract.setFactory(factory.address);
      console.log('Factory : ',factory.address);
      console.log('Oracle: ',_oracle);
      console.log('Deployer: ',deployer.address);
      console.log('UserContract: ',userContract.address);
      console.log('BaseToken: ',base.address);
    console.log("MasterDeployer, Type,duration, multiplier, swapFee, Factory, Oracle, Deployer, UserContract, BaseToken")
    var  ar = [masterDeployer.address,type,duration,multiplier, swapFee, factory.address, _oracle, deployer.address, userContract.address, base.address];
    console.log(ar.join(', '));

}