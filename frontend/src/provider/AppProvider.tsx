import { ReactNode, Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from "./AuthProvider";

const ErrorFallback = () => {
    return (
        <div>
            <p>Oops something went wrong</p>
            <button onClick={() => window.location.assign(window.location.origin)}>Refresh</button>
        </div>
    )
}

const AppProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <Suspense fallback={<div>Loading.........</div>}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <AuthProvider>
                            {children}
                        </AuthProvider>
                    </BrowserRouter>
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </ErrorBoundary>
        </Suspense>
    )
}

export default AppProvider;
