import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useUserRole from "../../Hook/useUserRole";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { role } = useUserRole();
  const { user, logOut, setLoading, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(role);
  const url = "https://dhaka-bus-ticket-server-two.vercel.app";

  useEffect(() => {
    if (user) {
      const cu = async () => {
        const res = await fetch(`${url}/getUserByEmail/${user?.email}`);
        const data = await res.json();
        setCurrentUser(data);
      };
      cu();
    }
  }, [loading, user, url]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const navItem = [
    { link: "Home", path: "/" },
    { link: "BookTicket", path: "book-ticket" },
    { link: "Book Bus", path: "book-bus" },
    { link: "About Us", path: "about" },
    { link: "Contact Us", path: "contact" },
  ];

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
        navigate("/"); // Redirect to the home page after logout
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "An error occurred during logout.",
        });
      });
  };

  return (
    <header className="w-full  z-[50] fixed top-0">
      <nav
        className={`py-4  lg:px-14 px-4 bg-gray-900 ${isSticky ? "shadow" : ""
          }`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center gap-8">
            <Link to="/" className="flex items-center">
              <i className="brand-color text-2xl md:text-3xl">Dhaka</i>
              <img
                className="h-6 ms-1 rounded-sm -me-1"
                src="https://i.ibb.co/qWzZ2NC/bus3.png"
                alt=""
              />
              <i className="brand-color  text-2xl md:text-3xl">Ticket</i>
            </Link>
            <ul className="md:flex space-x-12 hidden">
              {navItem.map(({ link, path }) => (
                <NavLink
                  to={path}
                  smooth="true"
                  offset={-100}
                  key={path}
                  className={({ isActive }) => {
                    return (
                      "px-2 py-2 rounded-md" +
                      (isActive
                        ? "transition-all rounded-md brand-color  duration-500 "
                        : " text-white hover:rounded-md")
                    );
                  }}
                >
                  {link}
                </NavLink>
              ))}
            </ul>

            {/* btn for large device */}
            <div className="lg:block hidden">
              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="w-full h-full rounded-full cursor-pointer"
                  >
                    <div className="w-10 rounded-full flex justify-center items-center">
                      <FaUserAlt className="bg-white text-orange-500 w-8 h-8 rounded-full"></FaUserAlt>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-950 rounded-box w-52"
                  >
                    {role == "admin" ? (
                      <>
                        <li className="text-white mb-3">
                          <Link
                            to="/dashboard/profile"
                            className="justify-between"
                          >
                            Dashboard
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="text-white mb-3">
                          <Link to={`user-profile`} className="justify-between">
                            Profile
                          </Link>
                        </li>
                        <li className="text-white mb-3">
                          <Link to="my-ticket" className="justify-between">
                            My Ticket
                          </Link>
                        </li>
                        <li className="text-white mb-3">
                          <Link to="" className="justify-between">
                            Booked Bus
                          </Link>
                        </li>
                      </>
                    )}
                    <li className="text-white mb-3">
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <li className="text-white mb-3 list-none">
                  <Link to="/login">Login</Link>
                </li>
              )}
            </div>

            {/* menu btn for only mobile device */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="focus:outline-none focus:text-gray-500"
              >
                {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
              </button>
            </div>
          </div>

          {/* items for mobile device*/}
          <div
            className={`space-y-4 px-4 mt-16 bg-black ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
              }`}
          >
            {navItem.map(({ link, path }) => (
              <NavLink
                to={path}
                smooth="true"
                offset={-100}
                key={path}
                className={({ isActive }) => {
                  return (
                    "grid p-2 my-3 rounded-md " +
                    (isActive
                      ? "transition-all rounded-md brand-color  duration-500 "
                      : " text-white hover:rounded-md")
                  );
                }}
              >
                {link}
              </NavLink>
            ))}

            <div className="lg:hidden block">
              {user ? (
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="w-full h-full rounded-full cursor-pointer"
                  >
                    <div className="w-10 rounded-full flex justify-center items-center">
                      <FaUserAlt className="bg-white text-orange-500 w-8 h-8 rounded-full"></FaUserAlt>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-950 rounded-box w-52"
                  >
                    {currentUser?.role == "admin" ? (
                      <>
                        <li className="text-white mb-3">
                          <Link
                            to="/dashboard/profile"
                            className="justify-between"
                          >
                            Dashboard
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="text-white mb-3">
                          <Link to={`user-profile`} className="justify-between">
                            Profile
                          </Link>
                        </li>
                        <li className="text-white mb-3">
                          <Link to="my-ticket" className="justify-between">
                            My Ticket
                          </Link>
                        </li>
                        <li className="text-white mb-3">
                          <Link to="" className="justify-between">
                            Booked Bus
                          </Link>
                        </li>
                      </>
                    )}
                    <li className="text-white mb-3">
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <li className="text-white mb-3 list-none">
                  <Link to="/login">Login</Link>
                </li>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
