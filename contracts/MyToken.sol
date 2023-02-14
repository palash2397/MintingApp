// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MyToken is ERC1155, Ownable, Pausable, ERC1155Supply {
    uint256 public cost;
    uint256 public maxSupply;
    uint256 public primeCost;
    uint256 private idLimit;
    uint256 public userLimit;

    constructor(
        uint256 _cost,
        uint256 _maxSupply,
        uint256 _primeCost,
        uint256 _idLimit,
        uint256 _userLimit
    ) ERC1155("ipfs://Qmaa6TuP2s9pSKczHF4rwWhTKUdygrrDs8RmYYqCjP3Hye/") {
        cost = _cost;
        maxSupply = _maxSupply;
        primeCost = _primeCost;
        idLimit = _idLimit;
        userLimit = _userLimit;
    }

    mapping(address => bool) private primeList;
    mapping(address => uint256) private limitperUser;

    function setPrimeList(address[] calldata addressess) external onlyOwner {
        for (uint256 i = 0; i < addressess.length; i++) {
            primeList[addressess[i]] = true;
        }
    }

    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    function setCost(uint256 _cost) external onlyOwner {
        cost = _cost;
    }

    function setPrimeCost(uint256 _primeCost) external onlyOwner {
        primeCost = _primeCost;
    }

    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        maxSupply = _maxSupply;
    }

    function setUserLimit(uint256 _userLimit) external onlyOwner {
        userLimit = _userLimit;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Supply Tracking
    function primeMint(uint256 id, uint256 amount) external payable {
        require(primeList[msg.sender], "you are not whitelisted");
        require(id <= idLimit, "you are minting wrong nft");
        require(limitperUser[msg.sender] + amount <= userLimit, "buying limit exceeded");
        require(msg.value == amount * primeCost, "Insuficient balance");
        require(totalSupply(id) + amount < maxSupply, " supply exceded");
        limitperUser[msg.sender] += amount;
        _mint(msg.sender, id, amount, "");
    }

    function publicMint(uint256 id, uint256 amount) external payable {
        require(msg.value == amount * cost, "Insufficient balance");
        require(id <= idLimit, "you are minting wrong nft");
        require(limitperUser[msg.sender] + amount <= userLimit, "buying limit exceeded");
        require(totalSupply(id) + amount < maxSupply, "Not enough nfts");
        limitperUser[msg.sender] += amount;
        _mint(msg.sender, id, amount, "");
    }

    // function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    //     external
    //     onlyOwner
    // {
    //     _mintBatch(to, ids, amounts, data);
    // }
    // function withdraw(address _addr) external onlyOwner{
    //     uint256 balance= address(this).balance;
    //     payable(_addr).transfer(balance);
    // }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
