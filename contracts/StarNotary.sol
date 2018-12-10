pragma solidity ^0.4.23;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 { 

    struct Star {
        string name;
        string starStory;
        string ra;
        string dec;
        string mag;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo; 
    mapping(uint256 => uint256) public starsForSale;
    uint256[] tokens;   // just to loop thorough start info via created tokens to check the uniqueness in coordinate.

    function createStar(string _name, string _starStory, string _ra, string _dec, string _mag, uint256 _tokenId) public { 
        
        // Check if the Star with same coordinates already exists
        require(!checkIfStarExist(_ra, _dec, _mag), "Star already exists with the given coordinates, try new one");

        Star memory newStar = Star(_name, _starStory, _ra, _dec, _mag);
        tokenIdToStarInfo[_tokenId] = newStar;
        tokens.push(_tokenId);      // to track all created tokens for duplicate coordinate checking
        _mint(msg.sender, _tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender, "You are not the owner of this Star, Only owner can put Star for Sale.");

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0, "This Star is not in Sale.");
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost, "Price is not enough to buy this Star");

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);
        // if payment is excess, return the change
        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }

    function checkIfStarExist(string _ra, string _dec, string _mag) public view returns(bool){
        bool result = false;

        for(uint i = 0; i < tokens.length; i++){
            uint256 tempTokenId = tokens[i];
            Star memory tempStar = tokenIdToStarInfo[tempTokenId];

            if(keccak256(abi.encodePacked(tempStar.ra, tempStar.dec, tempStar.mag)) == keccak256(abi.encodePacked(_ra, _dec, _mag))){
                result = true;
            }
        }

        return result;

    }
}