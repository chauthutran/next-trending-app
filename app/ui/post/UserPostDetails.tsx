"use client";

import React, { useEffect, useState } from 'react';
import { JSONObject } from '@/libs/definations';
import * as dbService from "@/libs/mongodb";
import Avartar from '../basic/Avartar';
import { useAuth } from '@/contexts/AuthContext';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { IoShareSocialOutline } from 'react-icons/io5';
import Alert from '../basic/Alert';
import * as Constant from "@/libs/constants";
import IconWithBadge from '../basic/IconWithBadge';


export default function UserPostDetails({data}: {data: JSONObject}) {

    const { user } = useAuth();
    const [postItem, setPostItem] = useState<JSONObject>(data);
    const [alertMsg, setAlertMsg] = useState("");

    const handleLikeUnlikePost = async(type: "like" | "unlike") => {
        const response = await dbService.updateLikeUnlike(data._id, user!._id, type);
        
        if( response!.status === "success" ) {
            setPostItem(response!.data);
        }
        else {
            setAlertMsg(response!.message);
        }
    }

    return (
        <>
            {alertMsg !== "" && <Alert type={Constant.ALERT_TYPE_ERROR} message={alertMsg} />}

            <div className="bg-white shadow-md rounded-md p-4 space-y-3">
                
                <div className="flex space-x-3 items-center">
                    <Avartar name={postItem.author.name} />
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-2">{postItem.title}</h2>
                        <span className="text-sm text-gray-500">{new Date(postItem.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <p className="text-gray-700 mb-2">{postItem.content}</p>


                {postItem.image && (
                    <img src={postItem.image} alt={postItem.title} className="w-full h-48 object-cover rounded-md mb-2" />
                )}

                <div className="grid grid-cols-4 w-full" >
                    <div  className="flex space-x-3">{user !== null 
                        ? <div className="flex space-x-1 cursor-pointer" onClick={() => handleLikeUnlikePost("like")} >
                            {postItem.likes.indexOf(user!._id) < 0
                                ? <div><IconWithBadge Icon={BiLike} no={postItem.likes.length} /></div>
                                : <div><IconWithBadge Icon={BiSolidLike} no={postItem.likes.length} /></div>}
                        </div>
                        : <div className="text-gray-400"><IconWithBadge Icon={BiLike} no={postItem.likes.length} /></div>}

                        <div>Like</div>
                    </div>

                    <div className="flex space-x-2">{user !== null 
                        ? <div className="flex space-x-1 cursor-pointer" onClick={() => handleLikeUnlikePost("unlike")} >
                            {postItem.unlikes.indexOf(user!._id) < 0
                                ? <div><IconWithBadge Icon={BiDislike} no={postItem.unlikes.length} /></div>
                                : <div><IconWithBadge Icon={BiSolidDislike} no={postItem.unlikes.length} /></div>}
                        </div>
                        : <div className="text-gray-400"><IconWithBadge Icon={BiDislike} no={postItem.unlikes.length} /></div>}

                        <div>Unlike</div>
                    </div>

                    <div className="flex space-x-1 cursor-pointer">
                        <TbMessageCircle />
                        <div>Comment</div>
                    </div>

                    <div className="flex space-x-1 cursor-pointer">
                        <IoShareSocialOutline />
                        <div>Share</div>
                    </div>
                </div>
            </div>
        </>
    );
};