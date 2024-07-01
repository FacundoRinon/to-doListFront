import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setToken } from "../../redux/userSlice";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/users`,
      data: {
        username,
        email,
        password,
        confirmPass,
      },
    });
    dispatch(setToken(response.data));
    navigate("/");
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-200">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <div className="sm:mx-auto sm:w-full">
            <img
              className="mx-auto h-10 w-auto"
              src="https://w7.pngwing.com/pngs/268/27/png-transparent-action-item-computer-icons-task-others-miscellaneous-angle-text-thumbnail.png"
              alt="Your Company"
            />
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 text-gray-900">
              Sign up to start your lists
            </h2>
          </div>

          <form className="mt-8 space-y-6" id="form" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="username"
                  name="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md bg-gray-300 p-1 border-gray-300 shadow-sm focus:border-transparent focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-gray-300 p-1 border-gray-300 shadow-sm focus:border-transparent focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md bg-gray-300 p-1 border-gray-300 shadow-sm focus:border-transparent focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md bg-gray-300 p-1 border-gray-300 shadow-sm focus:border-transparent focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
                  value={confirmPass}
                  onChange={(event) => setConfirmPass(event.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
