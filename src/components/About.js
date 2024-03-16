import React from 'react';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-6 text-gray-700">
        MedOCR is a pioneering solution developed by a team of passionate experts in healthcare technology and artificial intelligence. Our mission is to revolutionize the management of medical data by providing innovative tools that streamline workflows, enhance interoperability, and improve patient care outcomes.
      </p>
      <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
      <p className="mb-6 text-gray-700">
        At MedOCR, we envision a future where healthcare professionals have seamless access to structured medical data, empowering them to deliver personalized and effective care to patients. We strive to be at the forefront of technological innovation, driving positive change in the healthcare industry.
      </p>
      <h2 className="text-2xl font-bold mb-4">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Nishtha Mahajan</h3>
          {/* <p className="text-sm text-gray-600">Co-Founder & CEO</p> */}
          {/* <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Pankaj Sharma</h3>
          {/* <p className="text-sm text-gray-600">Co-Founder & CTO</p> */}
          {/* <p className="text-sm text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Sumit Tewari</h3>
          {/* <p className="text-sm text-gray-600">Lead Developer</p> */}
          {/* <p className="text-sm text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> */}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Aarush Ittan</h3>
          {/* <p className="text-sm text-gray-600">Co-Founder & CTO</p> */}
          {/* <p className="text-sm text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Ujjwal Goel</h3>
          {/* <p className="text-sm text-gray-600">Lead Developer</p> */}
          {/* <p className="text-sm text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> */}
        </div>
      </div>
    </div>
  );
}
