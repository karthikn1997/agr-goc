import React, { useState } from 'react';
import axios from "axios";
import { useFormik } from "formik";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { togglePasswordVisibility } from "../utils/utils";

const steps = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Step 3' },
];

const ProgressStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    addressProof: yup.string().required("Address proof is required"),
    photo: yup.string().required("Photo upload is required"),
    nomineeDetail: yup.string().required("Nominee detail is required"),
    accountDetail: yup.string().required("Account detail is required"),
    panNo: yup.string().required("PAN number is required"),
    agree: yup.boolean().oneOf([true], "You must agree to continue"),
  });

  async function submitKYCForm(values) {
    setLoading(true);
    try {
      // You can send form data to your backend API endpoint here
      // Example:
      // const response = await axios.post("/api/kyc", values);
      // Handle response accordingly

      toast.success("KYC submitted successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Redirect to success page or home page
      navigate("/payment", {
        state: { message: "KYC submitted successfully" },
      });
    } catch (err) {
      setLoading(false);
      setError("Error submitting KYC");
      toast.error("Error submitting KYC", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      referenceId: "Ref123456", // Set default reference ID
      addressProof: "", // New field for address proof
      photo: "",
      nomineeDetail: "",
      accountDetail: "",
      panNo: "",
      agree: false,
    },
    validationSchema,
    onSubmit: submitKYCForm,
  });

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

  const handleSubmited = (e) => {
    e.preventDefault();
    // Submit form data or perform validation here
    console.log(formData);

    // Redirect to success page
    // history.push("/success");
  };

  return (
    <div className="mx-auto w-full h-screen">
      <div className="bg-white pt-4 pb-4 mb-2">
        <div>
          {/* <div className="text-xs uppercase font-bold text-gray-500 tracking-widest">
            Step {currentStep} of {steps.length}
          </div> */}
          <div className="flex items-center mt-1 justify-around">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex px-14 py-1 rounded ${step.id === currentStep
                  ? 'bg-blue-600 font-bold'
                  : 'text-gray-400'
                  } text-center`}
              >
                {step.label}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="w-full flex flex-col items-center justify-start py-5 md:py-0">
              <div className="container mx-auto flex justify-center">
                <div className="w-full bg-white rounded-lg shadow-lg">
                  <div className="px-8 py-8">
                    <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
                      KYC Form
                    </h1>
                    <form onSubmit={formik.handleSubmit}>
                      {error && (
                        <p className="text-center text-red-500 mb-4">{error}</p>
                      )}
                      {/* Default Reference ID */}
                      <div className='flex'>
                        <div className='w-1/2 p-5'>
                          <input
                            type="text"
                            className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                            placeholder="Reference ID"
                            name="referenceId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.referenceId}
                            disabled // Make it disabled
                          />
                          {/* Display error message if touched and there's an error */}
                          {formik.touched.referenceId && formik.errors.referenceId && (
                            <p className="text-red-500 mb-4">{formik.errors.referenceId}</p>
                          )}

                          {/* Input field for address proof upload */}
                          <div className="mb-4">
                            <label htmlFor="addressProof" className="block mb-2 text-start">
                              Upload Address Proof:
                            </label>
                            <input
                              type="file"
                              accept="application/pdf"
                              id="addressProof"
                              className="w-full bg-gray-200 rounded-lg py-0 px-4"
                              name="addressProof"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "addressProof",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </div>
                          {/* Display error message if touched and there's an error */}
                          {formik.touched.addressProof && formik.errors.addressProof && (
                            <p className="text-red-500 mb-4">
                              {formik.errors.addressProof}
                            </p>
                          )}

                          {/* Input field for Photo upload */}
                          <div className="mb-4">
                            <label htmlFor="photo" className="block mb-2 text-start">
                              Upload Photo:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              id="photo"
                              className="w-full bg-gray-200 rounded-lg py-0 px-4"
                              name="photo"
                              onChange={(event) => {
                                formik.setFieldValue("photo", event.currentTarget.files[0]);
                              }}
                            />
                          </div>
                          {/* Display error message if touched and there's an error */}
                          {formik.touched.photo && formik.errors.photo && (
                            <p className="text-red-500 mb-4">{formik.errors.photo}</p>
                          )}
                        </div>

                        {/* Input field for Nominee Details upload */}
                        <div className='w-1/2 p-5'>
                          <div className="mb-4">
                            <input
                              type="text"
                              className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                              placeholder="Enter Nominee"
                              name="nomineeDetail"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.nomineeDetail}
                            />
                          </div>
                          {/* Display error message if touched and there's an error */}
                          {formik.touched.nomineeDetail && formik.errors.nomineeDetail && (
                            <p className="text-red-500 mb-4">
                              {formik.errors.nomineeDetail}
                            </p>
                          )}

                          {/* Input field for Account Details upload */}
                          <div className="mb-4">
                            <input
                              type="text"
                              className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                              placeholder="Enter Bank Account No"
                              name="accountDetail"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.accountDetail}
                            />
                          </div>
                          {/* Display error message if touched and there's an error */}
                          {formik.touched.accountDetail && formik.errors.accountDetail && (
                            <p className="text-red-500 mb-4">
                              {formik.errors.accountDetail}
                            </p>
                          )}

                          {/* Input field for Pan Number upload */}
                          <div className="mb-4">
                            <input
                              type="text"
                              className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                              placeholder="Enter Pan Number"
                              name="panNo"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.panNo}
                            />
                          </div>
                          {/* Display error message if touched and there's an error */}
                          {formik.touched.panNo && formik.errors.panNo && (
                            <p className="text-red-500 mb-4">{formik.errors.panNo}</p>
                          )}

                        </div>
                      </div>

                      {/* Agreement Checkbox */}
                      <label className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          name="agree"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.agree}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">
                          I certify that above details are correct
                        </span>
                      </label>
                      {/* Display error message if touched and there's an error */}
                      {formik.touched.agree && formik.errors.agree && (
                        <p className="text-red-500 mb-4">{formik.errors.agree}</p>
                      )}

                      <button
                        type="submit"
                        className="w-48 bg-blue-500 rounded-lg text-white py-3 font-bold transition duration-300 ease-in-out hover:bg-blue-600 mb-4"
                      >
                        {loading ? (
                          <div className="flex justify-center">
                            <Oval
                              height={30}
                              width={30}
                              color="#fff"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                              ariaLabel="oval-loading"
                              secondaryColor="#86b7fe"
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          </div>
                        ) : (
                          "Next"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col items-center justify-center py-5 mt-10 md:py-0">
              <div className="container mx-auto flex items-center justify-center">
                <div className=" md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white p-8">
                  <div className="flex justify-center mb-4">
                    <img
                      src="./QR.jpeg"
                      alt="Sample QR Code"
                      className="w-60"
                    />
                  </div>
                  <Link
                    to="/approval"
                    className="block bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    Go to Payment Approval Form
                  </Link>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col items-center justify-center py-5 md:py-0">
              <div className="container mx-auto flex items-center justify-center">
                <div className=" w-full bg-white p-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Payment Approval Form
                  </h1>
                  <form onSubmit={handleSubmited}>
                    <div className='flex w-full'>
                      <div className='w-1/2 px-5'>
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
                      </div>

                      <div className='w-1/2 px-5'>
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
                      </div>
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
                        className="w-full bg-gray-200 rounded-lg py-0 px-4"
                        required
                      />
                    </div>
                    <Link
                      to="/success"
                      className="w-60 block bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                      Send Payment Approval
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-4">
            {currentStep !== 1 && (
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            {currentStep < steps.length && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {currentStep === steps.length && (
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgressStepper;
