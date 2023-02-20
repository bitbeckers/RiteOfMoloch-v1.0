import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@raidguild/design-system";
import React, { Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface CohortMetricsBoxProps {
  removeOption: Dispatch<any>;
  id: string | undefined;
  // metrics2?: {
  //   id: string;
  //   stakingToken: string;
  //   symbol: string;
  //   deployDate: string;
  //   onboardingEnd: string;
  //   cohortSize: number;
  //   successPercent: number;
  //   membersSlashed: number;
  //   treasurySize: number;
  //   lastMemberStaked: string;
  //   sbtImage: string;
  // } | null;
}

/**
 * @remarks id in Box wrapper is used for filter function in parent element `Metrics` to check if value exists in array
 * @param param0
 * @returns
 */
const CohortMetricsBox: React.FC<CohortMetricsBoxProps> = ({
  id,
  removeOption,
}) => {
  return (
    <Box border="red solid 1px" rounded="lg" bg="black" p={6} id={id}>
      <Stack alignItems="end" mt={-5} mr={-5} h="2rem">
        <Box h="full" id={id} onClick={removeOption}>
          <AiOutlineClose color="gray" size="1.5rem" />
        </Box>
      </Stack>
      <HStack>
        <VStack
          w="80%"
          alignItems="start"
          textAlign="left"
          fontFamily="texturina"
          color="gray"
        >
          <Heading as="h3" color="red" fontSize="md">
            {id?.slice(0, 4)}...{id?.slice(-6)}
          </Heading>
          {/* <Text>
            Staking token:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {stakingToken}
            </span>
          </Text>
          <Text>
            Symbol:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {symbol}
            </span>
          </Text>
          <Text>
            Deploy date:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {deployDate}
            </span>
          </Text>
          <Text>
            Onboarding end:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {onboardingEnd}
            </span>
          </Text>
          <Text>
            Cohort size:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {cohortSize}
            </span>
          </Text>
          <Text>
            Success percentage:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {successPercent}
            </span>
          </Text>
          <Text>
            Members slashed:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {membersSlashed}
            </span>
          </Text>
          <Text>
            Treasury size:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {treasurySize}
            </span>
          </Text>
          <Text>
            Staking date of last member:
            <span style={{ color: "white", marginLeft: "0.5rem" }}>
              {lastMemberStaked}
            </span> */}
          {/* </Text> */}
        </VStack>
        <HStack alignSelf="start" maxW="40%">
          {/* <Image src={`${sbtImage}`} /> */}
        </HStack>
      </HStack>
      <VStack mt="2rem" mb="0.5rem" spacing="1rem">
        <Box w="full">
          <Link href={`/cohorts/${id}`}>
            <Button w="full" fontSize={["xs", "sm", "md"]}>
              Manage cohort
            </Button>
          </Link>
        </Box>
        <Box w="full">
          <Link href={"/admin"}>
            <Button w="full" fontSize={["xs", "sm", "md"]} variant="outline">
              Administrators
            </Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
};

export default CohortMetricsBox;
