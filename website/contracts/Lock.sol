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

    function getlistingPrice() public view returns(uint){
        return listingPrice;
    }

    function createToken(string memory tokenURI) public  payable returns(uint){
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId,price);

        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private{
        require(price>0,"Price must be atleast 1 wei");
        require(msg.value == listingPrice, "price must be equal to listing price");

        idtoMarketItem[tokenId]=MarketItem(tokenId,payable(msg.sender),payable(address(this)),price,false);

        _transfer(msg.sender,address(this),tokenId);

        emit MarketItemCreated(tokenId,msg.sender,address(this),price,false);

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
