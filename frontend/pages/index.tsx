/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { Flex, Button, Box, Spinner, Heading, Link as ChakraLink,useToast } from "@chakra-ui/react";
import {
  Flex,
  Button,
  Box,
  Spinner,
  Heading,
  Link as ChakraLink,
  useCustomToast,
  useToast,
  Text,
} from "@raidguild/design-system";
import { useAccount, useNetwork } from "wagmi";
import { UserContext } from "context/UserContext";
import { canStake } from "../utils/web3";

import { CONTRACT_ADDRESSES, EXPLORER_URLS } from "../utils/constants";
// import { SUPPORTED_NETWORK_IDS } from "../config";
// import { NetworkError } from "../shared/NetworkError";
// import { RiteStaked } from "../shared/RiteStaked";
// import { StakingFlow } from "../shared/StakingFlow";

import { HeaderOne } from "../components/Header0ne";
import { NetworkError } from "components/NetworkError";
import { BigNumber } from "ethers";
import { useRiteBalanceOf } from "hooks/useRiteBalanceOf";
import { useBalanceOf } from "hooks/useBalanceOf";
import { getAddress } from "ethers/lib/utils";

export default function Home() {
  // const [minimumStake, setMinimumStake] = useState<number>(0);
  // const [riteBalance, setRiteBalance] = useState<number>(0);
  // const [raidBalance, setRaidBalance] = useState<number>(0);
  // const [stakeDeadline, setStakeDeadline] = useState<number>(0);
  // const [allowance, setAllowance] = useState<number>(0);
  // const [isApproveTxPending, setIsApproveTxPending] = useState<boolean>(false);
  // const [isStakeTxPending, setIsStakeTxPending] = useState<boolean>(false);
  // const [isChecked, setIsChecked] = useState<boolean>(false);
  // const [displaySponsorCohort, setDisplaySponsorCohort] =
  //   useState<boolean>(false);
  // const [cohortAddress, setCohortAddress] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const context = useContext(UserContext);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const toast = useToast();

  const writeBalanceOf = useBalanceOf;

  const getContractAddress = (contract: string): string => {
    if (typeof chain?.id === "number") {
      const address: string = CONTRACT_ADDRESSES[chain.id][contract];
      return address;
    } else return "";
  };

  // type check address
  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  //////
  //////
  // START OF FUNCTIONS THAT WERE REFACTORED INTO HOOKS
  //////
  //////

  // const getApproveRaid = () => {
  //   const {
  //     write: writeApproveRaid,
  //     txData: txDataApproveRaid,
  //     status: statusApproveRaid,
  //   } = approveRaid([userAddress(), minimumStake]);
  //   return {
  //     writeApproveRaid,
  //     txDataApproveRaid,
  //     statusApproveRaid,
  //   };
  // };

  // // NOT WORKING CORRECTLY
  // const getJoinInitiation = () => {
  //   const {
  //     write: writeJoinInitiation,
  //     txData: txDataJoinInitiation,
  //     status: statusJoinInitiation,
  //   } = joinInitiation([userAddress()]);
  //   return {
  //     writeJoinInitiation,
  //     txDataJoinInitiation,
  //     statusJoinInitiation,
  //   };
  // };

  // const useGetBalanceOf = () => {
  //   const {
  //     write: writeGetBalanceOf,
  //     txData: txDataGetBalanceOf,
  //     status: statusGetBalanceOf,
  //   } = getBalanceOf([userAddress()]);
  //   return {
  //     writeGetBalanceOf,
  //     txDataGetBalanceOf,
  //     statusGetBalanceOf,
  //   };
  // };

  // const { data: dataGetMinimumStake, isLoading: isLoadingGetMinimumStake } =
  //   getMinimumStake();

  // const { data: dataGetStakeDeadline, isLoading: isLoadingGetStakeDeadline } =
  //   getStakeDeadline([userAddress()]);

  // const useGetAllowance = () => {
  //   const {
  //     write: writeGetAllowance,
  //     txData: txDataGetAllowanceTxData,
  //     status: statusGetAllowanceStatus,
  //   } = getAllowance([getContractAddress("erc20TokenAddress"), userAddress()]);
  //   return {
  //     writeGetAllowance,
  //     txDataGetAllowanceTxData,
  //     statusGetAllowanceStatus,
  //   };
  // };

  // const useGetRiteBalance = () => {
  //   const {
  //     write: writeGetRiteBalance,
  //     txData: txDataGetRiteBalance,
  //     status: statusGetRiteBalance,
  //   } = getRiteBalance([userAddress()]);
  //   return {
  //     writeGetRiteBalance,
  //     txDataGetRiteBalance,
  //     statusGetRiteBalance,
  //   };
  // };

  // // helper functions

  // // NEED TO CHECK
  // const fetchMinimumStake = async () => {
  //   if (writeGetMinimumStake) {
  //     const _stake = await getMinimumStake();
  //     if (_stake) {
  //       setMinimumStake(_stake);
  //     }
  //   }
  // };

  //////
  //////
  // END OF FUNCTIONS THAT WERE REFACTORED INTO HOOKS
  //////
  //////

  // const fetchRiteBalance = async () => {
  //   const _riteBalance = await getBalanceOf(
  //     context.ethersProvider,
  //     context.signerAddress,
  //     CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress
  //   );
  //   if (_riteBalance > 0) {
  //     context.setRiteBalance(_riteBalance);
  //     if (writeGetRiteBalance) {
  //       await writeGetRiteBalance();
  //     }
  //   } else {
  //     await fetchMinimumStake();
  //     await fetchAllowance();
  //     await fetchRaidBalance();
  //   }
  // };

  // const initialFetch = async () => {
  //   setIsLoading(true);
  //   // await fetchRiteBalance();
  //   setIsLoading(false);
  // };

  // const fetchStakeDeadline = async () => {
  //   const _stakeDeadline = await getStakeDeadline;
  //   setStakeDeadline(Number(_stakeDeadline) + 60 * 60 * 24 * 30 * 6); // (6 months) for rinkeby testing
  //   setStakeDeadline(Number(_stakeDeadline));
  // };

  // const fetchAllowance = async () => {
  //   const _allowance = await writeGetAllowance;
  //   if (_allowance) {
  //     setAllowance(_allowance);
  //   }
  // };

  // const fetchRaidBalance = async () => {
  //   const _raidBalance = writeGetRiteBalance;
  //   if (_raidBalance) {
  //     setRaidBalance(_raidBalance);
  //   }
  // };

  // ADD DESIGN-SYSTEM CUSTOM TOAST:
  // const triggerToast = (txHash) => {
  //   toast({
  //     position: "bottom-left",
  //     duration: 9000,
  //     render: () => (
  //       <Box>
  //         <i className="fa-solid fa-circle-info"></i> View your{" "}
  //         <ChakraLink
  //           href={`${EXPLORER_URLS[context.chainId]}/tx/${txHash}`}
  //           isExternal
  //           textDecoration="underline"
  //           cursor="pointer"
  //         >
  //           transaction hash
  //         </ChakraLink>
  //       </Box>
  //     ),
  //   });
  // };

  // const makeAnAllowance = async () => {
  //   setIsApproveTxPending(true);
  //   try {
  //     const tx = await approveRaid(
  //       context.ethersProvider,
  //       CONTRACT_ADDRESSES[context.chainId].erc20TokenAddress,
  //       CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress,
  //       minimumStake
  //     );
  //     if (tx) {
  //       triggerToast(tx.hash);
  //       const { status } = await tx.wait();
  //       if (status === 1) {
  //         await fetchAllowance();
  //       } else {
  //         toast({
  //           position: "bottom-left",
  //           render: () => (
  //             <Box color="white" p={3} bg="red.500">
  //               Transaction failed.
  //             </Box>
  //           ),
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     toast({
  //       position: "bottom-left",
  //       render: () => (
  //         <Box color="white" p={3} bg="red.500">
  //           {err.message}
  //         </Box>
  //       ),
  //     });
  //   }
  //   setIsApproveTxPending(false);
  // };

  // const depositStake = async () => {
  //   //Check if cohortAddress is an actual address
  //   if (cohortAddress != "" && context.isChecked) {
  //     if (!utils.isAddress(cohortAddress)) {
  //       toast({
  //         position: "bottom-left",
  //         duration: 5000,
  //         render: () => (
  //           <Box color="white" p={3} bg="red.500">
  //             Wrong sponsor's address
  //           </Box>
  //         ),
  //       });
  //       return;
  //     }
  //   }

  //   //Start stake process
  //   setIsStakeTxPending(true);
  //   try {
  //     const tx = await joinInitiation(
  //       context.ethersProvider,
  //       CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress,
  //       cohortAddress != "" && context.isChecked ? cohortAddress : context.signerAddress
  //     );
  //     if (tx) {
  //       triggerToast(tx.hash);
  //       const { status } = await tx.wait();
  //       if (status === 1) {
  //         await fetchRiteBalance();
  //       } else {
  //         toast({
  //           position: "bottom-left",
  //           render: () => (
  //             <Box color="white" p={3} bg="red.500">
  //               Transaction failed.
  //             </Box>
  //           ),
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     toast({
  //       position: "bottom-left",
  //       render: () => (
  //         <Box color="white" p={3} bg="red.500">
  //           {err.message}
  //         </Box>
  //       ),
  //     });
  //   }
  //   setIsStakeTxPending(false);
  // };

  // canStake(1, 1, 1, 1);

  // const canNotStakeTooltipLabel = !ethers.utils.isAddress(cohortAddress)
  //   ? "Please input a valid wallet address"
  //   : utils.formatUnits(allowance, "ether") <
  //     utils.formatUnits(minimumStake, "ether")
  //   ? "Allowance is smaller than the minimum stake amount."
  //   : "Your RAID balance is too low";

  // const show = isConnected && chain;

  // useEffect(() => {
  //   isConnected ? initialFetch() : null;
  // }, [chain?.id]);

  return (
    <Flex
      minH="350px"
      minW="80%"
      direction="column"
      alignItems="center"
      fontFamily="spaceMono"
      px="2rem"
    >
      <HeaderOne />

      <Button
        onClick={() => {
          useBalanceOf([userAddress()]);
        }}
      >
        Test Write function
      </Button>

      <Box w="full" m="auto" mt={5} textAlign="center">
        <Button variant="outline">Commit your stake to the cohort!</Button>
      </Box>

      {/* {!isConnected && (
        <Text color="white" textAlign="center">
          Connect your wallet to stake & commit to our cohort!
        </Text>
      )} */}

      {/* {isConnected ? (
        <Box w="full" m="auto" mt={5} textAlign="center">
          <Button variant={"outline"}>Deploy your own cohort</Button>
          <Text mt={4}>Your journey starts here...</Text>
        </Box>
      ) : null} */}

      {/* {isConnected && !chain?.id && <NetworkError />} */}

      {/* {isLoading && <Spinner color="red" size="xl" />} */}

      {/* <Flex
        opacity={!show || isLoading ? 0 : 1}
        transition="opacity 0.25s"
        w="100%"
      > */}
      {/* {!isLoading &&
          (riteBalance > 0 ? (
            <RiteStaked
              // deadline={stakeDeadline}
              // minimumStake={minimumStake}
              // context={context}
              // raidBalance={raidBalance}
              // allowance={allowance}
              // cohortAddress={cohortAddress}
              // isApproveTxPending={isApproveTxPending}
              // makeAnAllowance={makeAnAllowance}
              // canStake={canStake}
              // canNotStakeTooltipLabel={canNotStakeTooltipLabel}
              // isStakeTxPending={isStakeTxPending}
              // depositStake={depositStake}
            />
          ) : (
            <StakingFlow
              // allowance={allowance}
              // cohortAddress={cohortAddress}
              // isApproveTxPending={isApproveTxPending}
              // makeAnAllowance={makeAnAllowance}
              // canStake={canStake}
              // canNotStakeTooltipLabel={canNotStakeTooltipLabel}
              // isStakeTxPending={isStakeTxPending}
              // depositStake={depositStake}
            />
          ))}
       </Flex> */}
    </Flex>
  );
}
