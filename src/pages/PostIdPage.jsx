import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { v4 } from 'uuid';

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments]= useState([]);
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    const [fetchComments, isComLoading, comeEror] = useFetching( async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })


    
    useEffect( () => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])
    const routeComponents = comments.map(({email, body}, key) => <div key={v4()} style={{marginTop:15}}> {email=email} {body=body} </div>); 
       return (
        <div>
            <h1>Вы попали на страницу поста c ID= {params.id}</h1>
            {isLoading
                ? <Loader/>
                :  <div>{post.id}. {post.title}</div>
            }
            <h1>
                Коментарии 
            </h1>
            {isComLoading
                ? <Loader/>
                : <div > 
                   {routeComponents} 
                  {/* {comments.map(comm =><div style={{marginTop:15}}><h5>{comm.email}</h5><div>{comm.body}</div></div>)}
                  {key=Date.now()} {key=v4()}   */}

                </div>
            }
        </div>
    );
};
export default PostIdPage;