import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile(){
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text >Wellington willers</Text>
                <Text color="gray.300" fontSize="small">Wellington.willers@gmail.com</Text>
            </Box>

            <Avatar size="md" name="wellington willers" />
        </Flex>
    );
}