// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IDeBridgeGate {
    function send(
        address _token,
        uint256 _amount,
        uint256 _chainIdTo,
        bytes memory _receiver,
        bytes memory _permit,
        bool _useAssetFee,
        uint32 _referralCode,
        bytes calldata _autoParams
    ) external payable;
}

contract DeBridgeHandler is Ownable {
    IDeBridgeGate public deBridgeGate;
    
    event CrossChainTransfer(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        uint256 targetChainId
    );

    constructor(address _deBridgeGate) {
        deBridgeGate = IDeBridgeGate(_deBridgeGate);
    }

    function sendCrossChain(
        address _receiver,
        uint256 _amount,
        uint256 _targetChainId
    ) external payable {
        require(_receiver != address(0), "Invalid receiver address");
        require(_amount > 0, "Amount must be greater than 0");

        // Convert receiver address to bytes
        bytes memory receiverBytes = abi.encodePacked(_receiver);

        // Send tokens cross-chain
        deBridgeGate.send{value: msg.value}(
            address(0), // Native token
            _amount,
            _targetChainId,
            receiverBytes,
            "", // No permit
            false, // Don't use asset fee
            0, // No referral code
            "" // No auto params
        );

        emit CrossChainTransfer(
            msg.sender,
            _receiver,
            _amount,
            _targetChainId
        );
    }

    // Function to receive ETH
    receive() external payable {}
} 