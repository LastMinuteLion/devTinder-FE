import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    console.log(user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-10 lg:flex-row lg:items-start lg:justify-center">
        <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-2xl shadow-primary/10">
          <div className="border-b border-base-300 bg-base-200/70 px-6 py-5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Profile settings
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-base-content">
              Edit your profile
            </h2>
          </div>

          <div className="space-y-5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full bg-base-200/60 focus:border-primary"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full bg-base-200/60 focus:border-primary"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full bg-base-200/60 focus:border-primary"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full bg-base-200/60 focus:border-primary"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Gender</span>
                </div>
                <select
                  value={gender}
                  className="select select-bordered w-full bg-base-200/60 capitalize focus:border-primary"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">About</span>
              </div>
              <textarea
                value={about}
                className="textarea textarea-bordered min-h-28 w-full resize-none bg-base-200/60 leading-7 focus:border-primary"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            {error && (
              <div className="alert alert-error py-3 text-sm">
                <span>{error}</span>
              </div>
            )}

            <button
              className="btn w-full border-0 bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg shadow-primary/25 hover:brightness-110"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
