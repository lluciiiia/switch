"use client";
import { useState } from "react";
import { users } from "../../data/userData";
import UserRow from "./UserRow";

const Checkin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(users.length / usersPerPage))
    );
  };

  return (
    <div className="my-6">
      <div className="w-full bg-white rounded-md shadow-md">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-start">
                <thead className="text-lg border-b-2">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left">
                      Profile
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      Check-in
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      Check-out
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      Room number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <UserRow key={user.name} user={user} />
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end gap-4 mt-4 mx-4 mb-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={
                    currentPage === Math.ceil(users.length / usersPerPage)
                  }
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkin;
