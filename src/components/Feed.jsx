import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import UserCard from './UserCard'





const Feed = () => {

  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();


  const getFeed = async()=>{
    if(feed)return;
    try{
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true
      });
      console.log(res.data);

      dispatch(addFeed(res?.data?.data));

    }catch(error){
      console.log(error);
    }
  }


  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;

  if(feed.length <= 0) return <div className="flex justify-center my-10">
        <h1 className="text-3xl">No Users Found</h1>
    </div>



  return (
    feed &&  (<div className= "flex justify-center my-10">
        <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed