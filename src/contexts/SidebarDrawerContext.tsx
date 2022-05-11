import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerContextProps {
    children: ReactNode
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerContextProvider({children}: SidebarDrawerContextProps){

    const discouver = useDisclosure()
    const router = useRouter()

    useEffect(() => {
        discouver.onClose()
    }, [router.asPath])

    return (
        <SidebarDrawerContext.Provider value={discouver}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}


export const useSidebarDrawer = () => useContext(SidebarDrawerContext)