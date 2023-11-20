// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IDToken is ERC20 {
    constructor() ERC20("ID Coin", "QKC") {
        _mint(msg.sender, 10000 * 10 ** 18);
    }
}