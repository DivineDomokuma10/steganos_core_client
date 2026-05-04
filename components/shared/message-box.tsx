import { cn } from "@/utils";
import { Terminal } from "lucide-react";

interface IMessagesBoxProps {
  messages: string[] | string;
  status: "error" | "success";
}
const MessagesBox = ({ status, messages }: IMessagesBoxProps) => {
  return (
    <section
      className={cn("w-full p-5 border  flex flex-col space-y-2", {
        "bg-red-600/10 border-red-600": status === "error",
        "bg-green-600/10 border-green-600": status === "success",
      })}
    >
      {typeof messages === "string" && (
        <div className="flex items-center space-x-2">
          <Terminal
            size={18}
            className={cn("stroke-3", {
              "text-red-500": status === "error",
              "text-green-500": status === "success",
            })}
          />

          <p
            className={cn("text-sm", {
              "text-red-500": status === "error",
              "text-green-500": status === "success",
            })}
          >
            {messages.toUpperCase()}
          </p>
        </div>
      )}

      {Array.isArray(messages) &&
        messages.map((errMsg, i) => (
          <div key={errMsg + i} className="flex items-center space-x-2">
            <Terminal
              size={18}
              className={cn("stroke-3", {
                "text-red-500": status === "error",
                "text-green-500": status === "success",
              })}
            />

            <p
              className={cn("text-sm", {
                "text-red-500": status === "error",
                "text-green-500": status === "success",
              })}
            >
              {errMsg.toUpperCase()}
            </p>
          </div>
        ))}
    </section>
  );
};

export default MessagesBox;
