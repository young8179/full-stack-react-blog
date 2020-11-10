import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Button, Container, Form, Header, Modal, Segment} from "semantic-ui-react"


export default function Posts() {
    const [ formOpen, setFormOpen] = useState(false)
    const [ posts, setPosts ] = useState([])
    const [title, setTitle ] = useState("")
    const [author, setAuthor ] = useState("")
    const [published, setPublished ] = useState("")
    const [content, setContent ] = useState("")
    
    //componentDidMount
    useEffect(()=>{
        fetch("/api/v1/posts")
            .then(res=> res.json())
            .then(data =>{
                setPosts(data)
            })
    }, [])
    
    const handleFormSubmit = (e) =>{
        fetch("/api/v1/posts", {
            method: "POST",
            body: JSON.stringify({
                author: author,
                title: title,
                published: published,
                content: content
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res=> res.json())
        .then(data =>{
            setFormOpen(false);
            setPosts(posts.concat(data));
            
            setTitle("")
            setAuthor("")
            setPublished("")
            setContent("")
        })
    }

    return (
        <div>
            <Header>Posts</Header>
            {posts.map((post)=>{
                return <div key={post.id}>
                    <Segment>
                        <Header as="h2">{post.title}</Header>
                        <Header as="h2">{post.author}</Header>
                        <p>{post.content.slice(0, 200)}</p>
                        
                            <Link to={`/post/${post.id}`}>Read More</Link>

                        

                    </Segment>
                </div>
            })}
                    <Modal
                    onClose={() => setFormOpen(false)}
                    onOpen={() => setFormOpen(true)}
                    open={formOpen}
                    trigger={<Button>Show Modal</Button>}
                    >
                        <Modal.Header>add a new post</Modal.Header>
                        <Modal.Content>
                            <Form id="newPostForm" onSubmit={handleFormSubmit}>
                            <Form.Input label="Title" type="text" value={title} onChange={(e)=> {setTitle(e.target.value)}}/>
                            <Form.Input label="Author" type="text" value={author} onChange={(e)=> {setAuthor(e.target.value)}}/>
                            <Form.Input label="publish date" type="datetime-local" value={published} onChange={(e)=> {setPublished(e.target.value)}}/>
                            <Form.Input label="content" type="text" value={content} onChange={(e)=> {setContent(e.target.value)}}/>
                           

                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={()=> setFormOpen(false)}>Cancel</Button>
                            <Button positive form="newPostForm">submit</Button>
                        </Modal.Actions>
                   

                    </Modal>
        </div>
    )
}
