import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory, NavLink, Route } from 'react-router-dom'
import { Nav } from "react-bootstrap"
import Posts from '../Posts'
import AdminPosts from '../admin/AdminPost'

export default function Index() {
    const [userLogIn, setUserLogIn] = useState(false)
    const [adminLogIn, setAdminLogIn] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if (!userLogIn || !adminLogIn) {
            history.push("/")
        }
    }, [userLogIn, adminLogIn, history])

    return (
        <div>
            <Nav

            >
                <Nav.Item>
                    <Nav.Link href="/post">post</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
    </Nav.Link>
                </Nav.Item>
            </Nav>

            <div>
                { userLogIn && (
                    <h3><NavLink to="/post">User Posts</NavLink></h3>
                    // <Route path="/post" component={Posts}/>
                )}
                { adminLogIn && (
                    <h3><NavLink to="/post/admin">Admin Posts</NavLink></h3>
                    // <Route path="/post/admin" component={AdminPosts}/>
                )}

                {userLogIn
                    ? (<li><button onClick={() => { setUserLogIn(false) }}>Log Out</button></li>)
                    : (<li><button onClick={() => {setUserLogIn(true)}}>User Log In</button></li>)
                    }
                    {adminLogIn
                    ? (<li><button onClick={() => { setAdminLogIn(false) }}>Log Out</button></li>)
                    : (<li><button onClick={() => {setAdminLogIn(true)}}>Admin Log In</button></li>)
                    }      
            </div>
        </div>
    )
}
