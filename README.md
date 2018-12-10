# Decentralized Star Notary Project

This smart contract is created at address [0x7AC7b76f98Ea87Ee9932C99e99E487e868543b96](https://rinkeby.etherscan.io/address/0x7ac7b76f98ea87ee9932c99e99e487e868543b96).
Transaction ID for `createStar()` is [0x9335a2119260fb3905ab01f7dda6c6a7cc1dbd4abea6bcc6a620ea0e2e125a24](https://rinkeby.etherscan.io/tx/0x9335a2119260fb3905ab01f7dda6c6a7cc1dbd4abea6bcc6a620ea0e2e125a24).
This star was created with `tokenId 12345` and was put on sale for `99 ether`. 
Transaction ID for `putStarUpForSale()` is [0xde5056805d19c6df4d84ed2a3c823fdf4d52578d3d5f90b9d2f122a5503e758e](https://rinkeby.etherscan.io/tx/0xde5056805d19c6df4d84ed2a3c823fdf4d52578d3d5f90b9d2f122a5503e758e).

## Using the smart contract's client side UI

```
npm install
node app
```
> Now, you can browse the UI at `localhost:3000`

## To run the test
You must have installed `truffle` to run the test file. If not installed install truffle with:
```
npm install truffle -g 
```
Now run the following command:
```
truffle test
```
OR if using windows use the follwing command to resolve naming conflict in windows:
```
truffle.cmd test
```
> **Note:** Make sure your local ethereum client is running (ganache gui). If you are using ganache cli, don't forget to change port number in truffle.js file (truffle-config.js file for windows) to 8545.

## Using RESTful API service

This RESTful web API currently has only one endpoint.

- GET /star/{starTokenId}

### POST endpoint usage
To get the Star Information with its token id.

Send the GET request at /star/tokenId endpoint
- **GET Request**
```
http://localhost:3000/star/12345
```

- **Response**
```
["My Dummy Star","This is a Dummy Story of Dummy Star.","ra_654","mag_358","dec_157"]
```
