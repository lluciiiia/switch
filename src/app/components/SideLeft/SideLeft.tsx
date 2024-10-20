const SideLeft = () => {
  return (
    <div className="bg-gray-100 p-5 h-screen flex flex-col items-center gap-10">
      <div className="text-center">
        <div className="w-24 h-8 bg-gray-300 rounded-md"></div>
      </div>
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full mb-2"></div>
        <p>Profile</p>
      </div>
      <div className="border-b-2 border-gray-300 w-full"></div>
      <div className="text-center">
        <div className="w-36 h-36 border-2 border-gray-300 rounded-full mb-2 flex justify-center items-center">
          <p>Tasks Percent</p>
        </div>
      </div>
      <div className="border-b-2 border-gray-300 w-full"></div>
      <div className="text-center">
        <div className="w-52 h-36 bg-gray-300 rounded-md flex justify-center items-center">
          <p>To Do List</p>
        </div>
      </div>
    </div>
  );
};

export default SideLeft;
