import { User } from "@/types/user";
import nomessage from '@/assets/message.png'
import UsersListItem from "./UsersListItem";
import { useEffect, useRef, useState } from "react";
import { useAllUsers } from "@/api/users/getAllUsers";
import { usePagination } from "@/utils/pagination";


const UsersList = () => {
  const { page, changePage } = usePagination();
  const [search, setSearch] = useState<string>("");

  const { data: users, isLoading, isFetching, refetch } = useAllUsers({
    page,
    search
  });

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const paginationFn = () => {
    // Pagination logic here
    changePage(page + 1);
    console.log("Pagination function called");
  }

  useEffect(() => {
    refetch();
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          paginationFn();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current as Element);
      }
    };

  }, [loaderRef, isFetching])

  if (users?.data?.length === 0) {
    return (
      <div className="flex flex-col h-100 gap-2 justify-center items-center">
        <img src={nomessage} alt="no-message" />
        <span className="font-medium text-lg">No user found</span>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {users?.data?.map((chat, idx) => (
        <div key={idx} className="my-2">
          <UsersListItem {...chat} />
        </div>
      ))}
      {isFetching && (
        <div ref={loaderRef} className="h-10 flex justify-center items-center text-gray-500">
          Loading......
        </div>
      )}
    </div>
  );
};

export default UsersList;
