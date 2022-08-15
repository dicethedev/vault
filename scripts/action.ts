require("dotenv").config({ path: ".env" });
import { BytesLike } from "ethers";
import { ethers } from "hardhat";

const main = async () => {
    let provider = {
        PrivateKey: process.env.PRIVATE_KEY as BytesLike,
        URL: process.env.ROPSTEN_RPC_URL,
    }

    const provider2 = ethers.getDefaultProvider("ropsten", provider.URL);
    let wallet = new ethers.Wallet(provider.PrivateKey, provider2);
    const _value = ethers.utils.parseEther("0.01");

    const CONTRACTADDRESS = "0xdDd868bF1C4F033090Bf341128EB1D1f0865EA32";
    const _vault = await ethers.getContractAt("IVault", CONTRACTADDRESS);

    //CREATE GRANT
    // await _vault.createGrant("0x12896191de42EF8388f2892Ab76b9a728189260A", 0, { value: _value });

    /// GET CONTRACT BALANCE
    // const bal = await VAULT.getBalance();
    // console.log("Contract Balance: ", Number(bal._hex));

    /// GET BENEFICIARY BALANCE
    // const benBal = await VAULT.getBeneficiaryBalance(2);
    // console.log("Beneficiary Balance: ", Number(benBal._hex));

    /// GET ALL BENEFICIARY
    // const allBen = await VAULT.getAllBeneficiary();
    // console.log("ALL BEN: ", allBen);

    /// BENEFICIARY WITHDRAW FUNDS
    const user = await _vault.withdraw(1);
    console.log("Reached: ", user);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});