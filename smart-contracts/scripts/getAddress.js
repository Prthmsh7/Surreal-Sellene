const { ethers } = require("ethers");

async function main() {
  const privateKey = "0xad6f0fc1fc23fe343d8d1628b494de973ff22c9fcee87ba927a9e4b08ad46178";
  const wallet = new ethers.Wallet(privateKey);
  console.log("Your wallet address is:", wallet.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 