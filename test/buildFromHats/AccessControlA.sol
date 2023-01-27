// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "test/TestHelper.sol";

// forge test --match-contract AccessControlA -vv

contract AccessControlA is TestHelper {
    bytes32 public constant SUPER_ADMIN = keccak256("SUPER_ADMIN");
    bytes32 public constant ADMIN = keccak256("ADMIN");

    function setUp() public {
        // set and deploy ROM-Factory
        setUpFactory();
        // set initial data for ROM clone
        createInitData();
        // deploy ROM clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));
    }

    /**
     * TESTS
     */

    /**
     * UTILS
     */
    function createInitData() public override {
        Data.membershipCriteria = dao;
        Data.stakingAsset = address(daoToken);
        Data.treasury = dao;
        Data.admin1 = alice;
        Data.admin2 = address(0);
        Data.cohortSize = 20;
        Data.joinDuration = 21 weeks;
        Data.threshold = 10;
        Data.assetAmount = 10;
        Data.stakeDuration = 52 weeks;
        Data.topHatId = 0; // todo: add existing topHat id
        Data.cohortName = "SeasonV";
        Data.sbtName = "RiteOfMolochSBT";
        Data.sbtSymbol = "SBTMoloch";
        Data.baseUri = "";
    }
}
