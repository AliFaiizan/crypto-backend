// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import 'hardhat/console.sol';

contract GMUNFT is ERC721URIStorage{
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
        uint indexed tokenId,
        address seller,
        address owner,
        uint price,
        bool sold
    );
    constructor() ERC721("GMUTokens", "GMUN") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint _ListingPrice) public payable{
       require(owner == msg.sender, "Only marketplace owner can update the listing price"); 

       listingPrice=_ListingPrice;

    }

    function getlistingPrice() public view returns(uint){
        return listingPrice;
    }

    function createToken(string memory tokenURI,uint256 price) public  payable returns(uint){
        //check for price first before minting the token
        // require(msg.value>0,"Price must be atleast 1 wei");
        require(msg.value == listingPrice, "price must be equal to listing price");

        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId,price);

        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private{

        // As the token is minted now we will tranfer it to the buyer address
        idToMarketItem[tokenId]=MarketItem(tokenId,payable(msg.sender),payable(address(this)),price,false);

        _transfer(msg.sender,address(this),tokenId);

        emit MarketItemCreated(tokenId,msg.sender,address(this),price,false);

    }

    function resellToken(uint256 tokenId, uint256 price) public payable{
        require(idToMarketItem[tokenId].owner==msg.sender,"only owner can resell the token");
        require(msg.value==listingPrice,"price must be equal to listing price");

        idToMarketItem[tokenId].sold=false;
        idToMarketItem[tokenId].price=price;
        idToMarketItem[tokenId].seller=payable(msg.sender); //seller is person
        idToMarketItem[tokenId].owner=payable(address(this));//buyer is market
        
        _itemsSold.decrement();
        _transfer(msg.sender,address(this),tokenId);
    }
    //This will execute the sale 
    function createMarketSale(uint tokenId)public payable{
        uint tokenPrice=idToMarketItem[tokenId].price;

        require(msg.value==tokenPrice,"please submit the asking price to complete the purchase");
        // crete sale from market to the buyer
        idToMarketItem[tokenId].owner=payable(msg.sender);
        idToMarketItem[tokenId].sold=true;
        idToMarketItem[tokenId].seller=payable(address(0));

        _itemsSold.increment();
        // transfer the ownership
        _transfer(address(this),msg.sender,tokenId);
        //take ether from buyer
        payable(owner).transfer(listingPrice);
        // and send it to the seller
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
    }

    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint itemCount=_tokenIds.current();
        uint unsoldItemCount=_tokenIds.current()-_itemsSold.current();
        uint currentIndex=0;
 
        MarketItem[] memory items=new MarketItem[](unsoldItemCount);
        for(uint i=0;i<itemCount;i++){
            if(idToMarketItem[i+1].owner==address(this)){
                uint currentId=i+1;
                MarketItem storage currentItem=idToMarketItem[currentId];
                items[currentIndex]=currentItem;
                currentIndex+=1;
            }
        }
        return items;
    }
     //fetching all nfs
    function fetchMyNFTs() public view returns (MarketItem[] memory){
        uint totalItemCount=_tokenIds.current();
        uint itemCount=0;
        uint currentIndex=0;

        for(uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].owner==msg.sender){
                itemCount+=1;
            }
        }
        MarketItem[] memory items=new MarketItem[](itemCount);
         for(uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].owner==msg.sender){
                uint currentId=i+1;
                MarketItem storage currentItem=idToMarketItem[currentId];
                items[currentIndex]=currentItem;
                currentIndex+=1;
            }
        }
        return items;
    }

    function fetchItemsListed()public view returns (MarketItem[] memory){
        uint totalItemCount=_tokenIds.current();
        uint itemCount=0;
        uint currentIndex=0;

        for(uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].seller==msg.sender){
                itemCount+=1;
            }
        }
        MarketItem[] memory items=new MarketItem[](itemCount);
        for(uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].seller==msg.sender){
                uint currentId=i+1;
                MarketItem storage currentItem=idToMarketItem[currentId];
                items[currentIndex]=currentItem;
                currentIndex+=1;
            }
        }
        return items;
    }

    // function awardItem(address player, string memory tokenURI)
    //     public
    //     returns (uint256)
    // {
    //     _tokenIds.increment();

    //     uint256 newItemId = _tokenIds.current();
    //     _mint(player, newItemId);
    //     _setTokenURI(newItemId, tokenURI);

    // //     return newItemId;
    // // }
}
