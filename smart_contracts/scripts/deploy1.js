const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploy the ERC20 token contract implementation
  const ERC20Implementation = await ethers.getContractFactory("IDToken"); // Replace with the actual implementation
  const erc20 = await ERC20Implementation.deploy();
  await erc20.deployed();

  console.log("ERC20 implementation deployed to:", erc20.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });