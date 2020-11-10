import React, { useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Dimmer, Loader, Segment, Image, Header } from 'semantic-ui-react'
import "./PostDetailAdmin.css"



export default function AdminPD() {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [author, setAuthor ] = useState("")
    const [content, setContent ] = useState("")
    // const [approved, setApproved ] = useState(false)
    const { postId } = useParams()


    const handleFormSubmit = (e) =>{
        
        fetch(`/api/v1/posts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify({
                author: author,
                content: content,
                approved: false,
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
            
            <Header>Detail</Header>
            <Segment vertical>
                <Header>{post.author}</Header>
                {post.content.split("/n").map((paragraph, index)=>{
                    return <p key={index}>{paragraph}</p>
                })
            }
            <Link to="/">&larr; Back</Link>

            </Segment>
            <Segment>
                <h4>Comments</h4>
                {comments.map((comment)=>{
                    return <pre key={comment.id}>
                    📮 {comment.author}: {comment.content}   ({comment.createdAt})
                    </pre>
                    
                    
                })}
                <br/>
                <hr/>
                <form onSubmit={handleFormSubmit} className="form-group" >
                    <div>
                        <label className="mr-5" htmlFor="">
                            author
                            <input className="ml-2" type="text" name="author" value={author} onChange={(e)=> {setAuthor(e.target.value)}}/>
                        </label><br/>
                        <label>
                            contents<br/>
                            <textarea rows="4" cols="50" className="ml-2 contents-input" type="text" name="content" value={content} onChange={(e)=> {setContent(e.target.value)}}/>
                        </label>
                    </div>
                    <input className="" type="submit" className="btn btn-primary" />
                </form>
             </Segment>
           
            

        </div>
    )
}
