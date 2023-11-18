
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase.js';
import { deleteUserSuccess,deleteUserStart,deleteUserFailure, updateUserFailure, updateUserStart, updateUserSuccess, signOutStart } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';




export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingError, setShowListingError]=useState(false);
  const [userListings,setUserListings]=useState([]);
  const dispatch = useDispatch();
  // console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser=async()=>{
    try {
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data=await res.json();
      if(data.success==false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
//console.log(file);
const handleSignOut = async () => {
  try {
    dispatch(signOutStart()); // Dispatch the action to indicate sign out start
    const res = await fetch('/api/auth/signout');
    const data = await res.json();
    if (data.success === false) {
      // Dispatch an action based on the result of the sign-out request
      if (data.message) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserFailure('An error occurred during sign out.'));
      }
    } else {
      // Dispatch a success action if the sign out was successful
      dispatch(deleteUserSuccess(data));
    }
  } catch (error) {
    // Handle errors and dispatch a failure action
    dispatch(deleteUserFailure('An error occurred while signing out.'));
  }
};
const handleShowListings = async () => {
  try {
    setShowListingError(false);
    const res = await fetch(`/api/user/listings/${currentUser._id}`);
    const data = await res.json();
    if (data.success === false) {
      setShowListingError(true);
      return;
    }
    setUserListings(data);
  } catch (error) {
    setShowListingError(true);
  }
};

const handleListingDelete = async (listingId) => {
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }

    setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
  } catch (error) {
    console.log(error.message);
  }
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' onClick={() => fileRef.current.click()} />

        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (Image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-800'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <input type='text' placeholder='username' defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type='email' placeholder='email' defaultValue={currentUser.email} id='email' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-Listing"}>
          Create Listing
        </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listings</button>
      <p className='text-red-700 mt-5'>
        {showListingError ? 'Error showing listings' : ''}
      </p>
      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// import React from 'react';
// import { useSelector } from 'react-redux';

// export default function Profile() {
//   const { currentUser } = useSelector((state) => state.user);

//   return (
//     <div>
//       <div>Profile</div>
//       <div className='p-3 max-w-lg mx-auto'>
//         <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
//         <form className='flex flex-col gap-4'>
//           <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
//           <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
//           <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' />
//           <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg' />
//           <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
//         </form>
//         <div className="flex justify-between mt-5">
//           <span className='text-red-700 cursor-pointer'>Delete account</span>
//           <span className='text-red-700 cursor-pointer'>Sign out</span>
//         </div>
//       </div>
//     </div>
//   );
// }