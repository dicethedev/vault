// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IVault {
    struct BeneficiaryProperties {
        uint amountAllocated;
        address beneficiary;
        uint time;
        bool status;
    }

     function createGrant(address _beneficiary, uint _time) external payable returns(uint);
     function withdrawAmount(uint _id) external;
      function withdraw(uint _id) external;
    function getBalance() external view returns (uint256 bal);
    function getAllBeneficiary() external view returns(BeneficiaryProperties[] memory _bp);
}