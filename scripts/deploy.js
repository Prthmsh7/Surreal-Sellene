const hre = require("hardhat");

async function main() {
  // DeBridge gate address on Goerli
  const DEBRIDGE_GATE_ADDRESS = "0x43dE2d77BF8027e25dBD179B491e8d64f38398aA";

  console.log("Deploying DeBridgeHandler...");
  console.log("Using DeBridge Gate at:", DEBRIDGE_GATE_ADDRESS);
  
  const DeBridgeHandler = await hre.ethers.getContractFactory("DeBridgeHandler");
  const handler = await DeBridgeHandler.deploy(DEBRIDGE_GATE_ADDRESS);
  
  await handler.deployed();
  
  console.log("DeBridgeHandler deployed to:", handler.address);
  console.log("Transaction hash:", handler.deployTransaction.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 