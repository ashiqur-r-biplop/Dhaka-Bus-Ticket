import React from 'react'
import { Parallax} from 'react-parallax';

const PageBanner = ({ img, title, description }) => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="The Img"
            strength={-200}
        >
            <div className="hero h-[80vh]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 lg:text-6xl text-5xl text-orange-600 font-bold uppercase">{title}</h1>
                        <p className="mb-5 md:text-lg text-white">{description}</p>

                    </div>
                </div>
            </div>
        </Parallax>
    )
}

export default PageBanner