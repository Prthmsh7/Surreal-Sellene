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
    ) external payable returns (bytes32);
}

contract DeBridgeHandler is Ownable {
    IDeBridgeGate public deBridgeGate;
    address public supportedToken; // The token you want to bridge
    
    event CrossChainTransferInitiated(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        uint256 targetChainId
    );
    
    event CrossChainTransferReceived(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        uint256 sourceChainId
    );

    constructor(address _deBridgeGate, address _supportedToken) {
        deBridgeGate = IDeBridgeGate(_deBridgeGate);
        supportedToken = _supportedToken;
    }

    // Function to send tokens to another chain
    function sendCrossChain(
        address _receiver,
        uint256 _amount,
        uint256 _targetChainId
    ) external payable {
        require(_amount > 0, "Amount must be greater than 0");
        
        // Transfer tokens from sender to this contract
        IERC20(supportedToken).transferFrom(msg.sender, address(this), _amount);
        
        // Approve deBridge to spend tokens
        IERC20(supportedToken).approve(address(deBridgeGate), _amount);
        
        // Prepare receiver address as bytes
        bytes memory receiverBytes = abi.encodePacked(_receiver);
        
        // Send tokens through deBridge
        bytes32 transferId = deBridgeGate.send(
            supportedToken,    // token address
            _amount,          // amount
            _targetChainId,   // target chain ID
            receiverBytes,    // receiver address
            "",              // permit (empty for this example)
            false,           // useAssetFee
            0,              // referralCode
            ""              // autoParams
        );
        
        emit CrossChainTransferInitiated(
            msg.sender,
            _receiver,
            _amount,
            _targetChainId
        );
    }

    // Function to receive tokens from another chain
    function receiveCrossChain(
        address _sender,
        address _receiver,
        uint256 _amount,
        uint256 _sourceChainId
    ) external onlyOwner {
        // Transfer tokens to the receiver
        IERC20(supportedToken).transfer(_receiver, _amount);
        
        emit CrossChainTransferReceived(
            _sender,
            _receiver,
            _amount,
            _sourceChainId
        );
    }

    // Function to update deBridge gate address
    function updateDeBridgeGate(address _newDeBridgeGate) external onlyOwner {
        deBridgeGate = IDeBridgeGate(_newDeBridgeGate);
    }

    // Function to update supported token
    function updateSupportedToken(address _newToken) external onlyOwner {
        supportedToken = _newToken;
    }
} 