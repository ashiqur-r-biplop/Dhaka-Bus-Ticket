import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { signIn, user, createUserWithGoogle, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.loginPassword)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 3000,
        });
        setLoading(false);
        navigate(from, { replace: true });
        reset();
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          title: "Login Failed",
          text: error.message,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const handleGoogleSignIn = () => {
    createUserWithGoogle()
      .then((result) => {
        setLoading(false);
        const loggedInUser = result.user;
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          photo: loggedInUser.photoURL,
        };

        fetch(`https://dhaka-bus-ticket-server-two.vercel.app/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
            setLoading(false);
          });
      })
      .catch((error) => {
        navigate(from, { replace: true });
        setLoading(false);
        console.log(error);
        Swal.fire({
          icon: "warning",
          title: `${user.displayName} Login Failed`,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <div className="bg-orange-50 min-h-screen flex flex-col md:flex-row lg:pt-16">
      <div
        className="md:w-1/2 h-64 md:h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/autonomous-public-transport-abstract-concept-vector-illustration-self-driving-bus-urban-transport-services-smart-taxi-automatic-road-service-public-bus-city-train-traffic-abstract-metaphor_335657-1771.jpg?size=626&ext=jpg')`,
        }}
      ></div>

      <div className="md:w-1/2 p-4 md:p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <form name="loginForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                className={`bg-white rounded p-2 border focus:outline-none focus:border-orange-500 ${
                  errors.email && "border-red-500"
                }`}
                {...register("email", { required: "Email is required" })}
                placeholder="Email or Username"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                name="loginPassword"
                className={`bg-white rounded p-2 border focus:outline-none focus:border-orange-500 ${
                  errors.loginPassword && "border-red-500"
                }`}
                {...register("loginPassword", {
                  required: "Password is required",
                })}
                placeholder="Password"
              />
              {errors.loginPassword && <span className="text-red-500">{errors.loginPassword.message}</span>}
            </div>
            <div>
              <button
                type="submit"
                className={`text-white bg-blue-500 p-2 rounded focus:outline-none focus:border-orange-500 transition duration-300 ease-in-out w-full`}
              >
                Login
              </button>
            </div>
          </form>
          <div>
            <div className="flex items-center mt-4">
              <div className="border-t border-gray-300 flex-grow"></div>
              <div className="mx-4 text-gray-500">or</div>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleGoogleSignIn()}
                className="border border-gray-300 rounded p-2 flex items-center justify-center w-full bg-orange-500 text-white"
              >
                <span className="mr-2">
                  <FcGoogle />
                </span>
                <span className="text-sm">Login with Google</span>
              </button>
            </div>
            <div className="mt-4 text-center flex items-center space-x-2">
              <p className="text-gray-600">Don't have an account?</p>
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
