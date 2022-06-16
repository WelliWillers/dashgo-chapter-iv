import { 
    Box, 
    Button, 
    Checkbox, 
    Flex, 
    Heading, 
    Icon, 
    Spinner, 
    Table, 
    Tbody, 
    Td, 
    Text, 
    Th, 
    Thead, 
    Tr, 
    useBreakpointValue 
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";

export default function UserList() {

    const {data, isLoading, isFetching, error} = useUsers()

    const showInLarge = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Box>
            <Header />

            <Flex w="100%" maxWidth={1480} my="6" p={["4","4","6"]} mx="auto">
                <Sidebar />


                <Box 
                    flex="1"
                    bg="gray.800"
                    borderRadius={8}
                    p={["4","6","8"]}
                >
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {
                                !isLoading && isFetching && (
                                    <Spinner size="sm" color="gray.500" ml="4" />
                                )
                            }
                        </Heading>

                        <Link href="/users/create" passHref>
                            <Button as="a" size="sm" fontSize="small" colorScheme="pink"  leftIcon={<Icon fontSize="20" as={RiAddLine}></Icon>}>
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>

                    {
                        isLoading ? (
                            <Flex justify={"center"}>
                                <Spinner />
                            </Flex>
                        ) : error ? (
                            <Flex justify={"center"}>
                                <Text>Nenhum usuário foi encontrado</Text>
                            </Flex>
                        ) : (
                            <>
                                <Table colorScheme="whiteAlpha">
                                    <Thead>
                                        <Tr>
                                            <Th px={["4","4","6"]} color="gray.300" w="8">
                                                <Checkbox colorScheme="pink" />
                                            </Th>
                                            <Th>
                                                USUÁRIO
                                            </Th>
                                            {
                                                showInLarge && (
                                                    <Th>
                                                        DATA DE NASCIMENTO
                                                    </Th>
                                                )
                                            }
                                            <Th w="8"></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            data.map(user => (
                                                <Tr key={user.id}>
                                                    <Td px={["4","4","6"]}>
                                                        <Checkbox colorScheme="pink" />
                                                    </Td>
                                                    <Td px={["4","4","6"]}>
                                                        <Box>
                                                            <Text fontWeight="bold">
                                                            {user.name}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.300">
                                                            {user.email}
                                                            </Text>
                                                        </Box>
                                                    </Td>
                                                    {
                                                        showInLarge && (
                                                            <Td>
                                                                {user.createdAt}
                                                            </Td>
                                                        )
                                                    }
                                                    {
                                                        showInLarge && (
                                                            <Td>
                                                                <Button as="a" size="sm" fontSize="small" colorScheme="blue" leftIcon={<Icon as={RiPencilLine}></Icon>}>
                                                                    Editar
                                                                </Button>
                                                            </Td>
                                                        )    
                                                    }
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>

                                <Pagination />
                            </>
                        )
                    }
                </Box>
            </Flex>
        </Box>
    )
}