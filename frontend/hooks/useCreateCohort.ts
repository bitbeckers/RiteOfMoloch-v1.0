import { initDataDeployCohort } from "utils/types/initDataDeployCohort";
import useWriteContract from "./useWriteContract";
import { BigNumber } from "ethers";

/**
 *
 * @param args calldata ([tuple] of arguments)
 * @param implementationSelector string (use 1)
 * @Returns address
 */

const useCreateCohort = (args: [initDataDeployCohort, number]) => {
  const {
    write: createCohort,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWriteContract("riteOfMolochFactoryAddress", "createCohort", args);

  // console.log(createCohort, isLoadingApprove, isSuccessApprove, isErrorApprove);

  return { createCohort, isLoadingApprove, isSuccessApprove, isErrorApprove };
};

export default useCreateCohort;
