// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DeBridgeHandler is Ownable {
    address public gate;
    mapping(address => bool) public supportedTokens;
    mapping(bytes32 => bool) public processedTransactions;

    event TokenTransferInitiated(
        address indexed token,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 chainId,
        bytes32 transactionId
    );

    event TokenTransferCompleted(
        address indexed token,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 chainId,
        bytes32 transactionId
    );

    constructor(address _gate) Ownable(msg.sender) {
        gate = _gate;
    }

    function setGate(address _gate) external onlyOwner {
        gate = _gate;
    }

    function addSupportedToken(address token) external onlyOwner {
        supportedTokens[token] = true;
    }

    function removeSupportedToken(address token) external onlyOwner {
        supportedTokens[token] = false;
    }

    function initiateTransfer(
        address token,
        address to,
        uint256 amount,
        uint256 targetChainId
    ) external {
        require(supportedTokens[token], "Token not supported");
        require(amount > 0, "Amount must be greater than 0");

        IERC20(token).transferFrom(msg.sender, address(this), amount);

        bytes32 transactionId = keccak256(
            abi.encodePacked(
                token,
                msg.sender,
                to,
                amount,
                targetChainId,
                block.timestamp
            )
        );

        emit TokenTransferInitiated(
            token,
            msg.sender,
            to,
            amount,
            targetChainId,
            transactionId
        );
    }

    function completeTransfer(
        address token,
        address from,
        address to,
        uint256 amount,
        uint256 sourceChainId,
        bytes32 transactionId
    ) external {
        require(msg.sender == gate, "Only gate can complete transfer");
        require(!processedTransactions[transactionId], "Transaction already processed");
        require(supportedTokens[token], "Token not supported");

        processedTransactions[transactionId] = true;
        IERC20(token).transfer(to, amount);

        emit TokenTransferCompleted(
            token,
            from,
            to,
            amount,
            sourceChainId,
            transactionId
        );
    }
} 