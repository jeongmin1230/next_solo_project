"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Update(props) {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const id = props.params.id;
    useEffect(()=>{
        fetch('http://localhost:9999/post/'+id)
        .then(resp=>resp.json())
        .then(result=> {
            setTitle(result.title);
            setBody(result.body);
        })
    },[]);
    return (
        <>
        <form onSubmit={e=>{
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method:'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch('http://localhost:9999/post/'+id, options)
            .then(res=>res.json())
            .then(result=> {
                router.push(`/read/${result.id}`)
                router.refresh();
            })
        }}>
            <p>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="글 제목" 
                    value={title} 
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </p>
            <p>
                <textarea 
                    name="body" 
                    placeholder="글 내용" 
                    value={body} 
                    onChange={(e)=>setBody(e.target.value)}
                />
            </p>
            <p><input type="submit" value="수정"/></p>
        </form>
        </>
    )
}