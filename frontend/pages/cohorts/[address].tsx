import { FC, ReactNode } from "react";
import {
  Box,
  Flex,
  GridItem,
  Heading,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import { useRouter } from "next/router";
import { COHORT_INITIATES } from "utils/subgraph/queries";
import { MemberData } from "utils/types/subgraphQueries";
import { useAccount, useNetwork } from "wagmi";
import InitiateData from "components/InitiateData";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import BackButton from "components/BackButton";
import NotConnected from "components/NotConnected";
import NobodyStaked from "components/NobodyStaked";
import useCohortName from "hooks/useCohortName";
import { RxOpenInNewWindow } from "react-icons/rx";
import AdminDropdown from "components/AdminDropdown";

interface CohortDetailProps {
  children: ReactNode;
}

const CohortDetail: FC<CohortDetailProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const { address: cohortAddress } = router.query;

  const { data: initiates, isLoading } = useSubgraphQuery(
    COHORT_INITIATES(cohortAddress)
  );

  const initiateList: MemberData[] | null =
    initiates?.cohort && initiates?.cohort?.initiates;
  console.log("initiateList", initiateList);

  const renderInitiateList = initiateList?.map((initiate: MemberData) => {
    const dateJoined = new Date(+initiate.joinedAt * 1000).toLocaleDateString();
    return (
      <InitiateData
        address={initiate.address}
        id={initiate.id}
        joinedAt={dateJoined}
        stake={initiate.stake}
        key={initiate.id}
      />
    );
  });

  const isInitiates = renderInitiateList && renderInitiateList.length > 0;

  const cohortName = useCohortName(cohortAddress?.toString() || "");
  console.log(typeof cohortName);

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <Stack
          w={["full", "full", "80%"]}
          alignSelf="center"
          spacing={5}
          my={!isInitiates ? 8 : 0}
        >
          <Heading as="h2" textAlign="center" color="red">
            <Text w="fit">{cohortName?.toString().toUpperCase()}</Text>
            <Link
              href={`${chain?.blockExplorers?.default.url}/address/${cohortAddress}`}
              isExternal
            >
              <Text fontSize="sm" mt="1em" fontWeight="normal">
                {cohortAddress}
              </Text>
            </Link>
          </Heading>
          {/* TODO: FIX ADMIN DROPDOWN THEN UNHIDE */}
          <Box w="25%" display="none">
            <AdminDropdown cohortAddress={cohortAddress?.toString() || ""} />
          </Box>
          {isInitiates && (
            <SimpleGrid
              columns={4}
              fontFamily="texturina"
              justifyContent="center"
              alignItems="center"
              px={4}
              spacingX={2}
              w="full"
            >
              <GridItem margin="auto">Initiate address</GridItem>
              <GridItem margin="auto">Shares</GridItem>
              <GridItem margin="auto">Date Staked</GridItem>
            </SimpleGrid>
          )}
          {isLoading && (
            <Box w="full" textAlign="center" p={2} fontFamily="texturina">
              <Spinner size="xl" my="50" color="red" emptyColor="purple" />
              <Text>Loading initiates...</Text>
            </Box>
          )}
          {isInitiates
            ? !isLoading && renderInitiateList
            : !isLoading && <NobodyStaked />}
          <BackButton path="/cohorts" />
        </Stack>
      )}
      {children}
    </>
  );
};

export default CohortDetail;
