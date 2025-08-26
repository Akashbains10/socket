import nomessage from '@/assets/message.png'
import UsersListItem from "./UsersListItem";
import { useEffect, useRef } from "react";
import { useAllUsers } from "@/api/users/getAllUsers";

const UsersList = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAllUsers({ search: "" });

  console.log(data, 'data of users')

  // 👇 Flatten all pages into one array
  const users = data?.pages.flatMap((page) => page) ?? [];

  console.log(users, 'flattened users')


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.25 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!isLoading && users.length === 0) {
    return (
      <div className="flex flex-col h-100 gap-2 justify-center items-center">
        <img src={nomessage} alt="no-message" />
        <span className="font-medium text-lg">No user found</span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {users?.map((chat) => (
        <div key={chat._id} className="my-2">
          <UsersListItem {...chat} />
        </div>
      ))}

      {/* Loader always present for observer */}
      <div ref={loaderRef} className="h-10 flex justify-center items-center text-gray-500">
        {isFetchingNextPage ? "Loading..." : ""}
      </div>
    </div>
  );
};

export default UsersList;
