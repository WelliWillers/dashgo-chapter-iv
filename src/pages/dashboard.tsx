import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';


const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
})

const options: ApexOptions = {
    chart: {
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        },
        foreColor: theme.colors.gray[500]
    },
    grid: {
        show: false
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600],
        },
        axisTicks: {
            color: theme.colors.gray[600],
        },
        categories: [
            '2021-05-01T00:00:00.000Z',
            '2021-05-02T00:00:00.000Z',
            '2021-05-03T00:00:00.000Z',
            '2021-05-04T00:00:00.000Z',
            '2021-05-05T00:00:00.000Z',
            '2021-05-06T00:00:00.000Z',
            '2021-05-07T00:00:00.000Z'
        ],
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        }
    }
}

const series = [
    {
        name: "series1", data: [31,120,10,52,13,90, 200]
    }
]

export default function Dashboar() {
    return (
        <Flex direction="column" h="100vh">
            <Header/>

            <Flex w="100%" maxWidth={1480} my="6" px="6" mx="auto">
                <Sidebar />

                <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
                    <Box 
                        p="8"
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text  fontSize="lg" mb="4">
                            Inscritos da semana
                        </Text>
                        <Chart options={options} type="area" height="160" series={series} />
                    </Box>
                    
                    <Box 
                        p="8"
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text  fontSize="lg" mb="4">
                            Inscritos da semana
                        </Text>
                        <Chart options={options} type="area" height="160" series={series} />
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
} 