import { Button } from "@chakra-ui/react";

interface PaginationProps {
    number: number;
    isCurrent?: boolean; 
}

export function PaginationItem({isCurrent, number}: PaginationProps) {
    if(isCurrent) {
        return (
            <Button fontSize="xs" w="4" colorScheme="pink" disabled _disabled={{bgColor: 'pink.500', cursor: 'default'}} size="sm">
                {number}
            </Button>
        )
    }

    return (
        <Button fontSize="xs" colorScheme="gray.100" w="4" _hover={{bgColor: 'pink.300'}} size="sm">
            {number}
        </Button>
    )
}