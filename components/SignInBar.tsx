import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

const SignInBar = (props: Props) => {
  const { data: session, status } = useSession();
  console.log(session, status, "Topbar");
  if (!session) {
    return (
      <a
        href="/signin"
        className="text-sm bg-sky-500 hover:shadow-lg hover:shadow-sky-400 text-white rounded-s-full rounded-e-full p-2 duration-500 ease-in-out"
      >
        Masuk / Daftar
      </a>
    );
  }
  return <span className="text-white">Ada</span>;
};

export default SignInBar;
