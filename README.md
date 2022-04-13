# NEAR for Wordpress


## Description

The plugin is developed with NEAR-API-JS library. near-api-js is a JavaScript library for development of decentralized applications on the NEAR platform. It works in conjunction with our RPC endpoints to help you connect your application to the NEAR blockchain.


## How to install and run NEAR wordpress plugin

For using the plugin you should follow below steps:

First ,you should download the NEAR plugin by cloning this repo or simply download it and activate it.
Near plugin will give you a shortcode that you can use it inside of your page or post content.
The shortcode is “[NEAR]”


When you do what mentioned above, you can see a section created where ever you used it before, like this:
 
![NEAR plugin](/images/screenshot.png "NEAR plugin")

If you click on the login button, It redirects you to official NEAR website to connect near plugin to your near wallet.
After you’re connected to your wallet you’ll be able to see your account id and balance and doing other actions.



## NEAR plugin features:
- Login
- Account Info
- Balance
- Send Tokens
- Parsing Contract Methods
- Call Contract Methods


## Documentation References

https://wallet.near.org/ (Create your NEAR Wallet)

https://www.near.university

https://examples.near.org

https://docs.near.org/docs/api/javascript-library

https://github.com/near/near-api-js

https://github.com/encody/near-contract-parser




## Code explation

The plugin is developed with php for bulding wordpress plugin and javascript for connecting to near.

### Connect to NEAR

` const { connect, keyStores, WalletConnection } = nearAPI;

const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
}; 

// connect to NEAR
const near = await connect(config);

// create wallet connection
const wallet = new WalletConnection(near); `

### SignIN to wallet

` const signIn = () => {
  wallet.requestSignIn(
    "example-contract.testnet", // contract requesting access
    "Example App", // optional
    "http://YOUR-URL.com/success", // optional
    "http://YOUR-URL.com/failure" // optional
  );
}; `

## Support and TODO list

If you want to support the project NEAR @ danail.near
Or want to work on adding features,
please submit a Feature Request
or contact me by email: dan@ezlaunder.com

## Pending Features:

- Displaying authorized account’s recent transactions list
- Nft transfer
- More…

## MIT License

Copyright (c) 2022 Temis Marketing
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


