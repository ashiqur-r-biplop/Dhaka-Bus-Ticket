import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const {
    createUserWithEmail,
    updateUserProfileName,
    createUserWithGoogle,
    user,
    setLoading,
  } = useContext(AuthContext);

  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const password = watch("loginPassword");
  const confirmPassword = watch("confirmPassword");

  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    const userData = {
      name: data.name,
      email: data.email,
      password: data.loginPassword,
      number: data.phoneNumber,
      role: "user",
    };

    createUserWithEmail(data.email, data.loginPassword)
      .then((result) => {
        setReload(true);
        updateUserProfileName(userData.name)
          .then(() => {
            const saveUserData = {
              name: userData.name,
              email: userData.email,
              number: userData.number,
              role: userData.role,
            };

            fetch(`https://dhaka-bus-ticket-server-two.vercel.app/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(saveUserData),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.insertedId) {
                  Swal.fire({
                    icon: "success",
                    title: `${userData.name} Login Successful`,
                    showConfirmButton: false,
                    timer: 3000,
                  });
                  reset();
                  setLoading(false);
                  navigate(from, { replace: true });
                }
                reset();
              })
              .catch((error) => {
                Swal.fire({
                  icon: "warning",
                  title: `${userData.name} User Registering Failed`,
                  showConfirmButton: false,
                  timer: 3000,
                });
              });
          })
          .catch((error) => {
            Swal.fire({
              icon: "warning",
              title: `${userData.name} update Failed`,
              showConfirmButton: false,
              timer: 3000,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          title: `${userData.name} Login Failed`,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const handleGoogleSignUp = () => {
    createUserWithGoogle()
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);

        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          photo: loggedInUser.photoURL,
          number: loggedInUser.phoneNumber,
          role: "user",
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
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        Swal.fire({
          icon: "warning",
          title: `${user.displayName} Login Failed`,
          showConfirmButton: false,
          timer: 3000,
        });
        navigate(from, { replace: true });
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
          <form name="loginForm" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="text-center text-3xl font-bold text-black mb-4">Create New Account</div>
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                className={`bg-white rounded p-2 border focus:outline-none focus:border-orange-500 ${
                  errors.name && "border-red-500"
                }`}
                {...register("name", { required: "Your Name is required" })}
                placeholder="Your Name"
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

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
            <div className="flex flex-col">
              <input
                type="password"
                name="confirmPassword"
                className={`bg-white rounded p-2 border focus:outline-none focus:border-orange-500 ${
                  errors.confirmPassword && "border-red-500"
                }`}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                className={`bg-white rounded p-2 border focus:outline-none focus:border-orange-500 ${errors.email && "border-red-500"
                  }`}
                {...register("email", { required: "Email is required" })}
                placeholder="Email or Username"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="tel"
                name="phoneNumber"
                className={`bg-white rounded p-2 border focus:outline-none focus:border-orange-500 ${
                  errors.phoneNumber && "border-red-500"
                }`}
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
            </div>

            <div className="flex justify-center items-center">
              <label className="flex items-center">
                <input type="checkbox" name="agreement" onChange={handleAgreementChange} />
                <span className="ml-2 text-black">
                  I agree to the{" "}
                  <Link to="" className="text-orange-500">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="" className="text-orange-500">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className={`${
                  isAgreed && password === confirmPassword ? "bg-blue-600 text-white" : "bg-gray-400"
                } text-black p-2 rounded focus:outline-none focus:border-orange-500 transition duration-300 ease-in-out w-full  ${
                  !(isAgreed && password === confirmPassword) && "cursor-not-allowed"
                }`}
                disabled={!isAgreed || password !== confirmPassword}
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex items-center space-x-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={handleGoogleSignUp}
              className="mt-4 w-full py-2 rounded border border-gray-300 bg-orange-500 text-white flex items-center justify-center"
            >
              <FcGoogle className="mr-2" />
              Create New Account with Google
            </button>
            <div className="mt-4 text-center flex items-center space-x-2">
              <p className="text-gray-600">Already have an account?</p>
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
