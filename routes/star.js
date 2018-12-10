const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const abi = require('../abi');


let mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
let url = "https://rinkeby.infura.io/v3/be9d024d909640488b2bda05ae3eef39";
let provider = new HDWalletProvider(mnemonic, url);
let web3 = new Web3(provider);
let starNotary;


router.get('/:tokenId', (req, res) => {
    getStarInfo(req, res);
});

function getStarInfo(req, res) {
    // Check if tokenId provided in url is valid integer
    let tokenId = parseInt(req.params.tokenId, 10);

    if(isNaN(tokenId) || tokenId < 0){
        res.json({error: "Invalid token id, unsigned integer value is required"});
        return;
    }
    console.log("Number is valid");
    web3.eth.getAccounts().then((accounts) => {

        console.log(accounts);
        //  Create contract from abi
        try {
            starNotary = new web3.eth.Contract(abi, '0x7AC7b76f98Ea87Ee9932C99e99E487e868543b96', {
                from: accounts[0], // default from address
                gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
            });
        } catch (error) {
            console.log("Error in creating contract from abi " + error);
            res.json({error: "error occured while creating contract from abi"});
            return;
        }

        starNotary.methods.tokenIdToStarInfo(tokenId).call((error, result) => {
            if (!error) {
                console.log(result);

                if (result.name == "") {  // No star exist in given token ID
                    res.json({message: "NOT FOUND!, No Star exist in given token ID"});
                } else {
                    res.json([result.name, result.starStory, result.ra, result.dec, result.mag]);
                }

            } else {
                res.json({error: "Error occured on fetching star info"});
                console.log("Error in tokenIdToStarInfo() " + error);
            }

        });
    });

}
module.exports = router;