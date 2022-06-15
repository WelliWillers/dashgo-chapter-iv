import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {

    const showInLarge = useBreakpointValue({
        base: false,
        lg: true
    })

    useEffect(() => {
        fetch('http://localhost:3000/api/users')
            .then((res) => res.json())
            .then((data) => console.log(data))
    }, [])

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
                        <Heading size="large" fontWeight="normal">
                            Usuários
                        </Heading>

                        <Link href="/users/create" passHref>
                            <Button as="a" size="sm" fontSize="small" colorScheme="pink"  leftIcon={<Icon fontSize="20" as={RiAddLine}></Icon>}>
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>

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
                            <Tr>
                                <Td px={["4","4","6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td px={["4","4","6"]}>
                                    <Box>
                                        <Text fontWeight="bold">
                                            Wellington willers
                                        </Text>
                                        <Text fontSize="sm" color="gray.300">
                                            Wellington.willers@gmail.com
                                        </Text>
                                    </Box>
                                </Td>
                                {
                                    showInLarge && (
                                        <Td>
                                            04 de Abril, 1999
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
                        </Tbody>
                    </Table>

                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}