const hre = require("hardhat");

async function main() {
  // Deploy IP Registry
  const IPRegistry = await hre.ethers.getContractFactory("IPRegistry");
  const ipRegistry = await IPRegistry.deploy();
  await ipRegistry.deployed();
  console.log("IP Registry deployed to:", ipRegistry.address);

  // Deploy License Registry
  const LicenseRegistry = await hre.ethers.getContractFactory("LicenseRegistry");
  const licenseRegistry = await LicenseRegistry.deploy(ipRegistry.address);
  await licenseRegistry.deployed();
  console.log("License Registry deployed to:", licenseRegistry.address);

  // Deploy Dispute Module
  const DisputeModule = await hre.ethers.getContractFactory("DisputeModule");
  const disputeModule = await DisputeModule.deploy();
  await disputeModule.deployed();
  console.log("Dispute Module deployed to:", disputeModule.address);

  // Print addresses for .env
  console.log("\nAdd these addresses to your .env file:");
  console.log(`VITE_IP_REGISTRY_ADDRESS=${ipRegistry.address}`);
  console.log(`VITE_LICENSE_REGISTRY_ADDRESS=${licenseRegistry.address}`);
  console.log(`VITE_DISPUTE_MODULE_ADDRESS=${disputeModule.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 