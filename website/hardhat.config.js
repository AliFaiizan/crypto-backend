// require('@nomicfoundation/hardhat-toolbox');
/** @type import('hardhat/config').HardhatUserConfig */

// this is the metamask private key
// const { Ethkey } = require('./keys');
const fs = require('fs');

const ethPrivateKey = fs.readFileSync('.secret').toString().trim();

require('@nomiclabs/hardhat-waffle');

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  solidity: '0.8.4',
};

