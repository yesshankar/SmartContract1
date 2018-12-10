
// let web3;
let starNotary;
let account;    // default account
let abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "starsForSale",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tokenIdToStarInfo",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "starStory",
        "type": "string"
      },
      {
        "name": "ra",
        "type": "string"
      },
      {
        "name": "dec",
        "type": "string"
      },
      {
        "name": "mag",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_starStory",
        "type": "string"
      },
      {
        "name": "_ra",
        "type": "string"
      },
      {
        "name": "_dec",
        "type": "string"
      },
      {
        "name": "_mag",
        "type": "string"
      },
      {
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "createStar",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "putStarUpForSale",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "buyStar",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_ra",
        "type": "string"
      },
      {
        "name": "_dec",
        "type": "string"
      },
      {
        "name": "_mag",
        "type": "string"
      }
    ],
    "name": "checkIfStarExist",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }];



window.addEventListener('load', async () => {
  console.log('inside load event');
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      console.log('waiting for user to approve the connection to the wallet.....');
      // Request account access if needed
      await ethereum.enable();
      console.log('user grant the access');
      // Acccounts now exposed
      webThreeAvailable();
      // web3.eth.sendTransaction({/* ... */});
    } catch (error) {
      // User denied account access...
      console.log('User denied account access.')
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    console.log('connected via legacy dapp browser');
    // Acccounts always exposed
    webThreeAvailable();
    // web3.eth.sendTransaction({/* ... */});
  }
  // Non-dapp browsers...
  else {
    // Instantiate and set Ganache as your provider
    try {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
      // The default (top) wallet account from a list of test accounts 
      web3.eth.defaultAccount = web3.eth.accounts[0];
      webThreeAvailable();
    } catch (error) {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }
});

function webThreeAvailable() {
  console.log('inside webThreeAvailable()');
  let connectionStatus = document.getElementById('connectionStatus');

  web3.eth.getAccounts().then((result) => {
    account = result[0];
    web3.eth.defaultAccount = account;

    connectionStatus.innerHTML = "&#9745; Connected wiht Account: <b>" + web3.eth.defaultAccount + " </b>";
    connectionStatus.setAttribute("class", "green");

    try {

      starNotary = new web3.eth.Contract(abi, '0x7AC7b76f98Ea87Ee9932C99e99E487e868543b96', {
        from: account, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
      });
    } catch (error) {
      console.log(error);
    }
  });

}

// prevent page reload on form submission
document.getElementById('claim-form').addEventListener('submit', e => e.preventDefault());

function claimButtonClicked() {

  if (starNotary != undefined) {
    let name = document.getElementById('name').value;
    let ra = document.getElementById('ra').value;
    let dec = document.getElementById('dec').value;
    let mag = document.getElementById('mag').value;
    let tokenId = document.getElementById('tokenId').value;
    let starStory = document.getElementById('starStory').value;
    let claimStatus = document.getElementById('claimStatus');

    claimStatus.innerHTML = "Claiming...";
    document.getElementById('loader').style.display = "block";
    

    // Check if star already exist with the given star coordintates.
    starNotary.methods.checkIfStarExist(ra, dec, mag).call((error, result) => {
      if (!error) {
        if (result) {
          document.getElementById('loader').style.display = "none";
          claimStatus.innerText = "Sorry! Star with the given coordinates is already claimed, please claim New Star";
          claimStatus.setAttribute("class", "red");
          console.log("Sorry! Star with the given coordinates is already claimed, please claim New Star");
        } else {
          starNotary.methods.createStar(name, starStory, ra, mag, dec, Number(tokenId)).send()
            .on('transactionHash', (hash) => {
              document.getElementById('loader').style.display = "none";
              claimStatus.innerHTML = "Transaction submitted to the newtork Successfully";
              claimStatus.setAttribute("class", "green");
              console.log("Star Claimed Successfully");
              claimStatus.innerHTML += `<span> To view this transaction detail in Rinkeby Network
              <a href="https://rinkeby.etherscan.io/tx/${hash}" target="_blank">Click Here</a> 
              </span>`;
            })
            .on('Transfer', (from, to, tokenId) => {
              // claimStatus.innerHTML += "Star Claimed Successfully";
              // claimStatus.setAttribute("class", "green");
              // console.log("Star Claimed Successfully");
            })
            .on('error', (error) => {
              document.getElementById('loader').style.display = "none";
              claimStatus.innerHTML = "Sorry! Something went wrong, please check console";
              claimStatus.setAttribute("class", "red");
              console.log(error);
            });
        }

      } else {
        document.getElementById('loader').style.display = "none";
        claimStatus.innerHTML = "Sorry! Something went wrong, please check console";
        claimStatus.setAttribute("class", "red");
        console.log(error);
      }
    });



  } else {
    console.log('Sorry!, you claim from unconneted browser');
  }

}

