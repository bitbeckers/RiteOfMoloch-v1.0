import useReadContract from "./useReadContract";
/**
 *
 * @param args _owner: address
 * @param args _spender: address
 * @outputs uint256 (string)
 */
export const useGetAllowance = (args: [string, string]): string => {
  const { output: allowance } = useReadContract(
    "erc20TokenAddress",
    "allowance",
    args
  );

  console.log("allowance:", allowance);
  if (allowance) return allowance;
  else return "";
};
