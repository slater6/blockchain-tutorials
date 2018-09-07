const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "bonus eagle scatter ski lab permit sentence cattle harbor police wish donate",
  "https://rinkeby.infura.io/v3/d17bbb5f7cf240599d2493429f2ba2bf"
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: "0x" + bytecode
      })
      .send({ from: accounts[0] });
    console.log("Interface:", interface);
    console.log("Contract deployed to", result.options.address);
  } catch (error) {
    console.log(error);
  }
};

deploy();
