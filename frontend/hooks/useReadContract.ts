import { useContractRead, useNetwork, useTransaction } from "wagmi";
import useAbi from "./useAbi";
import { useContractAddress } from "./useContractAddress";
import { useCustomToast } from "@raidguild/design-system";
import { convertBigNumber } from "utils/web3";

/**
 *
 * @param contractName - pass in contract name
 * @param functionName - pass name of function
 * @param args - option array of args
 * @returns
 */

const useReadContract = (
  contractName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();
  const toast = useCustomToast();
  let contractAddress = useContractAddress(contractName);
  const abi = useAbi(contractName);
  let output: number | undefined;

  const { data } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName,
    args,
    chainId: chain?.id,
    // onSuccess(data) {
    //   toast.loading({
    //     status: "loading",
    //     title: `Pending transaction ${data?.hash}`,
    //   });
    // },
    onError(err) {
      console.log(err);
      toast.loading({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  const { data: txResponse, status } = useTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log("Success", data);
      toast.success({
        status: "success",
        title: `Transaction hash: ${data?.hash}`,
      });
    },
    onError(err) {
      console.log("Error", err);
      toast.error({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  if (txResponse?.value) output = convertBigNumber(txResponse);
  else output = undefined;

  return { status, output };
};

export default useReadContract;
