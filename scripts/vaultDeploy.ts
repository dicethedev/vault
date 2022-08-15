import { ethers } from "hardhat";

async function main() {

 let [user1, user2] = await ethers.getSigners();

// const lockedAmount = ethers.utils.parseEther("1");

const Vault = await ethers.getContractFactory("Vault");
const vault = await Vault.deploy();

await vault.deployed();

//this will send one ether along when deploying
const grantAmount = ethers.utils.parseEther("0.01");

console.log("vault contract deployed to this address: ", vault.address );

//createGrant is a function in the Vault.sol
 const createGrant = await vault.createGrant(user2.address, 0, {value: grantAmount});

 const newGrant = await createGrant.wait(); 
 console.log('value', grantAmount);

//  console.log("Compiled vault", vault.address);
//  console.log("My response", res);
 console.log("new Grant", newGrant);

   const contractBalance = await vault.connect(user1).getBalance();
  console.log("Your balance: ", contractBalance);

  const getBeneficiaries = await vault.connect(user1).getAllBeneficiary();
  console.log("All beneficiary", getBeneficiaries);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
console.error(error);
process.exitCode = 1;
});