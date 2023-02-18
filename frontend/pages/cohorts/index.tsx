import React, { FC, ReactNode, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@raidguild/design-system";
import CohortDetail from "components/CohortDetail";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { COHORTS } from "utils/subgraph/queries";
import { Cohort } from "utils/types/subgraphQueries";
import { getDeadline, unixToUTC } from "utils/general";
import BackButton from "components/BackButton";
import { useAccount } from "wagmi";
import NotConnected from "components/NotConnected";
import SearchCohorts from "components/SearchCohorts";

interface ReviewOngoingCohortProps {
  children?: ReactNode;
}

/**
 * Admin page. Page for admins to view active cohorts and members
 *
 */
const ReviewOngoingCohort: FC<ReviewOngoingCohortProps> = ({ children }) => {
  const [searchResult, getSearchResults] = useState<string | null>();
  const { isConnected } = useAccount();
  const cohortList = useSubgraphQuery(COHORTS(), true);

  /**
   * (!isLoading): hook has fetched data.
   * (isLoading): hook has not yet fetched data
   */
  const isLoading = cohortList.isLoading;

  const cohort: Cohort[] | undefined = cohortList?.data?.cohorts;

  const handleSearchResults = (result: string) => {
    getSearchResults(result);
    console.log(searchResult);
  };

  const renderCohorts = cohort?.map((cohort: Cohort) => {
    return (
      <CohortDetail
        address={cohort.id}
        stake={cohort.tokenAmount}
        stakingAsset={cohort.token}
        stakingDate={unixToUTC(getDeadline(cohort.createdAt, cohort.time))}
        key={cohort.id}
        memberOrAdmin={"admin"}
      />
    );
  });

  const filteredCohorts = renderCohorts?.filter((cohort) => {
    if (searchResult === "" || !searchResult) {
      return cohort;
    } else if (
      cohort.props.address?.includes(searchResult) ||
      cohort.props.stakingAsset?.includes(searchResult) ||
      cohort.props.stake?.includes(searchResult) ||
      cohort.props.stakingAsset?.includes(searchResult) ||
      cohort.props.stakingDate?.includes(searchResult)
    ) {
      return cohort;
    }
  });

  console.log(filteredCohorts);

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <Stack spacing={6} w={["full", "full", "80%"]} mb={6}>
          <Heading as="h1" textAlign="center" color="#FF3864">
            Cohorts
          </Heading>
          {!isLoading && (
            <>
              <HStack>
                <Box w={["50%", "50%", "60%", "70%"]} />
                <Box w={["50%", "50%", "40%", "30%"]}>
                  <SearchCohorts handleSearchResults={handleSearchResults} />
                </Box>
              </HStack>
              <SimpleGrid
                columns={4}
                fontFamily="texturina"
                justifyContent="center"
                alignItems="center"
                spacingX={2}
                mb={-3}
                w="full"
              >
                <Box justifySelf="start" pl={4}>
                  Address
                </Box>
                <Box justifySelf="center">Stake</Box>
                <Box justifySelf="center">Staking Date</Box>
                <Box />
              </SimpleGrid>
            </>
          )}
          {isLoading && (
            <Box w="full" textAlign="center" p={2} fontFamily="texturina">
              <Spinner size="xl" my="50" color="red" emptyColor="purple" />
              <Text>Loading cohorts...</Text>
            </Box>
          )}
          {filteredCohorts}
        </Stack>
      )}
      {isConnected && !isLoading && <BackButton path="/admin" />}
      {children}
    </>
  );
};

export default ReviewOngoingCohort;
