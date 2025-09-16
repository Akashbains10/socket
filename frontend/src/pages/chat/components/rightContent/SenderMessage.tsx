import Avatar from "@mui/material/Avatar";

const SenderMessage = ({ name, content }: { name: string; content: string }) => {
    return (
        <div className="flex flex-col items-start gap-2 mb-4">
            <div className="flex items-end gap-2">
                <Avatar sx={{ width: 36, height: 36 }} />
                <div className="bg-white shadow-sm p-3 rounded-lg rounded-bl-none max-w-md">
                    <p className="text-sm text-gray-800">{content}</p>
                    {/* <span className="text-xs text-gray-500">~ {name}</span> */}
                </div>
            </div>

            <div className="text-xs text-gray-400">
                3:50 pm
            </div>
        </div>
    );
};

export default SenderMessage;
