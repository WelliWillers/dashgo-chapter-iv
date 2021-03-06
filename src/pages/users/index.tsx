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
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {

    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useUsers(page, {
        initialData: users,
    })

    const showInLarge = useBreakpointValue({
        base: false,
        lg: true,
    })

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['user', userId], async () => {
                const response = await api.get(`users/${userId}`)

                return response.data;
            }, {
                staleTime: 1000 * 60 * 10, // 10 minutes
            })
    }

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
                                            users.map(user => (
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

                                <Pagination
                                    totalCountOfRegisters={totalCount}
                                    currentPage={page}
                                    onPageChange={setPage}
                                />
                            </>
                        )
                    }
                </Box>
            </Flex>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { users, totalCount } = await getUsers(1)
  
    return {
        props: {
            users,
            totalCount
        }
    }
}