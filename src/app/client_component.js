"use client"

import Link from "next/link";
import { useRouter, useParams } from "next/navigation"

export default function LinkButton() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    return (
        <>
        <ul>
            <li className="button-item"><Link href="/create">새 글 생성</Link></li>
            {id ? <>
            <li className="button-item"><Link href={"/update/"+id}>현재 글 수정</Link></li>
            <li className="button-item"><Link href="#" onClick={() => {
                fetch(process.env.NEXT_PUBLIC_POST_URL+id, {method:'DELETE'})
                .then(resp=>resp.json)
                .then(() => {
                    router.push('/')
                    router.refresh();
                })
            }}>삭제</Link></li></> : null}
        </ul>
        </>
    )
}