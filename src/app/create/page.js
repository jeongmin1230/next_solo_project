"use client"

import { useRouter } from "next/navigation"

export default function Create() {
    const router = useRouter();
    return (
        <>
        <form onSubmit={e=>{
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(process.env.NEXT_PUBLIC_POST_URL, options)
            .then(res=>res.json())
            .then(result=> {
                router.push(`/read/${result.id}`)
                router.refresh();
            })
        }}>
            <p><input type="text" name="title" placeholder="글 제목"/></p>
            <p><textarea name="body" placeholder="글 내용"/></p>
            <p><input type="submit" value="생성"/></p>
        </form>
        </>
    )
}
