import { useEffect, useState, useCallback } from "react";

type AsyncInitializeState<T> = {
    data?: T;
    error?: Error;
    loading: boolean;
};

interface ApiResponse<T> {
    status: number;
    data: T;
}

export function useAsyncRequest<T>(
    func: () => Promise<ApiResponse<T>>,
    deps: React.DependencyList = [],
    onSuccess?: (data: T) => void
) {
    const [state, setState] = useState<AsyncInitializeState<T>>({
        data: undefined,
        error: undefined,
        loading: true,
    });

    const execute = useCallback(async () => {
        // setState({ data: undefined, error: undefined, loading: true });
        try {
            const result = await func();
            if (result.status === 200) {
                setState({ data: result.data, error: undefined, loading: false });
                if (onSuccess) {
                    onSuccess(result.data);
                }
            } else {
                setState({
                    data: undefined,
                    error: new Error("Unexpected status code"),
                    loading: false,
                });
            }
        } catch (error) {
            setState({ data: undefined, error: error as Error, loading: false });
        }
    }, [func, onSuccess]);

    useEffect(() => {
        execute();
    }, [...deps]);

    return { ...state, execute };
}
