// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Vault {
  // a contract where the owner create grant for a beneficiary;
//allows beneficiary to withdraw only when time elapse
//allows owner to withdraw before time elapse
//get information of a beneficiary
//amount of ethers in the smart contract

//*********** state variables ********/
 address public owner;
 uint ID = 1;

  struct BeneficiaryProperties{
    uint amountAllocated;
    address beneficiary;
    uint time;
    bool status;
  }

  mapping(uint => BeneficiaryProperties) public _beneficiaryProperties;

  //owner to control the access to the contract
  modifier onlyOwner() {
      require(msg.sender == owner, "only owner has access");
      _;
  }

      //the timelapse Function
   modifier hasTimeElapse(uint _id){
    BeneficiaryProperties memory c = _beneficiaryProperties[_id];
    require(block.timestamp >= c.time, "chief, time has not reached");
    _;
}
  

//uint to get the array of all beneficiary in the contract
 uint[] id;
 BeneficiaryProperties[] public bp;

  constructor() {
      //the owner that can call the address in the contract
      owner = msg.sender;
  }

  function createGrant(address _beneficiary, uint _time) external payable returns(uint){
      require(msg.value > 0, "zero ether is not allow here");
      BeneficiaryProperties storage c = _beneficiaryProperties[ID];
      c.time = _time;
      c.beneficiary = _beneficiary;
      c.amountAllocated = msg.value;
      uint _id = ID;
      id.push(_id);
      bp.push(c);
      //it can also be ID + 1
      ID++;
      return _id;
  }

   function withdrawAmount(uint _id, uint _withdrawAmount) external hasTimeElapse(_id) {

    BeneficiaryProperties storage BP = _beneficiaryProperties[_id];
    address user = BP.beneficiary;
    uint _amount = BP.amountAllocated;
    require(user == msg.sender, "not a beneficiary for a grant");
    require(_amount > 0, "you  have no money!");
    require(_amount >= _withdrawAmount, "I think you have less you want to withdraw");

    //getBalance function is passed inside here
    uint getBal = getBalance();
    require(getBal >= _amount, "insufficient");
    // BP.amountAllocated = 0;
    BP.amountAllocated = _amount - _withdrawAmount;
    payable(user).transfer(_withdrawAmount);

   }

//   The Assignment: write a new withdraw function that allows the grant 
//   beneficiary to withdraw any amount he/she choses, not the predefined 
//   version we have now. Tip: There are some things you have to check.

  //  function withdrawSpecificAmount(address payable beneficiary, uint256 amountAllocated) external {
  //   (bool success,) = beneficiary.call{value: amountAllocated}("");
  //    require(success, "Failed to withdraw Ether");
  //  }

   function RevertGrant(uint _id) external onlyOwner {
    BeneficiaryProperties storage BP = _beneficiaryProperties[_id];
    uint _amount = BP.amountAllocated;
    BP.amountAllocated = 0;
    payable(owner).transfer(_amount); 
}

  function returnBeneficiaryInfo(uint _id) external view returns(BeneficiaryProperties memory e ){
    e = _beneficiaryProperties[_id];  
}

   function getBalance() public view returns(uint256 bal){
      bal = address(this).balance;
  }

  //using array to get all the beneficiary
  function getAllBeneficiary() external view returns(BeneficiaryProperties[] memory _bp){
    uint[] memory all = id;
    _bp = new BeneficiaryProperties[](all.length);

    for(uint i = 0; i < all.length; i++){
        _bp[i]=_beneficiaryProperties[all[i]];
    }
  }
}
