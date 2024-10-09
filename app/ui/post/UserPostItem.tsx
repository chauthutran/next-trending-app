import React, { useEffect, useState } from 'react';
import { JSONObject } from '@/libs/definations';
import * as dbService from "@/libs/mongodb";
import { MdOutlineMail } from 'react-icons/md';
import Avartar from '../basic/Avartar';
import { useAuth } from '@/contexts/AuthContext';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { IoShareSocialOutline } from 'react-icons/io5';


export default function UserPostItem({data}: {data: JSONObject}) {

    const { user } = useAuth();

    const handleLikePost = async() => {
        const response = await dbService.updateLikeUnlike(data._id, user!._id, 'like');
    }

    const handleUnlikePost = async() => {
        const response = await dbService.updateLikeUnlike(data._id, user!._id, 'unlike');
    }
    
    return (
        <div className="bg-white shadow-md rounded-md p-4 space-y-3">
            <div className="flex space-x-3 items-center">
                <Avartar name={data.author.name} />
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold mb-2">{data.title}</h2>
                    <span className="text-sm text-gray-500">{new Date(data.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <p className="text-gray-700 mb-2">{data.content}</p>


            {data.image && (
                <img src={data.image} alt={data.title} className="w-full h-48 object-cover rounded-md mb-2" />
            )}

            {user !== null && <div className="grid grid-cols-4 w-full">
                <div className="flex space-x-1">
                    {data.like.indexOf(user!._id) <0 
                        ? <div><BiLike onClick={() => {handleLikePost()}}/></div>
                        : <div><BiSolidLike onClick={() => {handleLikePost()}}/></div>}
                    <div>Like</div>
                </div>
                <div className="flex space-x-1">
                    {data.unlikes.indexOf(user!._id) <0 
                        ? <div><BiDislike onClick={() => {handleUnlikePost()}}/></div>
                        : <div><BiSolidDislike onClick={() => {handleUnlikePost()}}/></div>}
                    <div>Unlike</div>
                </div>
                <div className="flex space-x-1">
                    <TbMessageCircle />
                    <div>Comment</div>
                </div>
                <div className="flex space-x-1">
                    <IoShareSocialOutline />
                    <div>Share</div>
                </div>
            </div>}
        </div>
    );
};