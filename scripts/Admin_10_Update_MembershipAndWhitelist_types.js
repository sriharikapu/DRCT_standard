/**
Use this to create new tokens
*/

function sleep_s(secs) {
  secs = (+new Date) + secs * 1000;
  while ((+new Date) < secs);
}
var Membership = artifacts.require("Membership");
var MasterDeployer = artifacts.require("MasterDeployer");
var Factory = artifacts.require("Factory");



/**
*@dev Update the factory address and the start date (o_startdate) 
*as epoch date to create tokens
*Update hdate to reflect the epoch date as a human readable date and type
*both hdate and type are only used to output to the console
*/

//var _master = "0x95b6cf3f13e34448d7c9836cead56bdd04a5941b"; //mainnet
//var _membership = "0xd33615c5ea5d703f06d237f6c56ff2400b564c77";// mainnet

//var _master = "0x95b6cf3f13e34448d7c9836cead56bdd04a5941b"; //rinkeby
var _membership = "0x620b6b6ac75ad9234eb6c533688ddd8a5948650e"; //rinkeby


//var type = "ETH/USD";
//var factory_address= "0xa6fc8ed0d94a33de24eda0c226546ffa3737358a";//7day rinkeby
//var factory_address= "0x29327a6718b00596abceb2da720f83725af8a7ba";//1 day rinkeby
//var factory_address = "0x8207cea5aa1a9047b6607611c2b5b3f04df7b0d3"; //7day mainnet

var type = "BTC/USD";
//var factory_address = "0x804870d9b8184e12444405e1ee114757b97897b8"; //7day rinkeby
var factory_address = "0x9ff0c23d9aba6cdde2c75b1b8c85c23e7d305aac"; //1day rinkeby
//var factory_address = "0x58ae23fd188a23a4f1224c3072fc7db40fca8d9c"; //7day mainnet

//var _whitelistTypes = [1,2,3];
var _memberFee = 2500000000000000;
var _swapFee = 500; //.05%


console.log( type, factory_address);
module.exports =async function(callback) {
/*      let membership = await Membership.at(_membership);
      console.log("membership address: ", membership.address);
      sleep_s(10);*/
      let factory = await Factory.at(factory_address);
      console.log("set factory");
      sleep_s(10);
/*      await membership.setFee(_memberFee);
      console.log('set Memberhip fee', _memberFee);*/
      await factory.setSwapFee(_swapFee);
      console.log('swapFee ', _swapFee);
      sleep_s(10);
/*    await factory.setWhitelistedMemberTypes(_whitelistTypes);
      console.log('whitelist types ', _whitelistTypes);
      sleep_s(10);*/

}
