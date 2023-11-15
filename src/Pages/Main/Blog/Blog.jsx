import PageBanner from "../../../Component/Main/About/PageBanner"
import blog from '../../../../public/Data/blog.json'
import { FaUserAlt,FaCalendarAlt } from "react-icons/fa";
import NewsLetter from "../../../Component/Main/Home/NewsLetter";
const image = "https://i.ibb.co/ctPT13g/about-us.jpg";
const Blog = () => {
  return (
     <section className="my-10">
          <PageBanner
        img={image}
        title={"Blog"}
        description="Explore the fascinating world of buses with our blog. From the latest innovations in public transportation to historical journeys, we cover it all. Join us on a ride through the diverse and dynamic world of buses!"
      />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-10 ">
          {blog.map((val,index) => (
           <div className='items shadow p-2' key={index}>
             <div >
               <img className='h-[300px] w-[100%]' src={val.cover} alt='' />
             </div>
             <div className='text my-2 '>
               <div className='flex justify-between mx-2 my-2'>
                 <span className="flex justify-start items-center gap-2">
                    <FaUserAlt className="brand-color"></FaUserAlt>
                   <label htmlFor=''>{val.type}</label>
                 </span>
                 <span className="flex justify-start items-center gap-2">
                    <FaCalendarAlt className="brand-color"></FaCalendarAlt>
                   <label htmlFor=''>{val.date}</label>
                 </span>
                 
               </div>
               <h1 className="text-[22px] font-[400] brand-color p-2">{val.title}</h1>
               <p className="text-gray-600 p-2">{val.desc}</p>
             </div>
           </div>
          ))}
          </div>
             {/* <section className="my-5 w-full">
             <NewsLetter></NewsLetter>
             </section> */}
     </section>
  )
}

export default Blog