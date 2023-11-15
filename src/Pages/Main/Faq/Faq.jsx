import gimg from "../../../assets/Bus/faq.jpg";

const Faq = () => {
  return (
    <section className="bg-black">
      <div className="hero md:h-[50vh]  ">
        <div className="max-w-[1200px] mx-auto">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={gimg} className="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold brand-color">
                Frequently Question?
              </h1>
              <p className="py-6 text-white">
                Explore our frequently asked questions to get all the
                information you need for a smooth and <br />
                convenient bus journey. If you can't find the answer you're
                looking for, feel free to <br /> contact our customer support
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="">
        <div className=" md:w-[1200px] mx-auto p-10 bg-black rounded-xl ">
          {/*  */}

          <div className="collapse collapse-arrow join-item border border-base-300 my-6">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-2xl brand-color font-medium">
              Q1: How do I book a bus ticket?
            </div>
            <div className="collapse-content">
              <p className="text_pera text-white">
                A1: Booking a bus ticket is easy! You can book online through
                our website or mobile app, at our ticket counters, or through
                our authorized agents.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 my-6">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-2xl brand-color font-medium">
              Q2: What are the payment options for booking tickets?
            </div>
            <div className="collapse-content">
              <p className="text_pera text-white">
                A2: We accept various payment methods, including credit and
                debit cards, online payment gateways, and cash payments at our
                ticket counters. Please check the available options during the
                booking process.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 my-6">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-2xl brand-color font-medium">
              Q3: How early should I arrive at the bus stop before departure?
            </div>
            <div className="collapse-content">
              <p className="text_pera text-white">
                A3: We recommend arriving at least 30 minutes before the
                scheduled departure time to ensure a smooth boarding process.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 my-6">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-2xl brand-color font-medium">
              Q4: Can I change my travel date or time after booking a ticket?
            </div>
            <div className="collapse-content">
              <p className="text_pera text-white">
                A4: Yes, you can change your travel date or time, but it is
                subject to availability and may involve a change fee. Please
                contact our customer support for assistance.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 my-6">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-2xl brand-color font-medium">
              Q5: Is there a luggage limit on the bus?
            </div>
            <div className="collapse-content">
              <p className="text_pera text-white">
                Yes, there is typically a luggage limit for each passenger.
                Please check our website for the specific baggage allowance and
                guidelines.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 my-6">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-2xl brand-color font-medium">
              Q6: Are pets allowed on the bus?
            </div>
            <div className="collapse-content">
              <p className="text_pera text-white">
                A6: Most of our buses allow small pets, but you must check with
                our customer support and adhere to our pet policy. Service
                animals are generally exempt.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 my-6">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-2xl brand-color font-medium">
              Q7: What do I do if I miss my bus?
            </div>
            <div className="collapse-content">
              <p className="text_pera text-white">
                A7: If you miss your bus, please contact us as soon as possible.
                Depending on availability and the ticket type, we can assist you
                with rebooking or provide information on the next available
                service.
              </p>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </section>
  );
};

export default Faq;
