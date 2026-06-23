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
   <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl} 
      alt="User Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    {gender && <p>{gender}</p>}
    {age && <p>{age}</p>}
    {about && <p>{about}</p>}
    {skills && skills.length > 0 && <p>{skills.join(", ")}</p>}
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
    
  )
}

export default UserCard