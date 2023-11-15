import React from "react";
import travel from "../../../../public/Data/travel.json";

const TravelTips = () => {
  return (
    <section className="mt-20 my-10">
      <h3 className="text-center brand-color text-3xl "> Travel tips</h3>
      <p className="text-gray-600 md:w-[800px] mx-auto p-2 px-5 md:my-10  ">
        Remember to respect local customs and traditions, dress modestly, and be sensitive to the
        cultural norms of Bangladesh. Also, check travel advisories and safety recommendations
        before planning your trip, as conditions and guidelines may change.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-10 ">
        {travel.map((val, index) => (
          <div className="items shadow-lg hover:shadow-orange-700 p-2" key={index}>
            <div className="card-body">
              <h2 className="card-title brand-color">{val.cityName}</h2>
              <p className="text-gray-600"> {val.description}</p>
            </div>
            <figure>
              <img className="h-[250px] w-full" src={val.photo} alt="Shoes" />
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelTips;
