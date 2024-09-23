"use client";

import { useRouter } from "next/navigation";

export default function CreateComment({ id }) {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentContent = e.target.comment.value;

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: commentContent,
                postId: id
            })
        };

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_COMMENT_URL, options);
            const result = await response.json();

            if (result && result.id) {
                router.push(`/read/${id}`);
                router.refresh();
            } else {
                console.error('응답에 id가 없습니다. :', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p><input className="comment-input" type="text" name="comment" placeholder="댓글 작성" required />&nbsp;<input type="submit" value="등록" /></p>
            </form>
        </>
    );
}
