import React, { useContext } from "react";
import { useForm } from "react-hook-form";
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
import { useAccount, useNetwork } from "wagmi";
import { utils } from "ethers";
import { UserContext } from "context/UserContext";
import { approveTooltip, canStake, stakeTooltip } from "utils/general";
import useBalanceOf from "hooks/useBalanceOf";
import useApproveRaid from "hooks/useApproveRaid";
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

type FormValues = {
  initiateAddress: string;
};

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
  console.log("cohort", cohort);

  const localForm = useForm<FormValues>({
    defaultValues: {
      initiateAddress: "",
    },
  });

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  const initiateAddress: string = values?.initiateAddress || "";

  const userAddress = (): string => {
    if (typeof address === "string") return address;
    else return "";
  };

  const minimumStake = cohort?.tokenAmount || "0";

  const balanceOf: string = useBalanceOf(cohort?.token || "0x", [
    userAddress(),
  ]);

  const { approveRaid, isLoadingApprove, isSuccessApprove, isErrorApprove } =
    useApproveRaid(cohort?.token || "0x", [cohort?.id || "", minimumStake]);

  const allowance = useGetAllowance(cohort?.token || "0x", [
    userAddress(),
    cohort?.token || "0x",
  ]);

  const { writeJoinInitiation, isLoadingStake, isSuccessStake, isErrorStake } =
    useJoinInitiation(
      cohort?.id || "",
      !willSponsor ? [userAddress()] : [initiateAddress]
    );

  const canUserStake: boolean = canStake(
    allowance || "",
    minimumStake || "",
    balanceOf || "",
    initiateAddress,
    willSponsor
  );

  const approveTooltiplabel = approveTooltip(
    allowance,
    minimumStake,
    balanceOf
  );

  const stakeToolTipLabel: string | null = stakeTooltip(
    willSponsor,
    initiateAddress,
    balanceOf,
    allowance,
    minimumStake
  );

  const tokenSymbol = useTokenSymbol(cohort?.token || "0x");

  return (
    <>
      <Flex w="100%" direction="column" alignItems="flex-start" p="15px">
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
            {utils.formatUnits(balanceOf, "ether")} {tokenSymbol}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {tokenSymbol} allowance
          </Text>
          <Text color="white" fontSize=".8rem">
            {utils.formatEther(allowance)} {tokenSymbol}
          </Text>
        </HStack>
        <Stack mt={8} w="full">
          <VStack alignItems={"start"}>
            <Checkbox
              size="md"
              color="red"
              defaultValue={["false"]}
              value="Sponsor an Initiate"
              options={[{ label: "Sponsor an Initiate", value: "false" }]}
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
                // @ts-ignore
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
            <Tooltip
              isDisabled={canUserStake}
              label={approveTooltiplabel}
              placement="top-start"
            >
              <Button
                variant="solid"
                w="full"
                isLoading={
                  isLoadingApprove
                    ? isLoadingApprove
                    : isSuccessApprove || isErrorApprove
                }
                loadingText="Approving..."
                disabled={
                  utils.formatUnits(allowance, "ether") <
                  utils.formatUnits(minimumStake, "ether")
                }
                onClick={() => approveRaid && approveRaid()}
              >
                Approve
              </Button>
            </Tooltip>
          </Box>
          <Box w="50%">
            <Tooltip
              isDisabled={canUserStake}
              label={stakeToolTipLabel}
              placement="top-start"
            >
              <Button
                w="full"
                variant="solid"
                isLoading={
                  isLoadingStake
                    ? isLoadingStake
                    : isSuccessStake || isErrorStake
                }
                loadingText="Staking..."
                disabled={!canUserStake}
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
