import React from 'react'
import buses from '../../../../public/Data/busCompain.json'
 
import BusRoute from '../../../Shared/BusRoute/BusRoute'
import Parallax from '../../../Component/Main/About/Parallax'

const BusComplain = () => {
  return (
    <section className='my-10  mt-16'>
     
          {/* <h2 className='brand-color text-center mt-10'>All in bus here </h2> */}
          <Parallax
          
          title={"All in bus here"}
          desc1={
            "We started our journey back in 2014 with one goal in mind- to make lives easier! As a technology-first company, we develop tech-driven solutions for the everyday challenges of Bangladeshi people, compare prices, offer the best deals and safeguards- all within a few minutes and with just a few taps on their phone. "
          }
          desc2={
            "This is more than just a ticketing platform, It is a lifestyle! We empower our people by solving and simplifying their travel needs and let them enjoy traveling, the enjoyable way! "
          }
          />
          
          <div className='grid md:grid-cols-2 lg:grid-cols-3 mx-10 gap-5 my-10'>
                
                         {buses.map((bus, index) => (
                              <div className="items shadow-lg hover:shadow-orange-700 p-2" key={index}>
                                <figure>
                                  <img className="h-[250px] w-full" src={bus.pictureURL} alt="bus" />
                                </figure>
                                <div className="my-4 mx-3 flex justify-between items-center">
                                  <h2 className="card-title brand-color">{bus.company}</h2>
                                  <h2 className="text-gray-600">Model : {bus.busModel}</h2>
                                </div>
                              </div>
                            ))}
                 
          </div>
          <BusRoute></BusRoute>
    </section>
  )
}

export default BusComplain