import React, { FC } from "react";
import {
  Button,
  SimpleGrid,
  Link,
  Text,
  GridItem,
} from "@raidguild/design-system";
import { useNetwork } from "wagmi";
import useTokenSymbol from "hooks/useTokenSymbol";
import useCohortName from "hooks/useCohortName";

interface CohortDetailProps {
  address: string;
  stake: string;
  stakingAsset: string;
  stakingDate: string;
  memberOrAdmin: string | number;
}

/**
 *
 * @param address cohort address
 * @param stake required stake (tokenAmount variable)
 * @param stakingDate calculated with createdAt * time
 * @param memberOrAdmin 'admin' can view cohort initiates. 'member' can view cohort details and stake to cohort
 *
 * @returns grid with cohort data. Gets rendered on ../index.tsx
 */

const CohortDetail: FC<CohortDetailProps> = ({
  address,
  stake,
  stakingAsset,
  stakingDate,
  memberOrAdmin,
}) => {
  const { chain } = useNetwork();
  const cohortName = useCohortName(address);
  const cohortNameLink = (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      <Text>{cohortName}</Text>
    </Link>
  );

  return (
    <>
      <SimpleGrid
        columns={4}
        fontFamily="texturina"
        border="1px red solid"
        justifyContent="center"
        alignItems="center"
        bg="black"
        px={4}
        pt={2}
        pb={3}
        rounded="md"
        spacingX={2}
      >
        <GridItem>{cohortNameLink}</GridItem>
        <GridItem margin="auto">
          <Text>
            <span>{stake}</span>
            <span style={{ marginLeft: "0.25em" }}>
              {useTokenSymbol(stakingAsset)}
            </span>
          </Text>
        </GridItem>
        <GridItem margin="auto">{stakingDate}</GridItem>
        <GridItem justifySelf="end">
          <Link
            href={
              memberOrAdmin === "member"
                ? `/joinCohorts/${address}`
                : `/cohorts/${address}`
            }
          >
            <Button size="xs">
              {memberOrAdmin === "admin" ? "Manage" : "Details"}
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default CohortDetail;
