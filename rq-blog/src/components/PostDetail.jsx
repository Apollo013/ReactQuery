import { useQuery, useMutation } from "@tanstack/react-query";

async function fetchComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return response.json();
}

async function deletePost(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
        method: "DELETE",
    });
    return response.json();
}

async function updatePost(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
        method: "PATCH",
        data: { title: "REACT QUERY FOREVER!!!!" },
    });
    return response.json();
}

export function PostDetail({ post }) {
    const { data, isError, isLoading } = useQuery(["postComments", post.id.toString()], () =>
        fetchComments(post.id)
    );

    const deleteMutation = useMutation((postId) => deletePost(postId));
    const updateMutation = useMutation((postId) => updatePost(postId));

    if (isLoading) return <h3>Loading</h3>;

    if (isError) return <div>Error</div>;

    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>
            <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
            {deleteMutation.isError && <p style={{ color: "red" }}>Error Deleting Post</p>}
            {deleteMutation.isLoading && <p style={{ color: "purple" }}>Deleting Post</p>}
            {deleteMutation.isSuccess && <p style={{ color: "green" }}>Post Deleted (not)</p>}
            <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
            {updateMutation.isError && <p style={{ color: "red" }}>Error Updating Post</p>}
            {updateMutation.isLoading && <p style={{ color: "purple" }}>Updating Post</p>}
            {updateMutation.isSuccess && <p style={{ color: "green" }}>Post Updated (not)</p>}
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
