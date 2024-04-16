import { useState } from 'react';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Post = {
    id: number,
    title: string
}

type Sorting = {
    idAsc: (a: Post, b:Post) => number,
    idDesc: (a: Post, b:Post) => number,
    titleAsc: (a: Post, b:Post) => number,
    titleDesc: (a: Post, b:Post) => number,
}

export default function App(){
    const nameTitle: string = 'General';
    const nameLast: string = 'Kenobi';
    const nameFirst: string = 'Obi-Wan'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const posts: {id:number, title:string}[] = [
    //     { id: 1, title: 'Return to the Jedi Temple.' },
    //     { id: 2, title: 'Complete training with Master Windu.' },
    //     { id: 3, title: 'Be one with the force.' },
    //     { id: 4, title: 'The force is with you.' }
    // ];

    const [posts, setPosts] = useState<Post[]>([
        { id: 1, title: 'Return to the Jedi Temple.' },
        { id: 2, title: 'Complete training with Master Windu.' },
        { id: 3, title: 'Be one with the force.' },
        { id: 4, title: 'The force is with you.' },
        { id: 5, title: 'Align the Flux capacitor.'}]
    );

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:Post, b:Post) => a.id - b.id,
            idDesc: (a:Post, b:Post) => b.id - a.id,
            titleAsc: (a:Post, b:Post) => a.title > b.title ? 1 : -1,
            titleDesc: (a:Post, b:Post) => b.title > a.title ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];
        const newSortedArr = [...posts].sort(func);
        setPosts(newSortedArr);
    }

    const handleClick = () => {
        // console.log('The button has been clicked');
        setIsLoggedIn(!isLoggedIn);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Container>
                <h1>Hello There!</h1>
                <h2>~ {nameTitle} {nameLast}, {nameFirst} ~</h2>
                <Button variant='primary' onClick={handleClick}>Toggle LogIn</Button>
                <h3>{isLoggedIn ? `Welcome back, ${nameTitle} ${nameLast}.` : `You are not logged in. Activating intruder alert.`}</h3>
                <Row>
                    <Col xs={12} md={8}>
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
                </Row>
                {posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map( p => <h4 key={p.id}>{p.title}</h4> )}
            </Container>
        </>
    )
}

