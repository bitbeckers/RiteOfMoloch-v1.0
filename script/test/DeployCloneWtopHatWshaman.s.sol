// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/test/utils/TestHelper.s.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/DeployCloneWtopHatWshaman.s.sol:DeployCloneWtopHatWshamanScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

contract DeployCloneWtopHatWshamanScript is TestHelperScript {
    function run() public {
        vm.startBroadcast();

        setUpHelper();

        // DAO's topHat id
        topHatMoloch = 2129835786704900543778694191874550823217334409380705226007185209688064;

        // check id is topHat
        require(HATS.isTopHat(topHatMoloch), "Hat is not topHat!");

        // check that DAO is wearer / admin of topHat id
        require(
            HATS.isAdminOfHat(baalAvatar, topHatMoloch),
            "DAO not owner of hat!"
        );

        // topHat: YES, shaman: YES
        createInitData(topHatMoloch, true);

        // deploy ROM-clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        vm.stopBroadcast();
    }
}
