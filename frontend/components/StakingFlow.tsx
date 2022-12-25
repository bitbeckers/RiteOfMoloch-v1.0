import React, { useContext, useEffect, ReactNode } from "react";
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
import { TOKEN_TICKER } from "../utils/constants";
import { UserContext } from "context/UserContext";
import { canStake, stakeTooltipLabel } from "utils/general";
import { useMinimumStake } from "hooks/useMinimumStake";
import { useBalanceOf } from "hooks/useBalanceOf";
import { useApproveRaid } from "hooks/useApproveRaid";
import { useContractAddress } from "hooks/useContractAddress";
import { useJoinInitiation } from "hooks/useJoinInitiation";
import { useGetAllowance } from "hooks/useGetAllowance";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { FiAlertTriangle } from "react-icons/fi";

interface StakingFlowProps {
  children?: ReactNode;
}

type FormValues = {
  initiateAddress: string;
};

const StakingFlow: React.FC<StakingFlowProps> = ({ children }) => {
  const {
    isApproveTxPending,
    isStakeTxPending,
    handleCohortAddress,
    willSponsor,
    handleWillSponsor,
    cohortAddress,
    displaySponsorCohort,
  } = useContext(UserContext);

  const { address } = useAccount();
  const { chain } = useNetwork();

  const minimumStake: string = useMinimumStake();

  const balanceOf: string = useBalanceOf([userAddress()]);

  const approveRaid = useApproveRaid([
    useContractAddress("erc20TokenAddress"),
    minimumStake,
  ]);

  const writeJoinInitiation = useJoinInitiation([userAddress()]);

  const allowance: string = useGetAllowance([
    useContractAddress("erc20TokenAddress"),
    userAddress(),
  ]);

  const chainId = (): number => {
    if (chain?.id) return chain?.id;
    else return 100;
  };
  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  /**
   * general functions:
   */
  const canUserStake = canStake(
    allowance,
    minimumStake,
    balanceOf,
    cohortAddress
  );

  const stakingToolTip: string | null = stakeTooltipLabel(
    willSponsor,
    cohortAddress,
    allowance,
    minimumStake
  );

  // react-hook-form
  const localForm = useForm<FormValues>({
    defaultValues: {
      initiateAddress: "",
    },
  });

  const {
    register,
    getValues,
    control,
    setError,
    clearErrors,
    formState,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  const initiate: string = values.initiateAddress;

  console.log("isValid", isValid);

  useEffect(() => {
    console.log("Errors", errors);
    console.log("isValid", isValid);
  }, [formState]);

  return (
    <>
      <Flex w="100%" direction="column" alignItems="flex-start" p="15px">
        <HStack mb="1rem">
          <Text color="red">Required Stake</Text>
          <Text color="white">
            {utils.formatEther(minimumStake)} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>
        <HStack>
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {TOKEN_TICKER[chainId()]} balance
          </Text>
          <Text color="white" fontSize=".8rem">
            {utils.formatUnits(balanceOf, "ether")} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>
        <HStack>
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {TOKEN_TICKER[chainId()]} allowance
          </Text>
          <Text color="white" fontSize=".8rem">
            {utils.formatEther(allowance)} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>
        <Stack mt={8} w="full">
          <VStack alignItems={"start"}>
            <Checkbox
              size="md"
              defaultValue={["false"]}
              value="Sponsor an Initiate"
              options={[{ label: "Sponsor an Initiate", value: "false" }]}
              isChecked={willSponsor}
              onChange={handleWillSponsor}
            />
            <Box w="full" hidden={!willSponsor ? true : false}>
              <Input
                label="Enter address below:"
                // name="initiateAddress"
                placeholder="enter wallet address"
                type="text"
                localForm={localForm}
                {...register("initiateAddress", {
                  required: {
                    value: willSponsor ? true : false,
                    message: "Enter valid Ethereum address",
                  },
                  validate: (initiate) => utils.isAddress(initiate),
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
              {!isValid && (
                <Box w="full" color="red" mt={3}>
                  <HStack justifyContent="center">
                    <FiAlertTriangle />
                    <Text>{errors.initiateAddress?.message}</Text>
                  </HStack>
                </Box>
              )}
            </Box>
          </VStack>
        </Stack>

        {cohortAddress}
        <HStack spacing="1.5rem" mt="2rem" w="100%">
          <Box w="50%">
            <Button
              w="full"
              isLoading={isApproveTxPending}
              loadingText="Approving..."
              disabled={
                utils.formatUnits(allowance, "ether") >=
                utils.formatUnits(minimumStake, "ether")
              }
              onClick={() => approveRaid && approveRaid()}
            >
              Approve
            </Button>
          </Box>
          <Box w="50%">
            <Tooltip isDisabled={canUserStake} label={stakingToolTip}>
              <Button
                w="full"
                isLoading={isStakeTxPending}
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
      {children}
    </>
  );
};

export default StakingFlow;
