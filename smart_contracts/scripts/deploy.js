const { ethers, upgrades } = require("hardhat");

async function main() {
 // Deploy the InvoiceDiscounting contract
 const InvoiceDiscounting = await ethers.getContractFactory("InvoiceDiscounting");
 const invoiceDiscounting = await InvoiceDiscounting.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3", 2);

 await invoiceDiscounting.deployed();

 console.log("InvoiceDiscounting deployed to:", invoiceDiscounting.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });





