// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import 'hardhat/console.sol';

contract NFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice=0.025 ether;

    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem{
        uint tokenId;
        address payable seller;
        address payable owner;
        uint price;
        bool sold;
    }

    event MarketItemCreated(
        uint indexed itemId,
        uint indexed tokenId,
        address seller,
        address owner,
        uint price,
        bool sold
    );
    constructor() ERC721("NFT", "NFT") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint _ListingPrice) public payable{
       require(owner==msg.sender, "Only marketplace oner can update the listing price") 

       listingPrice=_ListingPrice;
    }



    function awardItem(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
