// import { BsApple, BsLinkedin } from "react-icons/bs";
import {
  FaApple,
  FaGooglePlay,
  FaTwitterSquare,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <>
      <div className=" bg-gray-900 pt-8">
        <div className="container  md:mx-auto">
          {/* Footer for Large Screens */}
          <footer className="text-white lg:my-10 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-2 gap-2 justify-center w-full">
              {/* Legal Section */}
              <div className="">
                <div className="flex w-full justify-center items-center">
                  <i className="brand-color text-xl md:text-3xl">Dhaka</i>
                  <img
                    className="h-4 md:h-6 ms-1 rounded-sm -me-1"
                    src="https://i.ibb.co/qWzZ2NC/bus3.png"
                    alt=""
                  />
                  <i className="brand-color text-xl md:text-3xl">Ticket</i>
                </div>

                <div className="mt-2">
                  <p className="py-1 text-justify text-[12px] text-gray-400">
                    TicketQuest is your one-stop destination for all your bus
                    ticket needs. Whether you are planning a weekend getaway or
                    a cross-country adventure, we have got you covered. Our
                    user-friendly platform allows you to easily search, compare,
                    and book bus tickets to countless destinations.
                  </p>

                  <div className="py-4 w-full justify-center flex gap-5">
                    <Link
                      to="https://www.facebook.com/"
                      target="_blank"
                      title="Facebook"
                    >
                      <FaFacebook className="w-7 h-7 cursor-pointer brand-color rounded"></FaFacebook>
                    </Link>
                    <Link to="https://twitter.com/?lang=en" title="Twitter">
                      <FaTwitterSquare className="w-7 h-7 cursor-pointer brand-color rounded"></FaTwitterSquare>
                    </Link>
                    <Link
                      to="https://www.linkedin.com/learning?trk=homepage-learning_nav-header-logo"
                      title="Linkedin"
                    >
                      <FaLinkedin className="w-7 h-7 cursor-pointer brand-color rounded"></FaLinkedin>
                    </Link>
                  </div>
                </div>
              </div>

              {/* About us Section */}
              <div className="md:mx-auto w-full text-center mx-auto ">
                <span className="brand-color text-xl block mb-4">About us</span>
                <div className="mt-2">
                  <Link
                    to="/ourTeam"
                    className="link link-hover block text-base py-1 lg:text-lg"
                  >
                    Our Team
                  </Link>
                  <Link
                    to="/PrivacyAndPolicy"
                    className="link link-hover block text-base py-1 lg:text-lg"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/termsCondition"
                    className="link link-hover block text-base py-1 lg:text-lg"
                  >
                    Terms And Conditions
                  </Link>
                </div>
              </div>

              {/* Services Section */}
              <div className="md:mx-auto text-center ">
                <span className="brand-color text-xl block mb-4">Services</span>
                <div className="mt-2">
                  <Link
                    to="/book-ticket"
                    className="link link-hover block text-base py-1 lg:text-lg"
                  >
                    Bus Tickets
                  </Link>
                  {/* <a className="link link-hover block text-base py-1 lg:text-lg">
                    Launch Tickets
                  </a> */}
                  {/* <a className="link link-hover block text-base py-1 lg:text-lg">
                    Train Tickets
                  </a> */}
                  <Link
                    to="/faq"
                    className="link link-hover block text-base py-1 lg:text-lg"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/contact"
                    className="link link-hover block text-base py-1 lg:text-lg"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              {/* Quick links Section */}
              <div className="md:mx-auto w-full text-center ">
                <span className="brand-color text-xl block mb-4">
                  Quick links
                </span>
                <div className="mt-2">
                  <Link
                    to="/blog"
                    className="link link-hover block text-base py-1 lg:text-lg"
                  >
                    Blog
                  </Link>
                  <Link
                    to="/bus-complain"
                    className="link link-hover block text-base py-1 lg:text-lg"
                  >
                    Bus Companies
                  </Link>
                  <Link
                    to="/travel"
                    className="link link-hover block text-base py-1 lg:text-lg"
                  >
                    Travel Tips
                  </Link>
                  {/* <a className="link link-hover block text-base py-1 lg:text-lg">
                    My Account
                  </a> */}
                </div>
              </div>
            </div>
          </footer>
          <p className="text-sm text-center text-white pb-8">
            Copyright © 2023 - All rights reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
