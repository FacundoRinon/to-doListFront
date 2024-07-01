import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";

import { removeToken } from "../../redux/userSlice";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Lists", href: "/lists" },
  { name: "All tasks", href: "/tasks" },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  interface RootState {
    user: {
      id: number;
      username: string;
      email: string;
    };
  }

  const user = useSelector((state: RootState) => state.user);

  async function handleBurguer(item: any) {
    navigate(item.href);
    setMobileMenuOpen(false);
  }

  async function handleLogout() {
    dispatch(removeToken(user));
    navigate("/login");
  }

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50 ">
        <nav
          className="flex items-center justify-between p-6 lg:px-8 navCustom"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <p onClick={() => navigate("/")} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://w7.pngwing.com/pngs/268/27/png-transparent-action-item-computer-icons-task-others-miscellaneous-angle-text-thumbnail.png"
                alt=""
              />
            </p>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <p
                key={item.name}
                onClick={() => navigate(item.href)}
                className="cursor-pointer text-blue-500 text-lg font-semibold leading-6 hover:text-blue-700"
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <p
                onClick={() => handleLogout()}
                className="cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:text-red-500"
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </p>
            ) : (
              <Link
                to={"/login"}
                className="cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:text-green-500"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://w7.pngwing.com/pngs/268/27/png-transparent-action-item-computer-icons-task-others-miscellaneous-angle-text-thumbnail.png"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <p
                      key={item.name}
                      onClick={() => handleBurguer(item)}
                      className="cursor-pointer text-blue-500 text-lg mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-500 hover:bg-gray-50"
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <p
                      onClick={() => handleLogout()}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log out
                    </p>
                  ) : (
                    <Link
                      to={"/login"}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
