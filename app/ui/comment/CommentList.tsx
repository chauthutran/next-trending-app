"use client";
import * as dbService from "@/libs/mongodb";
import { useEffect, useState } from "react";
import Alert from "../basic/Alert";
import * as Constant from "@/libs/constants";
import { JSONObject } from "@/libs/definations";


export default function CommentList({ postId }: { postId: string }) {

    const [list, setList] = useState<JSONObject>([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    const fetchComments = async() => {
        const response = await dbService.fetchComments(postId);
        if (response.status === "success") {
            setList(response.data);
        }
        else {
            setErrMsg(response.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchComments();
    }, []);

    if (loading) return (<div>Loading ...</div>);

    return (
        <>
            <Alert type={Constant.ALERT_TYPE_ERROR} message={errMsg} />

            <div className="comments-list">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                {list.map((comment: JSONObject) => (
                    <div key={comment._id} className="comment-item mb-4 p-4 border rounded-lg">
                        <p className="text-gray-700">{comment.content}</p>
                        <div className="text-sm text-gray-500">
                            <span>By {comment.author.name}</span> on{' '}
                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            In Post: <strong>{comment.userPost.title}</strong>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}