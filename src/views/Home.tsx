import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { PostFormDataType, PostType } from '../types';


type Sorting = {
    idAsc: (a: PostType, b:PostType) => number,
    idDesc: (a: PostType, b:PostType) => number,
    titleAsc: (a: PostType, b:PostType) => number,
    titleDesc: (a: PostType, b:PostType) => number,
}


type HomeProps = {
    isLoggedIn: boolean,
    handleClick: () => void
}

export default function Home({isLoggedIn, handleClick}: HomeProps) {

    const [showForm, setShowForm] = useState(false);
    const [posts, setPosts] = useState<PostType[]>([
        {
            author: {
                dateCreated: "Wed, 17 Apr 2024 12:00:00 GMT",
                email: "okenobi@jediorder.com",
                firstName: "Obi-Wan",
                id: 2,
                lastName: "Kenobi",
                username: "okenobi",
            },
            body: "Completed my Python script to manage my Jedi tasks. My padawan will no longer get away with their jedi tasks anymore!",
            dateCreated: "Wed, 17 Apr 2024 12:05:00 GMT",
            id: 3,
            title: "Jedi To-Do App",
        },
        {
            author: {
                dateCreated: "Thu, 18 Apr 2024 10:00:00 GMT",
                email: "atano@jediorder.com",
                firstName: "Ahsoka",
                id: 3,
                lastName: "Tano",
                username: "atano",
            },
            body: "Just launched my blog on the latest adventures in the galaxy using Vite and TypeScript. Stay tuned for more Jedi wisdom!",
            dateCreated: "Thu, 18 Apr 2024 10:15:00 GMT",
            id: 4,
            title: "Galactic Blog",
        },
        {
            author: {
                dateCreated: "Fri, 19 Apr 2024 08:00:00 GMT",
                email: "ebridger@rebels.com",
                firstName: "Ezra",
                id: 4,
                lastName: "Bridger",
                username: "ebridger",
            },
            body: "Just built a shopping cart for collecting rare artifacts from across the galaxy!",
            dateCreated: "Fri, 19 Apr 2024 08:30:00 GMT",
            id: 5,
            title: "Galactic Shopping Cart",
        },
        {
            author: {
                dateCreated: "Sat, 20 Apr 2024 09:00:00 GMT",
                email: "okenobi@jediorder.com",
                firstName: "Obi-Wan",
                id: 2,
                lastName: "Kenobi",
                username: "okenobi",
            },
            body: "Working on a secret project to decode ancient Sith scripts using TypeScript. May the Force guide my code!",
            dateCreated: "Sat, 20 Apr 2024 09:15:00 GMT",
            id: 6,
            title: "Sith Script Decryption",
        },
        {
            author: {
                dateCreated: "Sun, 22 Apr 2024 11:00:00 GMT",
                email: "bbaggins@shire.com",
                firstName: "Bilbo",
                id: 5,
                lastName: "Baggins",
                username: "bbaggins",
            },
            body: "Just finished writing a Python script to help me manage my magical inventory in the Shire. Hobbit coding at its finest!",
            dateCreated: "Sun, 22 Apr 2024 11:30:00 GMT",
            id: 7,
            title: "Hobbit Inventory Manager",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:PostType, b:PostType) => a.id - b.id,
            idDesc: (a:PostType, b:PostType) => b.id - a.id,
            titleAsc: (a:PostType, b:PostType) => a.title > b.title ? 1 : -1,
            titleDesc: (a:PostType, b:PostType) => b.title > a.title ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];
        const newSortedArr = [...posts].sort(func);
        setPosts(newSortedArr);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const addNewPost = (newPostData: PostFormDataType) => {
        const author = {id: 1, firstName: 'Brian', lastName: 'Stanton', email: 'brians@ct.com', username:'brians', dateCreated: "Tue, 14 Apr 2024 16:58:44 GMT"};
        const newPost: PostType = {...newPostData, id:posts.length+1, dateCreated:new Date().toString(), author};
        setPosts([...posts, newPost]);
        setShowForm(false);
    }

    return (
        <>
            <h1>Hello World</h1>
                <Button variant='primary' onClick={handleClick}>Click Me!</Button>
                <h2>{isLoggedIn ? `Welcome Back` : 'Please Log In or Sign Up'}</h2>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Control value={searchTerm} placeholder='Search Posts' onChange={handleInputChange} />
                    </Col>
                    <Col>
                        <Form.Select onChange={handleSelectChange}>
                            <option>Choose Sorting Option</option>
                            <option value="idAsc">Sort By ID ASC</option>
                            <option value="idDesc">Sort By ID DESC</option>
                            <option value="titleAsc">Sort By Title ASC</option>
                            <option value="titleDesc">Sort By Title DESC</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Post+'}</Button>
                    </Col>
                </Row>
                { showForm && <PostForm addNewPost={addNewPost} /> }
                {posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map( p => <PostCard key={p.id} post={p} /> )}
        </>
    )
}
