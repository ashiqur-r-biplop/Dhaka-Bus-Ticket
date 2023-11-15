import { Link, Outlet, useNavigate } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import ActiveLink from "../../../Pages/DashBoard/ActiveLink/ActiveLink";
import Navbar from "../../../Shared/Navbar/Navbar";

const MainDashBoard = () => {
  const [currentUser, setCurrentUser] = useState({});
  const { user, logOut, deleteAnUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const url = "https://dhaka-bus-ticket-server-two.vercel.app";

  useEffect(() => {
    const cu = async () => {
      const res = await fetch(`${url}/getUserByEmail/${user?.email}`);
      const data = await res.json();
      setCurrentUser(data);
    };
    cu();
  }, [user, url]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `${user.displayName} Logout Successful`,
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "warning",
          title: `${user.displayName} Logout Failed`,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  // const handleDeleteUserFromFirebaseAndDatabase = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Delete the user from the database first
  //       fetch(`${url}/deleteUser/${id}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           deleteAnUser()
  //             .then(() => {
  //               Swal.fire({
  //                 icon: "success",
  //                 title: `${user.displayName} delete your account Successfully`,
  //                 showConfirmButton: false,
  //                 timer: 5000,
  //               });
  //               navigate("/");
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //               Swal.fire({
  //                 icon: "warning",
  //                 title: `${user.displayName} delete from Firebase Failed`,
  //                 showConfirmButton: false,
  //                 timer: 3000,
  //               });
  //             });
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           Swal.fire({
  //             icon: "warning",
  //             title: `${user.displayName} delete from Database Failed`,
  //             showConfirmButton: false,
  //             timer: 3000,
  //           });
  //         });
  //     }
  //   });
  // };

  const isAdmin = true;
  const isUser = false;

  const adminOptions = (
    <>
      <ActiveLink to="/">
        <li>Home</li>
      </ActiveLink>
      {/* <ActiveLink to="/dashboard/postBus">
        <li>Post Bus</li>
      </ActiveLink> */}
      <ActiveLink to="/dashboard/all-ticket">
        <li>All Ticket</li>
      </ActiveLink>
      <ActiveLink to="/dashboard/all-user">
        <li>All User</li>
      </ActiveLink>
      <ActiveLink to="/dashboard/post-notice">
        <li>Post Notice</li>
      </ActiveLink>
      <ActiveLink to="/">
        <li onClick={handleLogOut}>Logout</li>
      </ActiveLink>
    </>
  );

  const userOptions = (
    <>
      <ActiveLink to="/dashboard/my-ticket">
        <li>My Ticket</li>
      </ActiveLink>
      <ActiveLink to="/">
        <li onClick={handleLogOut}>Logout</li>
      </ActiveLink>
    </>
  );

  return (
    <div className="">
      <div className="drawer mx-auto">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content lg:flex">
          <div className="w-full lg:h-screen lg:w-2/12 bg-gray-800 brand-color overflow-y-auto">
            <div className="flex">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                  <GrMenu className="w-6 h-6" />
                </label>
              </div>
              <div>
                <Link to="/" className="flex items-center justify-center h-[10vh]">
                  <span className="brand-color text-2xl">Dhaka</span>
                  <img className="h-6 w-12 ms-1 rounded-sm -me-1" src="https://i.ibb.co/qWzZ2NC/bus3.png" alt="" />
                  <span className="brand-color  text-2xl">Ticket</span>
                </Link>
              </div>
            </div>
            <div className="flex-none hidden lg:block mt-4">
              <ul className="menu-vertical">
                <ActiveLink to="/dashboard/profile">
                  <li>Profile</li>
                </ActiveLink>
                {isAdmin && <> {adminOptions} </>}
                {isUser && <> {userOptions} </>}
              </ul>
            </div>
          </div>
          <div className="lg:w-full">
            <div className="overflow-y-auto max-h-[95vh] ">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay overflow-x-auto max-h-[100vh]"></label>
          <ul className="p-4 w-52 bg-gray-800 text-white overflow-y-auto">
            <ActiveLink to="/dashboard/profile">
              <li>Profile</li>
            </ActiveLink>
            {isAdmin && <> {adminOptions} </>}
            {isUser && <> {userOptions} </>}
          </ul>
        </div>
      </div>
      <div>{/* Footer position [if need] */}</div>
    </div>
  );
};

export default MainDashBoard;