function lookupButtonClicked() {
  if (starNotary != undefined) {
    // resetting the jsoninterface (abi) to re-regenerate the methods and events of the contract instance
    starNotary.options.jsonInterface = abi;

    let lookupId = document.getElementById('lookupId').value;
    let starInfo = document.getElementById('starInfo');

    starInfo.innerText = "Fetching Star Information for token id : " + lookupId;
    starNotary.methods.tokenIdToStarInfo(Number(lookupId)).call((error, result) => {
      if (!error) {
        console.log(result);

        if (result.name == "") {  // No star exist in given token ID
          starInfo.innerText = "NOT FOUND!, No Star exist in given token ID";
        } else {
          starInfo.innerHTML = `<h2>Star Information @ token ID: ${lookupId}</h2>
                    <p><b>Name: </b> ${result.name}</p>
                    <p><b>Story: </b> ${result.starStory}</p>
                    <p><b>ra: </b> ${result.ra}</p>
                    <p><b>dec: </b> ${result.dec}</p>
                    <p><b>mag: </b> ${result.mag}</p>
                    <div id="sell-status">Checking Sell status of this star....</div>
                  `;

                  checkSellStatus(lookupId);
        }

      } else {
        starInfo.innerText = "Something went wrong, please check console";
        console.log(error);
      }

    });
  } else {
    console.log('Sorry!, you claim from unconneted browser');
  }
}

function checkSellStatus(tokenId){
  let sellStatus = document.getElementById('sell-status');

  starNotary.methods.starsForSale(tokenId).call((error, result) => {
    if(!error){
      console.log(result);

      if(result != 0){
        sellStatus.innerText = `This Star is on SELL @ ${result} ether`;
      }else{
        sellStatus.innerHTML = `
        <form id="sale-form" onsubmit="putStarForSale()">
        <p><i>Enter sell price in ether (whole number only, minimum 1 ether)</i></p>
        <input id="star-price" type="number" tokenId="${tokenId}" setp="1" min="1" /> 
        <button id="put-for-sale" type="submit">Put this Star for Sell</button>
        </form>
        `;

        document.getElementById('sale-form').addEventListener('submit', e => e.preventDefault());
      }
    }else{
      sellStatus.innerText = "Could not retrieve the sell status of this star, please check console for error";
    }
  });
}

function putStarForSale(){
  let tokenId = document.getElementById('star-price').getAttribute('tokenId');
  let price = document.getElementById('star-price').value;
  document.getElementById('loader').style.display = "block";
  document.getElementById('sell-status').innerHTML += "<p>Putting on Sale.....</p>"

  starNotary.methods.putStarUpForSale(Number(tokenId), Number(price)).send()
  .on('transactionHash', (hash) => {
    document.getElementById('loader').style.display = "none";
    document.getElementById('sell-status').innerHTML = `<p class="green">
    Congratulation!!, Transactionn submittd successfully. Your star will be on SALE shortly.
    To view this transaction detail in Rinkeby Network
    <a href="https://rinkeby.etherscan.io/tx/${hash}" target="_blank">Click Here</a>
    </p>`;
  })
  .on('error',(error) => {
    document.getElementById('loader').style.display = "none";
    document.getElementById('sell-status').innerHTML += `<p class="red">Sorry! You are not the owner of this Star or something went wrong</p>`;
    console.log(error);
  });

}
