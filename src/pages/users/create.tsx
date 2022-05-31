import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function CreateUser() {
    return (
        <Box>
            <Header />

            <Flex w="100%" maxWidth={1480} my="6" px="6" mx="auto">
                <Sidebar />

                <Box 
                    flex="1"
                    bg="gray.800"
                    borderRadius={8}
                    p={["4","6","8"]}
                >
                    <Heading size="lg" fontWeight="normal">
                        Criar usuários
                    </Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing={["4","6","8"]}>
                        <SimpleGrid minChildWidth="240px" spacing={["4","6","8"]} w="100%">
                            <Input name="name" label="Nome completo" />
                            <Input name="email" type="email" label="Seu e-mail" />
                        </SimpleGrid>
                        
                        <SimpleGrid minChildWidth="240px" spacing={["4","6","8"]} w="100%">
                            <Input name="password" type="password" label="Senha" />
                            <Input name="password_confirmation" type="password" label="Repetir senha" />
                        </SimpleGrid>
                    </VStack>

                    <Flex justify="flex-end" mt="8">
                        <HStack spacing="4">
                            <Link href="/users" passHref><Button as="a" colorScheme="whiteAlpha"> Cancelar</Button></Link>
                            <Button colorScheme="pink"> Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}