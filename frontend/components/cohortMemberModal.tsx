import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  SimpleGrid,
  Box,
  Link,
} from "@raidguild/design-system";
import { Modal } from "@chakra-ui/modal";
import { CohortMetadata, MemberData } from "utils/types/subgraphQueries";
import { useNetwork } from "wagmi";
import { unixToUTC } from "utils/general";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { COHORT_METADATA } from "utils/subgraph/queries";
import { useRouter } from "next/router";
import { useSubgraphReactQuery } from "hooks/useSubgraphReactQuery";

interface CohortMemberModalProps {
  initiateData: MemberData;
}

const CohortMemberModal: React.FC<CohortMemberModalProps> = ({
  initiateData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useNetwork();
  const router = useRouter();

  const { address } = router.query;

  const metadata = useSubgraphReactQuery(
    COHORT_METADATA(address),
    Boolean(address)
  );
  const cohort: CohortMetadata | null = metadata?.data?.cohort;
  // console.log("cohort", cohort);

  const getDeadline = (): string => {
    const deadline = (
      Number(cohort?.createdAt) +
      Number(cohort?.time) * 1000
    ).toString();
    return unixToUTC(deadline);
  };

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address.slice(0, 4)}...{address.slice(-6)}
    </Link>
  );
  // console.log(initiateData);

  const handleSlashStake = () => {
    console.log("slashing member stake");
    // Ethers slash function
  };
  return (
    <>
      <Button onClick={onOpen} size="xxs" w="full">
        Manage
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} variant="member">
        <ModalOverlay onClick={onClose} />
        <ModalContent minW="full">
          <ModalHeader>Initiate</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="-1.5em">
            <SimpleGrid columns={3} spacingX={2} mb={2}>
              <Box justifySelf="center" textAlign="center" w="full">
                Address:
              </Box>
              <Box justifySelf="center" textAlign="center" w="full">
                Shares:
              </Box>
              <Box justifySelf="center" textAlign="center" w="full">
                Date Staked:
              </Box>
            </SimpleGrid>
            <SimpleGrid
              columns={3}
              spacingX={2}
              px={2}
              pt={2}
              pb={2.5}
              bg="black"
              borderTop="1px solid #FF3864"
              borderBottom="1px solid #FF3864"
              alignItems="center"
            >
              <Box justifySelf="center" textAlign="center" w="full">
                <Text>{blockExplorerLink(initiateData.address)}</Text>
              </Box>
              <Box
                justifyContent="center"
                textAlign="center"
                w="full"
                // px={3}
              >
                <Text>{initiateData.stake}</Text>
              </Box>
              <Box justifyContent="center" textAlign="center" w="full">
                <Text>{unixToUTC(initiateData.joinedAt)}</Text>
              </Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Box>
              <Button variant="gray" size="md" onClick={handleSlashStake}>
                Slash Stake
              </Button>
              <Text mt={1} fontSize="xx-small" color="red">
                Slashing is available in {getDeadline()} days
              </Text>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortMemberModal;
