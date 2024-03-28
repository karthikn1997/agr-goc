import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { togglePasswordVisibility } from "../utils/utils";

export default function KYCForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    referenceId: yup.string().required("Reference ID is required"),
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
      navigate("/success", {
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
      referenceId: "",
      addressProof: "",
      photo: "",
      nomineeDetail: "",
      accountDetail: "",
      panNo: "",
      agree: false,
    },
    validationSchema,
    onSubmit: submitKYCForm,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-5 md:py-0">
      <div className="container mx-auto flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg shadow-lg">
          <div className="px-8 py-8">
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
              KYC Form
            </h1>
            <form onSubmit={formik.handleSubmit}>
              {error && (
                <p className="text-center text-red-500 mb-4">{error}</p>
              )}
              <input
                type="text"
                className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                placeholder="Reference ID"
                name="referenceId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.referenceId}
              />
              {/* Display error message if touched and there's an error */}
              {formik.touched.referenceId && formik.errors.referenceId && (
                <p className="text-red-500 mb-4">{formik.errors.referenceId}</p>
              )}

              {/* Repeat similar input fields for other form fields */}

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
                className="w-full bg-blue-500 rounded-lg text-white py-3 font-bold transition duration-300 ease-in-out hover:bg-blue-600 mb-4"
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
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
