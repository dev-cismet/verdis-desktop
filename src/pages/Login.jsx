import Login from "../components/authentication/Login";

const Page = () => {
  return (
    <div className="h-screen">
      {/* <img
        src="/images/background.jpg"
        alt="Hintergrund Bild"
        className="absolute z-0"
      /> */}
      <div className="w-full flex h-full items-center justify-center bg-rain">
        <Login width="40%" height="50%" />
      </div>
    </div>
  );
};

export default Page;
