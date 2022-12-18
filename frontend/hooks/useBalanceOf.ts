import useWriteContract from "./useWriteContract";

/**
 *
 * @param args account: address
 * @outputs uint256
 *
 */
const useBalanceOf = (args: [string]) => {
  const {
    write: writeBalanceOf,
    txData: txDataBalanceOf,
    // status: statusBalanceOf,
  } = useWriteContract("erc20TokenAddress", "balanceOf", args);
  return {
    writeBalanceOf,
    txDataBalanceOf,
    // statusBalanceOf,
  };
};

export default useBalanceOf;
