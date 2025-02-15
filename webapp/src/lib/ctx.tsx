import { TrpcRouterOutput } from "@ideaapp/server/src/router"
import { createContext, useContext } from "react"
import { trpc } from "./trpc"
import { Loader } from "../components/Loader"

export type AppContext = {
    my: TrpcRouterOutput["getMy"]["my"]
}

const AppReactContext = createContext<AppContext>({
    my: null
})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const {data, error, isLoading, isError, isFetching} = trpc.getMy.useQuery()
    return (
        <AppReactContext.Provider value={{
            my: data?.my || null
        }}
        >
            {isLoading || isFetching? <Loader type="page" />: isError? <p>Error: {error.message}</p>: children}
        </AppReactContext.Provider>
    )
}
export const useAppContext = () => {
    return useContext(AppReactContext)
}
export const useMy = () => {
    return useAppContext().my
}