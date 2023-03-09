import { Box, GridItem, SimpleGrid, Tooltip } from "@raidguild/design-system";
import React from "react";
import { MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import BlockExplorerLink from "./BlockExplorerLink";
import CohortMemberModal from "./cohortMemberModal";

const InitiateData: React.FC<MemberData> = ({
  address,
  cohortAddress,
  joinedAt,
  stake,
}) => {
  const { chain } = useNetwork();

  return (
    <SimpleGrid
      columns={4}
      border="1px red solid"
      justifyContent="center"
      alignItems="center"
      bg="black"
      py={2}
      px={4}
      rounded="md"
      spacingX={2}
      w="full"
    >
      <GridItem margin="auto">
        <Tooltip label={address} shouldWrapChildren hasArrow placement="bottom">
          {BlockExplorerLink(chain, address)}
        </Tooltip>
      </GridItem>
      <GridItem margin="auto">{stake}</GridItem>
      <GridItem margin="auto">{joinedAt}</GridItem>
      <Box justifySelf="end">
        <CohortMemberModal
          address={address}
          cohortAddress={cohortAddress}
          joinedAt={joinedAt}
          stake={stake}
        />
      </Box>
    </SimpleGrid>
  );
};

export default InitiateData;
