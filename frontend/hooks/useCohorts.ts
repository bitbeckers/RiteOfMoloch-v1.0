import { useEffect, useState } from "react";
import { useGraphClient } from "./useGraphClient";
import { CohortFragmentFragment } from ".graphclient";

/**
 * @remarks returns name of cohort
 * @param contractAddress riteOfMolochAddress type. Should be dynamic address from subgraphQuery. If dynamic, should come from /stake/[address].tsx component
 * @outputs uint256
 */
const useCohorts = () => {
  const graphClient = useGraphClient();
  const [cohorts, setCohorts] = useState<CohortFragmentFragment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCohorts = async () => {
      setIsLoading(true);
      //todo fix address when graph synced
      const cohorts = await graphClient.Cohorts();

      setCohorts(cohorts.cohorts);
      setIsLoading(false);
    };
    getCohorts();
  }, []);

  return {cohorts, isLoading};
};

export default useCohorts;
