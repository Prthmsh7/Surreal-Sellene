// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IPRegistry.sol";

contract LicenseRegistry is Ownable {
    IPRegistry public ipRegistry;

    struct License {
        bytes32 ipId;
        address licensor;
        address licensee;
        uint256 startTime;
        uint256 endTime;
        string terms;
    }

    mapping(bytes32 => License) public licenses;
    mapping(address => bytes32[]) public licenseeLicenses;
    mapping(address => bytes32[]) public licensorLicenses;

    event LicenseCreated(
        bytes32 indexed licenseId,
        bytes32 indexed ipId,
        address licensor,
        address licensee,
        string terms
    );

    constructor(address _ipRegistry) {
        ipRegistry = IPRegistry(_ipRegistry);
    }

    function createLicense(
        bytes32 ipId,
        address licensee,
        uint256 endTime,
        string memory terms
    ) external returns (bytes32) {
        (address owner,,) = ipRegistry.getIP(ipId);
        require(owner == msg.sender, "Not IP owner");
        require(endTime > block.timestamp, "End time must be in the future");

        bytes32 licenseId = keccak256(
            abi.encodePacked(ipId, msg.sender, licensee, block.timestamp)
        );
        licenses[licenseId] = License(ipId, msg.sender, licensee, block.timestamp, endTime, terms);
        licenseeLicenses[licensee].push(licenseId);
        licensorLicenses[msg.sender].push(licenseId);

        emit LicenseCreated(licenseId, ipId, msg.sender, licensee, terms);
        return licenseId;
    }

    function getLicense(bytes32 licenseId)
        external
        view
        returns (
            bytes32 ipId,
            address licensor,
            address licensee,
            uint256 startTime,
            uint256 endTime,
            string memory terms
        )
    {
        License memory license = licenses[licenseId];
        return (
            license.ipId,
            license.licensor,
            license.licensee,
            license.startTime,
            license.endTime,
            license.terms
        );
    }

    function getLicenseeLicenses(address licensee)
        external
        view
        returns (bytes32[] memory)
    {
        return licenseeLicenses[licensee];
    }

    function getLicensorLicenses(address licensor)
        external
        view
        returns (bytes32[] memory)
    {
        return licensorLicenses[licensor];
    }
}
