import React, { useState } from "react";
import { Link } from "react-router-dom";

const PaymentApprovalForm = () => {
  const [formData, setFormData] = useState({
    amount: "5000", // Default Amount
    screenshot: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, screenshot: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data or perform validation here
    console.log(formData);

    // Redirect to success page
    // history.push("/success");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-5 md:py-0">
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Approval Form
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 font-semibold mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded-lg py-3 px-4"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="transactionId"
                className="block text-gray-700 font-semibold mb-1"
              >
                Transaction Id
              </label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                onChange={handleChange}
                className="w-full bg-gray-200 rounded-lg py-3 px-4"
                // Make it read-only
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="referenceId"
                className="block text-gray-700 font-semibold mb-1"
              >
                Reference Id
              </label>
              <input
                type="text"
                id="referenceId"
                name="referenceId"
                onChange={handleChange}
                className="w-full bg-gray-200 rounded-lg py-3 px-4"
                // Make it read-only
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-semibold mb-1"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full bg-gray-200 rounded-lg py-3 px-4"
                readOnly // Make it read-only
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="screenshot"
                className="block text-gray-700 font-semibold mb-1"
              >
                Reference Screenshot
              </label>
              <input
                type="file"
                id="screenshot"
                name="screenshot"
                onChange={handleFileChange}
                className="w-full bg-gray-200 rounded-lg py-3 px-4"
                required
              />
            </div>
            <Link
              to="/success"
              className="block bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Send Payment Approval
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentApprovalForm;
