import {
  ArrowLeftOutlined,
  MoreOutlined,
  SmileOutlined,
  LinkOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Card, Input } from "antd";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2 w-full">
        <ArrowLeftOutlined className="cursor-pointer" />
        <Avatar
          icon={<FontAwesomeIcon icon={faUser} />}
          className="w-10 h-10"
        />
        <div className="flex flex-col w-full">
          <div className="font-semibold text-lg">David Glogaza</div>
          <div className="text-sm font-normal">Active</div>
        </div>
        <MoreOutlined className="text-xl cursor-pointer" />
      </div>
    </div>
  );
};

const ChatActions = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <SmileOutlined className="text-2xl cursor-pointer" />
      <Input placeholder="Schreibe eine Nachricht..." />
      <LinkOutlined className="text-2xl cursor-pointer" />
      <div className="rounded-full bg-primary cursor-pointer h-12 w-14 flex items-center justify-center">
        <SendOutlined className="text-2xl text-white" />
      </div>
    </div>
  );
};

const mockExtractor = (input) => {
  return [
    {
      message: "Hallo!",
      time: new Date(),
      sender: "David",
    },
    {
      message: "Hallo!",
      time: new Date(),
      sender: "You",
    },
    {
      message: "Ich hab neue Arbeit für dich!",
      time: new Date(),
      sender: "David",
    },
  ];
};

const Chat = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);

  return (
    <Card
      style={{ ...style, width, height }}
      bodyStyle={{
        padding: 0,
      }}
      title={<ChatHeader />}
    >
      <div
        style={{ height: height - 60 }}
        className="flex flex-col justify-between"
      >
        <div className="h-full bg-zinc-100 overflow-auto flex flex-col gap-2 p-2">
          {data.map((message) => (
            <div
              className={`flex w-full items-center ${
                message.sender.toLowerCase() === "you" && "justify-end"
              }`}
            >
              <div
                className={`${
                  message.sender.toLowerCase() === "you"
                    ? "bg-primary/10"
                    : "bg-zinc-200"
                } rounded-md w-fit px-2 py-5 relative`}
              >
                {message.message}
                <div className="absolute text-opacity-60 text-black bottom-1 right-1 text-xs">
                  {message.time.getHours()}:{message.time.getMinutes()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ChatActions />
      </div>
    </Card>
  );
};

export default Chat;
