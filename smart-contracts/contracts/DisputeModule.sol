// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DisputeModule {
    struct Dispute {
        bytes32 ipId;
        bytes32 licenseId;
        address complainant;
        string reason;
        uint256 timestamp;
        bool resolved;
    }

    mapping(bytes32 => Dispute) public disputes;
    mapping(address => bytes32[]) public userDisputes;

    event DisputeCreated(bytes32 indexed disputeId, bytes32 indexed ipId, bytes32 indexed licenseId, address complainant, string reason);
    event DisputeResolved(bytes32 indexed disputeId);

    function createDispute(bytes32 ipId, bytes32 licenseId, string memory reason) external returns (bytes32) {
        bytes32 disputeId = keccak256(abi.encodePacked(ipId, licenseId, msg.sender, block.timestamp));
        disputes[disputeId] = Dispute(ipId, licenseId, msg.sender, reason, block.timestamp, false);
        userDisputes[msg.sender].push(disputeId);
        emit DisputeCreated(disputeId, ipId, licenseId, msg.sender, reason);
        return disputeId;
    }

    function resolveDispute(bytes32 disputeId) external {
        require(!disputes[disputeId].resolved, "Dispute already resolved");
        disputes[disputeId].resolved = true;
        emit DisputeResolved(disputeId);
    }

    function getDispute(bytes32 disputeId) external view returns (bytes32 ipId, bytes32 licenseId, address complainant, string memory reason, uint256 timestamp, bool resolved) {
        Dispute memory dispute = disputes[disputeId];
        return (dispute.ipId, dispute.licenseId, dispute.complainant, dispute.reason, dispute.timestamp, dispute.resolved);
    }

    function getUserDisputes(address user) external view returns (bytes32[] memory) {
        return userDisputes[user];
    }
} 