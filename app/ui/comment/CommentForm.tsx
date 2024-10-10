import { JSONObject } from "@/libs/definations";
import { useRef } from "react";
import { TiUserAddOutline } from "react-icons/ti";
import * as dbService from "@/libs/mongodb";
import { useAuth } from "@/contexts/AuthContext";


export default function CommentForm({userPost}: {userPost: JSONObject}) {

    const { user } = useAuth();
    const commentInputRef = useRef<HTMLInputElement>(null);

    const handleAddComment = async() => {
        if (commentInputRef.current) {
           const comment = commentInputRef.current.value;
          
            if(comment != "" ) {
                const payload = {
                    content: comment,
                    author: user!._id,
                    userPost: userPost._id
               }
               const response = await dbService.createComment(payload);
            }
        }

    }

    return (
        <div className="flex">
            <div className="mb-4">
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                        type="text"
                        name="comment"
                        ref={commentInputRef}
                        placeholder="Email address"
                    />
                    <TiUserAddOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
            <button onClick={() => handleAddComment()}>Add</button>
        </div>
    )
}