import React, { useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Dimmer, Loader, Segment, Image, Header } from 'semantic-ui-react'


export default function PostDetail() {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [author, setAuthor ] = useState("")
    const [content, setContent ] = useState("")
    const { postId } = useParams()


    const handleFormSubmit = (e) =>{
        fetch(`api/v1/posts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify({
                author: author,
                content: content,
                approved: null,
                // PostId: postId
                
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res=> res.json())
        .then(data =>{
            
            setComments(comments.concat(data));
            
            
            setAuthor("")
            setContent("")
        })
    }

    useEffect(()=>{
        fetch(`/api/v1/posts/${postId}`)
            .then(res => res.json())
            .then(data =>{
                setPost(data)
            })
    }, [postId])

    useEffect(()=>{
        fetch(`/api/v1/posts/${postId}/comments`)
            .then(res => res.json())
            .then(data =>{
                setComments(data)
            })
    }, [])

    if (!post) {
        return (
            <Segment>
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>

                <Image src='/images/wireframe/short-paragraph.png' />
            </Segment>
        )
    }
    
    return (
        <div>
            <Header>card</Header>
            <Segment vertical>
                <Header>{post.author}</Header>
                {post.content.split("/n").map((paragraph)=>{
                    return <p>{paragraph}</p>
                })
            }
            <Link to="/">&larr; Back</Link>

            </Segment>
            <Segment>
                {comments.map((comment)=>{
                    return <>
                    <p>{comment.author}: {comment.content}   ({comment.createdAt})</p>
                    
                    </>
                })}

             </Segment>
                <form onSubmit={handleFormSubmit} className="form-group" >
                    <div>
                        <label htmlFor="">
                            author
                            <input type="text" name="author" value={author} onChange={(e)=> {setAuthor(e.target.value)}}/>
                        </label>
                        <label>
                            contents
                            <input type="text" name="content" value={content} onChange={(e)=> {setContent(e.target.value)}}/>
                        </label>
                    </div>
                    <input type="submit" className="btn btn-primary" />
                </form>
            

        </div>
    )
}
