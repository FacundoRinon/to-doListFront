import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setToken } from "../../redux/userSlice";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/users/login`,
      data: {
        user,
        password,
      },
    });
    if (response.data.token) {
      dispatch(setToken(response.data));
      navigate("/");
    }
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
              Welcome back
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address:
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-gray-300 p-1 border-gray-300 shadow-sm focus:border-transparent focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
                  value={user}
                  onChange={(event) => setUser(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password:
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-gray-300 p-1 border-gray-300 shadow-sm focus:border-transparent focus:ring focus:ring-indigo-600 focus:ring-opacity-50 sm:text-sm"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to={"/signUp"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up and start your lists now!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
