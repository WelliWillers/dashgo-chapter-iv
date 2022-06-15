import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { SubmitHandler, useForm, useFormState } from 'react-hook-form'
import *as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type CreateUserFormData = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

const createUserFornSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    password_confirmation: yup.string().oneOf(['', yup.ref('password')])
})


export default function CreateUser() {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFornSchema)
    })

    const { errors } = formState

    const handleCreateUser:SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 2000))

    }


    return (
        <Box>
            <Header />

            <Flex w="100%" maxWidth={1480} my="6" px="6" mx="auto">
                <Sidebar />

                <Box 
                    as="form"
                    flex="1"
                    bg="gray.800"
                    borderRadius={8}
                    p={["4","6","8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal">
                        Criar usuários
                    </Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing={["4","6","8"]}>
                        <SimpleGrid minChildWidth="240px" spacing={["4","6","8"]} w="100%">
                            <Input name="name" label="Nome completo" error={errors.name} {...register('name')} />
                            <Input name="email" type="email" label="Seu e-mail" error={errors.email} {...register('email')} />
                        </SimpleGrid>
                        
                        <SimpleGrid minChildWidth="240px" spacing={["4","6","8"]} w="100%">
                            <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
                            <Input name="password_confirmation" type="password" label="Repetir senha" error={errors.password_confirmation} {...register('password_confirmation')} />
                        </SimpleGrid>
                    </VStack>

                    <Flex justify="flex-end" mt="8">
                        <HStack spacing="4">
                            <Link href="/users" passHref><Button as="a" colorScheme="whiteAlpha"> Cancelar</Button></Link>
                            <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}> Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}