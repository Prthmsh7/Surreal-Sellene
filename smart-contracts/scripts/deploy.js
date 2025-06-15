const hre = require("hardhat");

async function main() {
  const GATE_ADDRESS = "0x43de2d77bf8027e25dbd179b491e8d64f38398aa"; // Sepolia gate address

  const DeBridgeHandler = await hre.ethers.getContractFactory("DeBridgeHandler");
  const deBridgeHandler = await DeBridgeHandler.deploy(GATE_ADDRESS);

  await deBridgeHandler.waitForDeployment();

  console.log("DeBridgeHandler deployed to:", await deBridgeHandler.getAddress());
  console.log("Gate address:", GATE_ADDRESS);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 