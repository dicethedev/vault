import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const time = currentTimestampInSeconds + 20;

 let [user1, user2, user3] = await ethers.getSigners();

// const lockedAmount = ethers.utils.parseEther("1");

const Vault = await ethers.getContractFactory("Vault");
const vault = await Vault.deploy();

await vault.deployed();

//this will send one ether along when deploying
const grantAmount = ethers.utils.parseEther("1");

console.log("vault contract deployed to this address: ", vault.address );

//createGrant is a function in the Vault.sol

  const res = await vault.connect(user2).createGrant(user2.address, time,
  {value: grantAmount});

 const data = await ( await res.wait() ); 
 console.log('value', grantAmount);

//  console.log("Compiled vault", vault.address);
//  console.log("My response", res);
 console.log("data", data);

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