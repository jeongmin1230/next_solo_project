import CreateComment from "./comment/create_comment";
import EachComment from "./comment/load_comment";

export default async function Read(props) {
    const postId = props.params.id;
    const post = await fetchData(process.env.NEXT_PUBLIC_POST_URL+postId);
    const comments = await fetchData(process.env.NEXT_PUBLIC_COMMENT_URL);
    
    const filteredComments = comments.filter(comment => comment.postId == props.params.id);
    return (
        <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <hr/>
            <CreateComment id={postId}/>
            <ul>
                {filteredComments.map(comment => (
                    <>
                        <EachComment id={comment.id} content={comment.content}/>
                    </>
                ))}
            </ul>
        </>
    );
}

async function fetchData(url) {
    const response = await fetch(url, {cache: 'no-cache'});
    const data = await response.json();
    return data;
}
