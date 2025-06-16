// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract IPRegistry is Ownable {
    struct IP {
        address owner;
        string metadata;
        uint256 timestamp;
    }

    mapping(bytes32 => IP) public ips;
    mapping(address => bytes32[]) public ownerIPs;

    event IPRegistered(bytes32 indexed ipId, address indexed owner, string metadata);

    constructor() {}

    function registerIP(string memory metadata) external returns (bytes32) {
        bytes32 ipId = keccak256(abi.encodePacked(msg.sender, block.timestamp, metadata));
        ips[ipId] = IP(msg.sender, metadata, block.timestamp);
        ownerIPs[msg.sender].push(ipId);
        emit IPRegistered(ipId, msg.sender, metadata);
        return ipId;
    }

    function getIP(bytes32 ipId) external view returns (address owner, string memory metadata, uint256 timestamp) {
        IP memory ip = ips[ipId];
        return (ip.owner, ip.metadata, ip.timestamp);
    }

    function getOwnerIPs(address owner) external view returns (bytes32[] memory) {
        return ownerIPs[owner];
    }
} 