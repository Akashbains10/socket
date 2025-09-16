const ReceiverMessage = ({ content }: { content: string }) => {
  return (
    <div className="flex flex-col items-end mb-4">
      <div className="bg-indigo-500 text-white shadow-sm p-3 rounded-lg rounded-br-none max-w-md">
        <p className="text-sm">{content}</p>
      </div>
      <div className="text-xs text-gray-400">
        3:52 pm
      </div>
    </div>
  );
};

export default ReceiverMessage;
