import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  ChakraNumberInput,
  FormControl,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Text,
  Tooltip,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import { utils } from "ethers";

const DeployCohortPt2 = () => {
  const {
    setAssetAmount,
    setCohortSize,
    setShareThreshold,
    setOnboardingPeriod,
    setStakingAsset,
    setStakeDuration,
    setTreasury,
    displayPart2,
    setDisplayPart1,
    setDisplayPart2,
    setDisplayPart3,
  } = useFormContext();

  const localForm = useForm<FieldValues>();

  const {
    control,
    register,
    watch,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = localForm;

  watch();
  const values = getValues();
  // console.log(values);

  const numberInputRules = {
    validate: (val: number) => val > 0,
    required: {
      value: true,
      message: "Input cannot be blank",
    },
    min: {
      value: 0.01,
      message: "Value must be greater than 0",
    },
  };

  const handleBack = (): void => {
    setDisplayPart1(true);
    setDisplayPart2(false);
  };

  const handleNext = async (): Promise<void> => {
    await trigger();
    if (isValid) {
      setAssetAmount(values.assetAmount);
      setCohortSize(values.cohortSize);
      setShareThreshold(values.shareThreshold);
      setOnboardingPeriod(values.onboardingPeriod);
      setStakeDuration(values.stakeDuration);
      setStakingAsset(values.stakingAsset);
      setTreasury(values.treasury);
      setDisplayPart2(false);
      setDisplayPart3(true);
    }
  };

  return (
    <FormControl onSubmit={handleSubmit(handleBack)}>
      <Box display={displayPart2 ? "inline" : "none"}>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Controller
            control={control}
            name="amount"
            rules={numberInputRules}
            render={({ field: { ref, ...restField } }) => (
              <ChakraNumberInput
                variant="outline"
                step={0.1}
                id="assetAmount"
                placeholder="Stake per member"
                precision={2}
                {...restField}
              >
                <NumberInputField ref={ref} name={restField.name} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </ChakraNumberInput>
            )}
          />

          <Box>
            <Controller
              control={control}
              name="amount"
              rules={numberInputRules}
              render={({ field: { ref, ...restField } }) => (
                <ChakraNumberInput
                  variant="outline"
                  step={0.1}
                  id="cohortSize"
                  placeholder="cohort size..."
                  precision={2}
                  {...restField}
                >
                  <NumberInputField ref={ref} name={restField.name} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </ChakraNumberInput>
              )}
            />
            {/* <NumberInput
                variant="outline"
                label="Cohort size"
                id="cohortSize"
                placeholder="Cohort size"
                autoComplete="off"
                localForm={localForm}
                {...register("cohortSize", {
                  validate: (val) => val > 0,
                  required: {
                    value: true,
                    message: "Input cannot be blank",
                  },
                  min: {
                    value: 1,
                    message: "Minimum of 1 required",
                  },
                })}
              /> */}
            <ErrorMessage
              errors={errors}
              name="cohortSize"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
          <Tooltip
            label="Set the minimum amount of shares required for membership"
            placement="top-start"
            hasArrow
          >
            <Box>
              <Controller
                control={control}
                name="amount"
                rules={numberInputRules}
                render={({ field: { ref, ...restField } }) => (
                  <ChakraNumberInput
                    variant="outline"
                    step={0.1}
                    id="shareThreshold"
                    placeholder="shares required for membership..."
                    precision={2}
                    {...restField}
                  >
                    <NumberInputField ref={ref} name={restField.name} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </ChakraNumberInput>
                )}
              />
              {/* <NumberInput
                  label="Shares per member"
                  id="shareThreshold"
                  placeholder="shares per member"
                  autoComplete="off"
                  variant="outline"
                  localForm={localForm}
                  {...register("shareThreshold", {
                    validate: (val) => val > 0,
                    required: {
                      value: true,
                      message: "Input cannot be blank",
                    },
                    min: {
                      value: 1,
                      message: "Minimum of 1 required",
                    },
                  })}
                /> */}
              <ErrorMessage
                errors={errors}
                name="shareThreshold"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
          </Tooltip>
          <Box>
            <Controller
              control={control}
              name="amount"
              rules={numberInputRules}
              render={({ field: { ref, ...restField } }) => (
                <ChakraNumberInput
                  variant="outline"
                  step={0.1}
                  id="onboardingPeriod"
                  placeholder="time in days..."
                  precision={2}
                  {...restField}
                >
                  <NumberInputField ref={ref} name={restField.name} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </ChakraNumberInput>
              )}
            />
            {/* <NumberInput
                label="Onboarding period in days"
                id="onboardindPeriod"
                placeholder="enter time in days..."
                autoComplete="off"
                variant="outline"
                localForm={localForm}
                {...register("onboardingPeriod", {
                  validate: (val) => val > 0,
                  required: {
                    value: true,
                    message: "Input cannot be blank",
                  },
                  min: {
                    value: 1,
                    message: "Minimum of 1 required",
                  },
                })}
              /> */}
            <ErrorMessage
              errors={errors}
              name="onboardingPeriod"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>

          <Box>
            <Input
              label="Staking asset address"
              id="stakingAsset"
              placeholder="enter token address"
              autoComplete="off"
              localForm={localForm}
              {...register("stakingAsset", {
                required: {
                  value: true,
                  message: "Value required",
                },
                validate: () =>
                  utils.isAddress(values.stakingAsset) || "invalid address",
              })}
            />

            <ErrorMessage
              errors={errors}
              name="stakingAsset"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>

          <Box>
            <Controller
              control={control}
              name="amount"
              rules={numberInputRules}
              render={({ field: { ref, ...restField } }) => (
                <ChakraNumberInput
                  variant="outline"
                  step={0.1}
                  id="stakeDuration"
                  placeholder="amount in days..."
                  precision={2}
                  {...restField}
                >
                  <NumberInputField ref={ref} name={restField.name} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </ChakraNumberInput>
              )}
            />
            {/* <NumberInput
                label="Staking duration in days"
                id="stakeDuration"
                placeholder="amount in days..."
                autoComplete="off"
                variant="outline"
                localForm={localForm}
                {...register("stakeDuration", {
                  validate: (val) => val > 0,
                  required: {
                    value: true,
                    message: "Input cannot be blank",
                  },
                  min: {
                    value: 1,
                    message: "Minimum of 1 required",
                  },
                })}
              /> */}
            <ErrorMessage
              errors={errors}
              name="stakeDuration"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
        </SimpleGrid>
        <SimpleGrid my={3}>
          <Box>
            <Input
              label="Treasury address"
              id="treasury"
              placeholder="Slashed stake will be sent here..."
              autoComplete="off"
              localForm={localForm}
              {...register("treasury", {
                required: {
                  value: true,
                  message: "Value required",
                },
                validate: () =>
                  utils.isAddress(values.treasury) || "invalid address",
              })}
            />

            <ErrorMessage
              errors={errors}
              name="treasury"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={2} spacingX={4} spacingY={3} my={10}>
          <Box>
            <Button
              mt={10}
              variant="ghost"
              w="full"
              color="red"
              border="1px"
              rounded="sm"
              onClick={handleBack}
            >
              BACK
            </Button>
          </Box>
          <Box mt={10}>
            <Button variant="solid" w="full" color="black" onClick={handleNext}>
              NEXT
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </FormControl>
  );
};

export default DeployCohortPt2;
