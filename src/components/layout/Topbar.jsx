import React from "react";

import { useAppContext } from "../../state";
import { USERNAME } from "../../utils/const";

const Topbar = () => {
  const { user, setUser } = useAppContext();
  const username = localStorage.getItem(USERNAME);

  if (!user) {
    return <p>...</p>;
  }

  function Logout(event) {
    event.preventDefault();
    //localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.clear();
    setUser(null);
  }

  return (
    <header className="flex pt-7 pl-7 pr-8">
      {/* <a href='/' className=' mr-32 '>
        <img src={Logo} alt="hortisol logo" />
      </a> */}
      <h1 className=" font-bold text-[22px] text-primary">
        Hortisol Tonnage Reporting
      </h1>

      <div className="profil-info flex items-center ml-auto">
        <span className=" inline-block mr-3   ">
          <img
            src={"https://mangatar.framiq.com/assets/examples/mangatar04.png"}
            alt=""
            className="w-10 h-10 rounded-full border-[1px] border-[#C4C4C4] object-fill"
          />
        </span>
        <div>
          <span className=" text-black font-bold block">{username}</span>
          <a href="/" onClick={Logout} className=" text-[#B2B2B2] block">
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
