require('@nomiclabs/hardhat-waffle');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
   version : '0.8.20'
  },
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/8xfgYXEKeZwngzxkD52hzOFQj84LC1_h',
      accounts: ['152067f67c3564876792d8d2c004723558414b363abb6ce2c303cbdbace5f561'],
    },
  },
};
