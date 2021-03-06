/**
*This deploys MasterDeployer and Factory(after 
*the factory and DRCTLibrary are linked by updating the Factory.json 
*with the DRCTLibrary address. Note: remove the 0x from the DRCTLibrary
*address when updating the .json file).
*/

function sleep_s(secs) {
  secs = (+new Date) + secs * 1000;
  while ((+new Date) < secs);
}

var Factory = artifacts.require("Factory");
var MasterDeployer = artifacts.require("MasterDeployer");

/**
*@dev Update the addresses below. get these addresses from the log after running 
*4_Admin_setup.js
*/

var _master = "0xcd8e11dad961dad43cc3de40df918fe808cbda74"; //MAINNET
//var _master = "0xe8327b94aba6fbc3a95f7ffaf8dd568e6cd36616"; //rinkeby

module.exports =async function(callback) {
    let oracle;
    let factoryDud;
    let factory;
    let membership;
    let masterDeployer;
    let wrapped_ether;
    let exchange;

       factoryDud = await Factory.new(0);
        console.log("dud_factory:  ",factoryDud.address)
          sleep_s(10);
        masterDeployer = await MasterDeployer.at(_master);
        console.log("masterDeployer: ", masterDeployer.address);
          sleep_s(10);
        await masterDeployer.setFactory(factoryDud.address);
        console.log("set factory dud on masterDeployer");
          
}
