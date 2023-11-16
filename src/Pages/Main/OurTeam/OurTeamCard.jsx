import React from "react";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";

const OurTeamCard = ({
  name,
  details,
  description,
  facebookLink,
  githubLink,
  linkedinLink,
  imageSrc
}) => {
    const defaultImageSrc = "https://images.unsplash.com/photo-1562583489-bf23ec64651d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')"
  return (
    <div className="group h-96  w-80 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0">
          <img
            className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
            src={imageSrc || defaultImageSrc}
            alt=""
          />
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col space-y-2 items-center justify-center">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-lg">{details}</p>
            <p className="text-base">{description}</p>
            <div className="flex absolute -bottom-20 delay-500 duration-1000 group-hover:bottom-20 scale-0 group-hover:scale-125 justify-center items-center mt-5 gap-5">
              {facebookLink && (
                <Link to={facebookLink} target="_blank">
                  <BsFacebook title="Facebook" size={35} />
                </Link>
              )}
              {githubLink && (
                <Link target="_blank" to={githubLink}>
                  <BsGithub title="GitHub" size={35} />
                </Link>
              )}
              {linkedinLink && (
                <Link target="_blank" to={linkedinLink}>
                  <BsLinkedin title="Linkedin" size={35} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeamCard;
