import React from "react";
import PageBanner from "../../../Component/Main/About/PageBanner";
import OurTeamCard from "./OurTeamCard";

import biplob from '../../../assets/member/biplob.jpg'
import aminul from '../../../assets/member/aminul.jpg'
import masud from '../../../assets/member/masud.jpg'
import abu from '../../../assets/member/abu.jpg'
import akash from '../../../assets/member/akash.png'
import sagor from '../../../assets/member/sagor.jpg'
import rahim from '../../../assets/member/rahim.jpg'

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
          imageSrc={sagor}
          name="Arif Muhammad Sagor"
          details={"FULL STACK DEVELOPER"}
          description={"I love Programming"}
          facebookLink="https://www.facebook.com/profile.php?id=100009124208160"
          githubLink="https://github.com/Arif-Mohammad-Sagor/Arif-Mohammad-Sagor"
          linkedinLink="https://www.linkedin.com/"
        />
      </div>

        <div>
          <h1 className="text-center text-3xl my-8 text-orange-500">
            Team Members
          </h1>
          <div className="md:grid grid-cols-3 px-4 space-y-7 md:space-y-0 justify-center items-center sm:px-3 gap-10 md:px-0">
            <OurTeamCard
              imageSrc={biplob}
              name="Md Ashiqur Rahman Biplob"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/BBTT.biplop22/"
              githubLink="https://github.com/ashiqur-r-biplop"
              linkedinLink="https://www.linkedin.com/in/md-abdur-rahim-35609723a/"
            />

            <OurTeamCard
              imageSrc={masud}
              name="Masud Bhuiyan "
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming "}
              facebookLink="https://www.facebook.com/masudbhuiyan1415/"
              githubLink=":https://github.com/MasudBhuiya"
              linkedinLink="https://www.linkedin.com/"
            />

            <OurTeamCard
              imageSrc={akash}
              name="Abdullah Al Akash"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/abdullah.akash.al/"
              githubLink="https://github.com/Abdullah-Al-Akash"
              linkedinLink="https://www.linkedin.com/"
            />

            <OurTeamCard
              imageSrc={aminul}
              name="Aminul Islam"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/Aminulislamemon2002"
              githubLink="https://github.com/aminulislam2002"
              linkedinLink="https://www.linkedin.com/"
            />

            <OurTeamCard
              imageSrc={abu}
              name="Abu Ahad Shorun"
              details={"FULL STACK DEVELOPER"}
              description={"I love Programming"}
              facebookLink="https://www.facebook.com/ahad.shorun.1"
              githubLink="https://github.com/Ahad188"
              linkedinLink="https://www.linkedin.com/in/md-abdur-rahim-35609723a/"
            />

            <OurTeamCard
              imageSrc={rahim}
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
