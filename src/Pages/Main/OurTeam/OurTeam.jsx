import React from "react";
import PageBanner from "../../../Component/Main/About/PageBanner";
import OurTeamCard from "./OurTeamCard";

const OurTeam = () => {
  return (
    <div className="">
      <PageBanner
        img="https://i.ibb.co/GRkR1M7/annie-spratt-Qckxruozj-Rg-unsplash.jpg"
        title="meet our team"
        description="We're a team of  creative thinkers, fun havers, and new generation. We do work with curiosity and enthusiasm."
      />

    
      <div className="my-10 max-w-[1200px] grid justify-center items-center mx-auto">

      <div className="grid justify-center items-center">
        <h1 className="text-center text-3xl my-5 text-orange-500 ">
          Team Leader
        </h1>
        <OurTeamCard
          imageSrc=""
          name="Md Abdur Rahim"
          details={"FULL STACK DEVELOPER"}
          description={"I love Programming"}
          facebookLink="https://www.facebook.com/royal.wd"
          githubLink="https://github.com/abdurrahim220"
          linkedinLink="https://www.linkedin.com/in/md-abdur-rahim-35609723a/"
        />
      </div>

        <div>
          <h1 className="text-center text-3xl my-8 text-orange-500">
            Team Members
          </h1>
          <div className="md:grid grid-cols-3 px-4 space-y-7 md:space-y-0 justify-center items-center sm:px-3 gap-10 md:px-0">
            <OurTeamCard
              imageSrc=""
              name="Md Abdur Rahim"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/royal.wd"
              githubLink="https://github.com/abdurrahim220"
              linkedinLink="https://www.linkedin.com/in/md-abdur-rahim-35609723a/"
            />

            <OurTeamCard
              imageSrc=""
              name="Md Abdur Rahim"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/royal.wd"
              githubLink="https://github.com/abdurrahim220"
              linkedinLink="https://www.linkedin.com/in/md-abdur-rahim-35609723a/"
            />

            <OurTeamCard
              imageSrc=""
              name="Md Abdur Rahim"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/royal.wd"
              githubLink="https://github.com/abdurrahim220"
              linkedinLink="https://www.linkedin.com/in/md-abdur-rahim-35609723a/"
            />

            <OurTeamCard
              imageSrc=""
              name="Md Abdur Rahim"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/royal.wd"
              githubLink="https://github.com/abdurrahim220"
              linkedinLink="https://www.linkedin.com/in/md-abdur-rahim-35609723a/"
            />

            <OurTeamCard
              imageSrc=""
              name="Md Abdur Rahim"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/royal.wd"
              githubLink="https://github.com/abdurrahim220"
              linkedinLink="https://www.linkedin.com/in/md-abdur-rahim-35609723a/"
            />

            <OurTeamCard
              imageSrc=""
              name="Md Abdur Rahim"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/royal.wd"
              githubLink="https://github.com/abdurrahim220"
              linkedinLink="https://www.linkedin.com/in/md-abdur-rahim-35609723a/"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
