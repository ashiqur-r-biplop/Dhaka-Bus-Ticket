import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
// import Select from "react-select";
import { useState } from "react";

function BusPostForm() {
  const { register, handleSubmit, errors, watch, resetField } = useForm();
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const bangladeshDivisions = {
    "Dhaka Division": [
      "Dhaka",
      "Gazipur",
      "Narayanganj",
      "Tangail",
      "Lakshmipur",
      "Manikganj",
      "Munshiganj",
      "Narsingdi",
      "Rajbari",
      "Shariatpur",
    ],
    "Chittagong Division": [
      "Chattogram",
      "Cox's Bazar",
      "Comilla",
      "Feni",
      "Khagrachhari",
      "Lakshmipur",
      "Bandarban",
      "Noakhali",
      "Rangamati",
    ],
    "Khulna Division": [
      "Khulna",
      "Bagerhat",
      "Chuadanga",
      "Jessore",
      "Jhenaidah",
      "Magura",
      "Meherpur",
      "Narail",
      "Satkhira",
    ],
    "Rajshahi Division": [
      "Rajshahi",
      "Bogra",
      "Chapainawabganj",
      "Joypurhat",
      "Naogaon",
      "Natore",
      "Pabna",
      "Sirajganj",
    ],
    "Barisal Division": [
      "Barishal",
      "Barguna",
      "Bhola",
      "Jhalokathi",
      "Patuakhali",
      "Pirojpur",
    ],
    "Sylhet Division": ["Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"],
    "Rangpur Division": [
      "Rangpur",
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Lalmonirhat",
      "Nilphamari",
      "Panchagarh",
      "Thakurgaon",
    ],
    "Mymensingh Division": ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };
  const onSubmit = (data) => {
    // Add an empty array for the 'bookedSeat' property
    data.bookedSeat = [];

    console.log(data);
    const t = data.to;

    fetch("https://dhaka-bus-ticket-server-two.vercel.app/post-bus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: `${t}`,
            text: "Data submitted successfully.",
          });
          reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to submit data. Please try again later.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Please try again later.",
        });
      });
  };

  return (
    <div className="lg:h-[90vh] p-10 flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Division:
            </label>
            <select
              onChange={(e) => setSelectedDivision(e.target.value)}
              name="to"
              className="w-full py-2 px-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              {Object.keys(bangladeshDivisions).map((division, index) => {
                return (
                  <option key={index} value={division}>
                    {division}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Subcategory:
            </label>
            <select
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              name="subcategory"
              className="w-full py-2 px-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option disabled value="default">
                Select a subcategory
              </option>
              {bangladeshDivisions[selectedDivision || "Dhaka Division"]?.map(
                (subCategory, index) => {
                  return (
                    <option key={index} value={subCategory}>
                      {subCategory}
                    </option>
                  );
                }
              )}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Date:
            </label>
            <input
              type="date"
              {...register("date", { required: true })}
              name="date"
              className="w-full py-2 px-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Bus Type:
            </label>
            <select
              {...register("busType", { required: true })}
              name="busType"
              className="w-full py-2 px-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Schedule:
            </label>
            <select
              {...register("schedule", { required: true })}
              name="schedule"
              className="w-full py-2 px-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="07:00 AM">07:00 AM</option>
              <option value="06:00 PM">06:00 PM</option>
            </select>
          </div>
          <button type="submit" className="brand-btn py-2 px-4 w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusPostForm;
