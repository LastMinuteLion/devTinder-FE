import React from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {

    const { _id,photoUrl, firstName, lastName, age, gender, about, skills} = user;
    const dispatch = useDispatch();
    
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/"+ userId,
                {},
                {withCredentials: true}
            );
            dispatch(removeUserFromFeed(userId));

        } catch (error) {
            
        }
    }


  return (
    <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-base-100 shadow-2xl shadow-primary/20">
      <figure className="relative h-[30rem] overflow-hidden bg-base-300">
        <img
          src={photoUrl}
          alt="User Photo"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-4xl font-black tracking-normal">
                {firstName} {lastName}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2 text-sm font-semibold">
                {age && <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">{age}</span>}
                {gender && <span className="rounded-full bg-white/20 px-3 py-1 capitalize backdrop-blur">{gender}</span>}
              </div>
            </div>
          </div>
        </div>
      </figure>

      <div className="space-y-5 bg-base-100 p-6">
        {about && (
          <p className="text-base leading-7 text-base-content/80">
            {about}
          </p>
        )}

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            className="btn border-base-300 bg-base-200 text-base-content shadow-sm hover:border-error hover:bg-error hover:text-error-content"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn border-0 bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg shadow-primary/25 hover:brightness-110"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
