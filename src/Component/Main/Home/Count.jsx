import "./Banner.css";
import NumberCounter from "number-counter";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import axios from "axios";


const Count = () => {

 
  return (
    <div className="max-w-[1200px] mx-5 md:mx-auto">
      <div className="mt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   gap-8">
          {[
            { end: 100, postFix: "Million+", text: "Tickets Sold" },
            { end: 300, postFix: "+", text: "Routes" },
            { end: 10, postFix: "Million+", text: "Happy Users" },
            { end: 0, postFix: "+", text: "Subscribers" },
          ].map((s, i) => {
            return (
              <ScrollAnimation
                key={i}
                animateIn="flipInX"
                afterAnimatedIn={function afterAnimatedIn(v) {
                  var t = "Animate In finished.\n";
                  t += "v.onScreen: " + v.onScreen + "\n";
                  t += "v.inViewport: " + v.inViewport;
                }}
              >
                <div className="brand-color bg-black text-center p-8 rounded-lg ">
                  <div className="text-4xl">
                    <NumberCounter
                      end={s?.end}
                      delay={1}
                      className="increment"
                      preFix=""
                      postFix={s?.postFix}
                    />
                  </div>
                  <p className="text-white text-2xl mt-4">{s?.text}</p>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Count;
