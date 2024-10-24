import Image from "next/image";

const SideLeft = () => {
  const todos = [
    { id: 1, text: "Confirm customer reservations" },
    { id: 2, text: "Prepare check-in documents" },
    { id: 3, text: "Prepare room key" },
    { id: 4, text: "Clean checked-out rooms" },
  ];

  return (
    <div className="bg-[#FE856F] p-5 h-full flex flex-col items-center gap-7 text-white">
      <div className="text-center">
        <div>
          <Image src="/images/lyfdesk.png" width={80} height={80} alt="logo" />
        </div>
      </div>
      <div className="text-center">
        <div>
          <Image
            src="/images/profile.png"
            width={75}
            height={75}
            alt="arrow"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <p className="font-bold my-2">Hyejin Kim</p>
        <p className="text-sm">Front Office</p>
      </div>
      <div className="border-b-2 border-white w-full"></div>
      <div className="text-center">
        <div className="w-36 h-36 border-2 border-white rounded-full mb-2 flex justify-center items-center flex-col">
          <p className="text-5xl">54</p>
          <p>Percent</p>
        </div>
      </div>
      <div className="border-b-2 border-white w-full"></div>
      <div className="text-center">
        <div className="w-60 h-36 bg-white rounded-md flex justify-center items-center">
          <ul className="text-sm text-black">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded border-gray-300"
                />
                <span>{todo.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideLeft;
