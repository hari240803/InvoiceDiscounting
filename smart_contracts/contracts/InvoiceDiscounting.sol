// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract InvoiceDiscounting {
    IERC20 public token;  // The ERC20 token used for transactions
    address public platformOwner;  // The owner of the platform
    uint256 public platformFee;  // The platform fee in percentage (e.g., 2% fee)

    struct Invoice {
        address supplier;
        address buyer;
        uint256 invoiceAmount;
        uint256 dueDate;
        uint256 auctionEndTime;
        uint256 highestBid;
        address highestBidder;
        bool closed;
    }

    Invoice[] public invoices;

    mapping(address => uint256) public userBalances;

    event InvoiceCreated(uint256 indexed invoiceId, address indexed supplier, uint256 invoiceAmount, uint256 dueDate);
    event InvoiceBidding(uint256 indexed invoiceId, address indexed bidder, uint256 bidAmount);
    event InvoiceClosed(uint256 indexed invoiceId, address indexed winner, uint256 winningAmount);

    constructor(address _tokenAddress, uint256 _fee) {
        token = IERC20(_tokenAddress);
        platformOwner = msg.sender;
        platformFee = _fee;
    }

    modifier onlyPlatformOwner() {
        require(msg.sender == platformOwner, "Only the platform owner can call this function");
        _;
    }

    function createInvoice(address buyer, uint256 invoiceAmount, uint256 dueDate, uint256 auctionEndTime) public {
        require(buyer != msg.sender, "Supplier and buyer cannot be the same");
        require(invoiceAmount > 0, "Invoice amount must be greater than 0");
        require(dueDate > block.timestamp, "Due date must be in the future");
        require(auctionEndTime > block.timestamp, "Auction end time must be in the future");

        uint256 invoiceId = invoices.length;
        invoices.push(Invoice(msg.sender, buyer, invoiceAmount, dueDate, auctionEndTime, 0, address(0), false));

        emit InvoiceCreated(invoiceId, msg.sender, invoiceAmount, dueDate);
    }

    function bidOnInvoice(uint256 invoiceId, uint256 bidAmount) public {
        require(invoiceId < invoices.length, "Invalid invoice ID");
        Invoice storage invoice = invoices[invoiceId];
        require(!invoice.closed, "Invoice auction is closed");
        require(msg.sender != invoice.supplier, "Suppliers cannot bid on their invoices");
        require(bidAmount > invoice.highestBid, "Bid amount must be higher than the current highest bid");
        require(block.timestamp < invoice.auctionEndTime, "Auction has ended");

        if (invoice.highestBidder != address(0)) {
            // Refund the previous highest bidder
            userBalances[invoice.highestBidder] += invoice.highestBid;
        }

        // Update the highest bid
        invoice.highestBid = bidAmount;
        invoice.highestBidder = msg.sender;

        emit InvoiceBidding(invoiceId, msg.sender, bidAmount);
    }

    function closeInvoiceAuction(uint256 invoiceId) public {
        require(invoiceId < invoices.length, "Invalid invoice ID");
        Invoice storage invoice = invoices[invoiceId];
        require(!invoice.closed, "Invoice auction is already closed");
        require(block.timestamp >= invoice.auctionEndTime, "Auction has not ended yet");
        require(msg.sender == invoice.supplier || msg.sender == platformOwner, "Only supplier or platform owner can close the auction");

        invoice.closed = true;

        if (invoice.highestBidder != address(0)) {
            // Transfer the winning bid amount to the supplier after deducting the platform fee
            uint256 platformFeeAmount = (invoice.highestBid * platformFee) / 100;
            uint256 supplierAmount = invoice.highestBid - platformFeeAmount;

            token.transfer(invoice.supplier, supplierAmount);

            emit InvoiceClosed(invoiceId, invoice.highestBidder, supplierAmount);
        } else {
            // If no bids were placed, return the invoice amount to the supplier
            token.transfer(invoice.supplier, invoice.invoiceAmount);
            emit InvoiceClosed(invoiceId, address(0), 0);
        }
    }

    function withdraw() public {
        uint256 balance = userBalances[msg.sender];
        require(balance > 0, "You have no balance to withdraw");
        userBalances[msg.sender] = 0;
        token.transfer(msg.sender, balance);
    }

    function getInvoiceCount() public view returns (uint256) {
        return invoices.length;
    }
}
