interface userRow {
  name: string;
  title: string;
  contact: string;
  checkin: string;
  checkout: string;
  roomNumber: number;
}

const UserRow = ({ user }: { user: userRow }) => {
  return (
    <tr className="border-b-2">
      <td className="px-6 py-4 w-[250px]">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="text-start">
            <p className="font-medium">{user.name}</p>
            <p className="text-gray-500 text-xs">{user.title}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">{user.contact}</td>
      <td className="px-6 py-4">
        {user.checkin}{" "}
        <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
      </td>
      <td className="px-6 py-4">
        {user.checkout}{" "}
        <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
      </td>
      <td className="px-6 py-4">{user.roomNumber}</td>
    </tr>
  );
};

export default UserRow;
