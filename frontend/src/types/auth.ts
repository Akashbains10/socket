import { LoginFormValues } from "@/pages/auth/components/Login";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export type TAuth = {
    loginFn: (payload: LoginFormValues) => Promise<any>;
    logoutFn: () => Promise<AxiosResponse<any, any>>;
    isLoading: boolean;
    user: Record<any, any> | null
}

export type TMutate = MutateOptions<AxiosResponse<any, any>,Error, LoginFormValues>