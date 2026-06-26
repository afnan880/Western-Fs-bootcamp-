import { useState,useEffect } from "react"; 

function Post(){
    const [count, setCount]=useState(1);
    const [Post,setPost] =useState({userId:'',id:'1',title:'',body:''});
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${count}`);
                const Post = await response.json();
                setPost(Post);
                console.log('Fetched Post:', Post);
            } catch (error) {
                console.error('Error fetching Post:', error);
            }
        };
        fetchPost();
    }, [count]);

        return(
        <div>
            <h1>Customers</h1>
 <ul>
<li key={Post.id}>
<h2>{Post.userId}</h2>
<p>{Post.id}</p>
<p>{Post.title}</p>
<p>{Post.body}</p>

</li>

 </ul>

<button onClick={() => setCount(count+1)} disabled={count >= 10}>Next Post</button>
<button onClick={() => setCount(count-1)} disabled={count <= 1}>previous Post</button>


        </div>
    );
}
 
export default Post;
