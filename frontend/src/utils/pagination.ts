import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState<number>(1);
    const changePage = (newPage: number) => setPage(newPage);

    return {
        page,
        changePage
    };
}