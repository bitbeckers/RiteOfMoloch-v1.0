// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {DeployHelper} from "script/deploy/helpers.sol";

// forge script script/deploy/deployCohorts.s.sol:DeployMockCohorts --fork-url https://rpc.gnosischain.com --broadcast

contract DeployMockCohorts is Script, DeployHelper {
    /// @notice replace this address with your target ROM factory
    address public existingFactory = 0xc7e0366AC68B0e17c51fA551aC338FB19641f7DF;

    // address public existingFactory = 0x67A9929392CfA00f8D15ee5c46ca662B174B8dd0;

    function run() public {
        ROMF = RiteOfMolochFactory(existingFactory);

        address[] memory roms;

        vm.startBroadcast(vm.envUint("PK"));

        roms = _deployCohorts();

        vm.stopBroadcast();
    }
}
