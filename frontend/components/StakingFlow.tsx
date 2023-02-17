import React, { useContext, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Flex,
  Box,
  Text,
  Button,
  HStack,
  Checkbox,
  Input,
  Tooltip,
  Stack,
  VStack,
} from "@raidguild/design-system";
import { useAccount } from "wagmi";
import { BigNumber, utils } from "ethers";
import { UserContext } from "context/UserContext";
import { approveTooltip, canStake, stakeTooltip } from "utils/general";
import useBalanceOf from "hooks/useBalanceOf";
import useApprove from "hooks/useApprove";
import useJoinInitiation from "hooks/useJoinInitiation";
import useGetAllowance from "hooks/useGetAllowance";
import { FiAlertTriangle } from "react-icons/fi";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { COHORT_METADATA } from "utils/subgraph/queries";
import { CohortMetadata } from "utils/types/subgraphQueries";
import useTokenSymbol from "hooks/useTokenSymbol";

interface StakingFlowProps {
  contractAddress: string | string[];
}

/**
 * @remarks if invalid address passed into url query string, redirect user to /joinCohort page
 *
 * @param contractAddress is cohortAddress inherited from [address].tsx component. This address should be passed into smart contract functions.
 * @returns data about active cohort
 */
const StakingFlow: React.FC<StakingFlowProps> = ({ contractAddress }) => {
  const { address } = useAccount();
  const { willSponsor, handleWillSponsor } = useContext(UserContext);

  const metadata = useSubgraphQuery(
    COHORT_METADATA(contractAddress),
    Boolean(contractAddress)
  );

  const cohort: CohortMetadata | null = metadata?.data?.cohort;
  // console.log("cohort", cohort);

  const localForm = useForm<FieldValues>();

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  const initiateAddress: string = values?.initiateAddress;

  const userAddress = (): string => {
    if (typeof address === "string") return address;
    else return "";
  };

  const minimumStake = cohort?.tokenAmount || "0";

  let balanceOf = useBalanceOf((cohort?.token as `0x${string}`) || "0x", [
    userAddress(),
  ]);

  //TODO better handling of balanceOf === null
  if (!balanceOf) {
    balanceOf = BigNumber.from("0") || "0";
  }

  const { approve, isLoadingApprove } = useApprove(cohort?.token || "0x", [
    cohort?.id || "",
    minimumStake,
  ]);

  let allowance = useGetAllowance((cohort?.token as `0x${string}`) || "0x", [
    userAddress(),
    cohort?.id || "0x",
  ]);

  let tokenSymbol = useTokenSymbol(cohort?.token);
  if (!tokenSymbol) {
    tokenSymbol = "N/A";
  }

  //TODO better handling of allowance === null

  if (!allowance) {
    allowance = BigNumber.from("0") || "0";
  }

  const { writeJoinInitiation, isLoadingStake, isSuccessStake, isErrorStake } =
    useJoinInitiation(
      cohort?.id || "",
      !willSponsor ? [userAddress()] : [initiateAddress]
    );

  //TODO methods can accept BigNumbers instead of Strings
  const canUserStake = canStake(
    allowance.toString(),
    minimumStake || "",
    balanceOf.toString(),
    initiateAddress,
    willSponsor
  );

  const approveTooltiplabel = approveTooltip(
    allowance.toString(),
    minimumStake,
    balanceOf.toString(),
    tokenSymbol
  );

  const stakeToolTipLabel = stakeTooltip(
    willSponsor,
    initiateAddress,
    balanceOf.toString(),
    allowance.toString(),
    minimumStake
  );

  // useEffect re-renders component when user creates an allowance, which lets writeJoinInitiation to become defined
  useEffect(() => {}, [allowance]);

  return (
    <>
      <Flex w="100%" direction="column" alignItems="flex-start" py={5}>
        <HStack mb="1rem" justifyContent="space-between" w="full">
          <Text color="red">Required Stake</Text>
          <Text color="white">
            {minimumStake} {tokenSymbol}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {tokenSymbol} balance
          </Text>
          <Text color="white" fontSize=".8rem">
            {+utils.formatUnits(balanceOf, "ether")} {tokenSymbol}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {tokenSymbol} allowance
          </Text>
          <Text color="white" fontSize=".8rem">
            {/* TODO: double check that allowance unit formats are correct */}
            {/* TODO:  */}
            <span style={{ marginRight: "0.5em" }}>{allowance.toString()}</span>
            {/* {utils.formatEther(allowance)} */}
            <span>{tokenSymbol}</span>
          </Text>
        </HStack>
        <Stack mt={8} w="full">
          <VStack alignItems={"start"}>
            <Checkbox
              localForm={localForm}
              size="md"
              color="red"
              defaultValue={["false"]}
              value="Sponsor an Initiate"
              options={["Sponsor an Initiate"]}
              isChecked={willSponsor}
              onChange={handleWillSponsor}
            />
            <Box w="full" hidden={!willSponsor ? true : false}>
              <Input
                label="Enter address below:"
                id="initiateAddress"
                placeholder="enter wallet address"
                type="text"
                autoComplete="off"
                localForm={localForm}
                {...register("initiateAddress", {
                  validate: (initiate: string) =>
                    utils.isAddress(initiate) || "invalid address",
                  onChange: () => {
                    if (isValid) {
                      clearErrors();
                    } else {
                      setError("initiateAddress", {
                        type: "validate",
                        message: "Address is invalid!",
                      });
                    }
                  },
                })}
              />
              {!isValid && initiateAddress && (
                <Box w="full" color="red" mt={3}>
                  <HStack justifyContent="center">
                    <span>
                      <FiAlertTriangle />
                    </span>
                    <Text>{errors.initiateAddress?.message}</Text>
                  </HStack>
                </Box>
              )}
            </Box>
          </VStack>
        </Stack>

        <HStack spacing="1.5rem" mt="2rem" w="100%">
          <Box w="50%">
            <Tooltip label={approveTooltiplabel} placement="bottom">
              <Button
                variant="solid"
                w="full"
                isLoading={isLoadingApprove}
                loadingText="Approving..."
                isDisabled={
                  // TODO: double check number formatting
                  // utils.formatUnits(allowance, "ether") <
                  // utils.formatUnits(minimumStake, "ether")
                  +balanceOf.toString() < +minimumStake.toString()
                }
                onClick={() => approve && approve()}
              >
                Approve
              </Button>
            </Tooltip>
          </Box>
          <Box w="50%">
            <Tooltip
              isDisabled={!canUserStake}
              label={stakeToolTipLabel}
              placement="top-start"
            >
              <Button
                w="full"
                variant="solid"
                isLoading={isLoadingStake}
                loadingText="Staking..."
                isDisabled={!canUserStake}
                onClick={() => writeJoinInitiation && writeJoinInitiation()}
              >
                Stake
              </Button>
            </Tooltip>
          </Box>
        </HStack>
      </Flex>
    </>
  );
};

export default StakingFlow;
