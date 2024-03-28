import React from "react";
import { Link } from "react-router-dom";
import { FaQrcode } from "react-icons/fa";

const PaymentPage = ({ upiDetails }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-5 md:py-0">
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src="./QR.jpeg"
              alt="Sample QR Code"
              className="max-w-full h-auto"
            />
          </div>
          <Link
            to="/success"
            className="block bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Go to Payment Approval Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
