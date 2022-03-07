import React, { useState } from "react";
import axios from "axios";
import { TiSocialFacebook, TiVendorApple } from "react-icons/ti";
import { AiOutlineGooglePlus } from "react-icons/ai";
import Link from "next/link";

const Login = () => {
  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  let key, val;
  const inputHandler = (e) => {
    e.preventDefault();
    key = e.target.name;
    val = e.target.value;
    setNewUser({
      ...newUser,
      [key]: val,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { fname, lname, email, password, checkPassword } = newUser;
    // console.log(newUser);
    if (fname && lname && email && password === checkPassword) {
      // alert("All fine" + newUser.fname + "Bhai");
      axios.post("http://localhost:4000/users/register", newUser);
      setNewUser({
        fname: "",
        lname: "",
        email: "",
        password: "",
        checkPassword: "",
      });
    } else {
      alert("Lag gaye bro");
    }
  };

  const styles = {
    registerInputs:
      "w-full px-2 py-3 mb-4 bg-gray-100 rounded-md cursor-pointer focus:outline-none",
    registerSocials:
      "p-2 text-2xl text-gray-700 border-2 border-gray-300 rounded-full cursor-pointer",
  };

  return (
    <>
      <section className="">
        <article className="flex flex-col w-[100vw] h-[100vh] items-center justify-center md:flex-row-reverse">
          <div className="mx-5 shadow-2xl shadow-brandOrange-300">
            <form className="flex flex-col text-gray-800" action="">
              <label
                htmlFor="#"
                className="my-6 text-3xl font-bold text-center"
              >
                Create Account
              </label>
              <div className="flex justify-center w-full mb-4 space-x-6">
                <Link href={""}>
                  <div className={`${styles.registerSocials}`}>
                    <AiOutlineGooglePlus />
                  </div>
                </Link>
                <Link href={""}>
                  <div className={`${styles.registerSocials}`}>
                    <TiSocialFacebook />
                  </div>
                </Link>
                <Link href={""}>
                  <div className={`${styles.registerSocials}`}>
                    <TiVendorApple />
                  </div>
                </Link>
              </div>
              <div className="pt-4 mx-8 mb-4 text-sm text-center border-t border-gray-300">
                <p>Or continue with your Email Id</p>
              </div>
              <div className="px-5">
                <div className="flex justify-between w-full">
                  <input
                    className={`${styles.registerInputs} w-[48%] `}
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="First Name"
                    onChange={inputHandler}
                    value={newUser.fname}
                    autoComplete="off"
                  />
                  <input
                    className={`${styles.registerInputs} w-[48%]`}
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Last Name"
                    onChange={inputHandler}
                    value={newUser.lname}
                    autoComplete="off"
                  />
                </div>
                <input
                  className={`${styles.registerInputs}`}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Id"
                  onChange={inputHandler}
                  value={newUser.email}
                  autoComplete="off"
                />
                <p class="mt-2 hidden peer-invalid:block text-sm">
                  Please provide a valid email address.
                </p>
                <input
                  className={`${styles.registerInputs}`}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create Password"
                  onChange={inputHandler}
                  value={newUser.password}
                  autoComplete="off"
                />
                <input
                  className={`${styles.registerInputs}`}
                  type="text"
                  id="checkPassword"
                  name="checkPassword"
                  placeholder="Re-Enter Password"
                  onChange={inputHandler}
                  value={newUser.checkPassword}
                  autoComplete="off"
                />
                <input
                  className={`${styles.registerInputs} bg-[#ff6c37] text-white tracking-wide text-lg mb-6`}
                  type="button"
                  onClick={submitHandler}
                  value={"Register"}
                />
              </div>
            </form>
          </div>
          <div className="hidden md:block">Box</div>
        </article>
      </section>
    </>
  );
};

export default Login;
