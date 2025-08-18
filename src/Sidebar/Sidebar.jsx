// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// const Sidebar = ({isOpen,setIsOpen}) => {

//   return (
//     <>
//       <div
//           className={`flex-1 transition-all duration-300 ${
//               isOpen ? 'ml-64' : 'ml-0'
//             }`}
//         >
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed top-3 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
//       >
//         {isOpen ? (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         ) : (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         )}
//       </button>

//       {/* Sidebar */}
//       <div className={`fixed left-0 h-full w-40 md:w-48 lg:w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
//         <div className="p-6">
//           <nav>
//             <ul className="space-y-4">
//               <li>
//                 <Link to="/" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                   </svg>
//                   <span>Home</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                   </svg>
//                   <span>Dashboard</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   <span>Profile</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/settings" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   <span>Settings</span>
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Retrieve the user role from local storage
    const role = localStorage.getItem('role');
    console.log(role);
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1 sm:left-40 md:left-48 lg:left-64 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div className={`fixed mt-12 left-0 h-full w-35 md:w-48 lg:w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <nav>
            <ul className="space-y-4">
              {userRole === 'SuperAdmin' && (
                <li>
                  <Link to="/superadmindashboard" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg> */}
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/superadmindashboard/tenant" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg> */}
                    <span>Tenant</span>
                  </Link>
                </li>
              )}
          
              {userRole === 'Admin' && (
                <li>
                  <Link to="/admindashboard" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg> */}
                    <span>Dashboard</span>
                  </Link>
                    <Link to="/admindashboard/notification/add" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg> */}
                    <span>Notification Add</span>
                  </Link>
                </li>
              )}
              {userRole === 'Manager' && (
                  <li>
                  <Link to="/managerdashboard" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg> */}
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {userRole === 'User' && (
                <li>
                  <Link to="/user" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg> */}
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
                {/* <li>
                  <Link to="/user" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>User Dashboard</span>
                  </Link>
                </li> */}
              {/* Add more links based on roles */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;