// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintingApp is
    Initializable,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    ERC721EnumerableUpgradeable,
    PausableUpgradeable,
    OwnableUpgradeable,
    ERC721BurnableUpgradeable,
    ERC2981Upgradeable
{
    using Strings for uint256;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private tokenIdCount;

    IERC20Upgradeable public token;
    uint256 public cost;
    string public baseURI;
    string public baseExtension;
    uint256 public maxUserLimit;
    uint256 public maxSupply;
    bytes32 private merkleRoot;

    // Events
    event BoughtNFT(address indexed to, uint256 amount);

    // Mapping
    mapping(address => uint256) private limitperUser;

    function initialize(
        string memory _name,
        string memory _symbol,
        address _addr,
        string memory _baseUri,
        string memory _baseExtension,
        uint256 _maxUserLimit,
        uint256 _cost,
        uint256 _maxSupply
    ) public initializer {
        __ERC721_init(_name, _symbol);
        __ERC721URIStorage_init();
        __ERC721Enumerable_init();
        __Pausable_init();
        __Ownable_init();
        __ERC721Burnable_init();
        __ERC2981_init();
        __ERC2981_init_unchained();
        token = IERC20Upgradeable(_addr);
        baseURI = _baseUri;
        baseExtension = _baseExtension;
        maxUserLimit = _maxUserLimit;
        cost = _cost;
        maxSupply = _maxSupply;
    }

    function setCost(uint256 _cost) external onlyOwner {
        cost = _cost;
    }

    function setmaxUserLimit(uint256 _maxUserLimit) external onlyOwner {
        maxUserLimit = _maxUserLimit;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function getMerkleRoot() external view returns (bytes32) {
        return merkleRoot;
    }

    modifier checkWhitelist(bytes32[] memory _merkleProof) {
        bytes32 sender = keccak256(abi.encodePacked(_msgSender()));
        require(MerkleProofUpgradeable.verify(_merkleProof, merkleRoot, sender), "you are not whitelisted");
        _;
    }

    function buyNFT(bytes32[] calldata _proof, uint256 nftQty) external checkWhitelist(_proof) {
        uint256 tokenBalance = token.balanceOf(msg.sender);
        require(tokenBalance >= nftQty * (cost), "Insufficient balance");
        require(limitperUser[msg.sender] + nftQty <= maxUserLimit, "buying limit exceeded");
        require(tokenIdCount.current() + nftQty <= maxSupply, "Not enough tokens");

        for (uint256 i; i < nftQty; ) {
            tokenIdCount.increment();
            uint256 _id = tokenIdCount.current();
            _safeMint(_msgSender(), _id);
            i++;
        }

        limitperUser[msg.sender] += nftQty;
        token.transferFrom(msg.sender, owner(), nftQty * (cost));
        emit BoughtNFT(_msgSender(), nftQty);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721Upgradeable, IERC721Upgradeable) {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
        _safeTransfer(from, to, tokenId, "");
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) external onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function withdrawAmount() external onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    function _burn(uint256 tokenId) internal override(ERC721Upgradeable, ERC721URIStorageUpgradeable) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable, ERC2981Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
