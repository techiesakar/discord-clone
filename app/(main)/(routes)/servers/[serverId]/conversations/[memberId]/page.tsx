import { ChatHeader } from "@/components/chat/chat-header";

const MemberIdPage = async () => {
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader type="conversation" name="Richard Sams" />
    </div>
  );
};

export default MemberIdPage;
