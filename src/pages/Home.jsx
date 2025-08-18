import React from 'react'
import { useState, useEffect } from 'react';


const Home = () => {
  useEffect(() => {
    document.title = "Dashboard";
    const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
const role = localStorage.getItem("role");
const user = JSON.parse(localStorage.getItem("user")); // since we saved as JSON

console.log("Access Token:", token);
console.log("Refresh Token:", refreshToken);
console.log("Role:", role);
console.log("User:", user);

  }, []);
  return (
    //    <div className="bg-white rounded-lg shadow-md p-6">
    //   <h2 className="text-2xl font-bold mb-4">Settings</h2>
    //   <p>Manage your application settings here.</p>
//  <section class="section dashboard">
//   <div class="flex flex-wrap">
//     <div class="w-full lg:w-8/12">
//       <div class="flex flex-wrap">
//         <div class="w-full sm:w-1/2 lg:w-1/3 ">
//           <div class="bg-white shadow-md rounded-lg p-4">
//             <div class="relative">
//               <button class="absolute top-0 right-0 p-2" aria-haspopup="true">
//                 <i class="bi bi-three-dots"></i>
//               </button>
//               <ul class="absolute right-0 hidden bg-white shadow-lg rounded-md mt-2">
//                 <li class="text-left p-2 border-b"><h6>Filter</h6></li>
//                 <li><a class="block p-2 hover:bg-gray-100" href="#">Today</a></li>
//                 <li><a class="block p-2 hover:bg-gray-100" href="#">This Month</a></li>
//                 <li><a class="block p-2 hover:bg-gray-100" href="#">This Year</a></li>
//               </ul>
//             </div>
//             <div class="mt-4">
//               <h5 class="text-lg font-semibold">Sales <span class="text-gray-500">| Today Sales</span></h5>
//               <div class="flex items-center mt-2">
//                 <div class="bg-blue-500 text-white rounded-full p-3 flex items-center justify-center">
//                   <i class="bi bi-cart"></i>
//                 </div>
//                 <div class="ml-3">
//                   <h6 class="text-2xl">145</h6>
//                   <span class="text-green-500 font-bold">12%</span> <span class="text-gray-500">increase</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="w-full sm:w-1/2 lg:w-1/3">
//           <div class="bg-white shadow-md rounded-lg p-4">
//             <div class="relative">
//               <button class="absolute top-0 right-0 p-2" aria-haspopup="true">
//                 <i class="bi bi-three-dots"></i>
//               </button>
//               <ul class="absolute right-0 hidden bg-white shadow-lg rounded-md mt-2">
//                 <li class="text-left p-2 border-b"><h6>Filter</h6></li>
//                 <li><a class="block p-2 hover:bg-gray-100" href="#">Today</a></li>
//                 <li><a class="block p-2 hover:bg-gray-100" href="#">This Month</a></li>
//                 <li><a class="block p-2 hover:bg-gray-100" href="#">This Year</a></li>
//               </ul>
//             </div>
//             <div class="mt-4">
//               <h5 class="text-lg font-semibold">Revenue <span class="text-gray-500">| This Month</span></h5>
//               <div class="flex items-center mt-2">
//                 <div class="bg-green-500 text-white rounded-full p-3 flex items-center justify-center">
//                   <i class="bi bi-currency-dollar"></i>
//                 </div>
//                 <div class="ml-3">
//                   <h6 class="text-2xl">$3,264</h6>
//                   <span class="text-green-500 font-bold">8%</span> <span class="text-gray-500">increase</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="w-full sm:w-1/2 lg:w-1/3">
//           <div class="bg-white shadow-md rounded-lg p-4">
//             <div class="relative">
//               <button class="absolute top-0 right-0 p-2" aria-haspopup="true">
//                 <i class="bi bi-three-dots"></i>
//               </button>
//               <ul class="absolute right-0 hidden bg-white shadow-lg rounded-md mt-2">
//                 <li class="text-left p-2 border-b"><h6>Filter</h6></li>
//                 <li><a class="block p-2 hover:bg-gray-100" href="#">Today</a></li>
//                 <li><a class="block p-2 hover:bg-gray-100" href="#">This Month</a></li>
//                 <li><a class="block p-2 hover:bg-gray-100" href="#">This Year</a></li>
//               </ul>
//             </div>
//             <div class="mt-4">
//               <h5 class="text-lg font-semibold">Customers <span class="text-gray-500">| This Year</span></h5>
//               <div class="flex items-center mt-2">
//                 <div class="bg-red-500 text-white rounded-full p-3 flex items-center justify-center">
//                   <i class="bi bi-people"></i>
//                 </div>
//                 <div class="ml-3">
//                   <h6 class="text-2xl">1244</h6>
//                   <span class="text-red-500 font-bold">12%</span> <span class="text-gray-500">decrease</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

    <div className="flex items-center min bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">👤 User Dashboard</h1>
        
        <p className="text-gray-600 mb-6">
          Welcome to your dashboard! Here you can view your profile, check updates, 
          and manage your account.
        </p>

        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            View Profile
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
            Notifications
          </button>
          <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
