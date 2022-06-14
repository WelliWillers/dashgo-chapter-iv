import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import { SubmitHandler, useForm, useFormState } from 'react-hook-form'
import *as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const singInfornSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
})

type SingInFormData = {
  email: string
  password: string
}

export default function SingIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(singInfornSchema)
  })

  const {errors} = formState

  const handleSingIn: SubmitHandler<SingInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(values)
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100vw"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSingIn)}
      >
        <Stack spacing="4">
          <Input 
            type="email"
            name="email"
            label="Email"
            error={errors.email}
            {...register('email')}
            />
          
          <Input 
            type="password"
            name="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" isLoading={formState.isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
