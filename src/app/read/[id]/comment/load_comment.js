"use client"

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function EachComment(props) {
    const [isEditing, setEditing] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className="comment-button-container">
                <button className="comment-button-item" onClick={() => {
                    setEditing(prev => !prev);
                }}>
                    {isEditing ? "수정취소" : "수정"}
                </button>
                <button className="comment-button-item" onClick={() => {
                    fetch(process.env.NEXT_PUBLIC_COMMENT_URL + props.id, { method: 'DELETE' })
                        .then(resp => resp.json())
                        .then(() => {
                            router.refresh();
                        })
                        .catch(error => console.error("Error deleting comment:", error));
                }}>
                    삭제
                </button>
            </div>
            <div className="comment-textarea">
                {isEditing ? null : props.content}
                <p>{isEditing ? <EditArea complete={() => {setEditing(false)}}id={props.id} content={props.content}/> : null}</p>
            </div>
        </>
    );
}

function EditArea(props) {
    const router = useRouter();
    const [comment, setComment] = useState(props.content);

    return (
        <>
            <form onSubmit={e => {
                e.preventDefault();
                const comment = e.target.comment.value;
                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: comment })
                };
                fetch(process.env.NEXT_PUBLIC_COMMENT_URL + props.id, options)
                    .then(res => res.json())
                    .then(() => {
                        props.complete();
                        router.refresh();
                    })
                    .catch(error => console.error("Error updating comment:", error));
            }}>
                <input
                    className="comment-input"
                    type="text"
                    name="comment"
                    placeholder="댓글 수정"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />&nbsp;
                <input type="submit" value="수정" />
            </form>
        </>
    );
}
