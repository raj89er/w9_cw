import { useState } from 'react';
import Navigation from './components/Navigations';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function App(){
    const nameTitle: string = 'General';
    const nameLast: string = 'Kenobi';
    const nameFirst: string = 'Obi-Wan'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const posts: {id:number, title:string}[] = [
        { id: 1, title: 'Return to the Jedi Temple.' },
        { id: 2, title: 'Complete training with Master Windu.' },
        { id: 3, title: 'Be one with the force.' },
        { id: 4, title: 'The force is with you.' }
    ];

    const handleClick = () => {
        console.log('The button has been clicked');
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Container>
            <h1>Hello There!</h1>
            <Button variant='primary' onClick={handleClick}>Click Me!</Button>
            <h2>~ {nameTitle} {nameLast}, {nameFirst} ~</h2>
            <h3>{isLoggedIn ? `Welcome back, ${nameTitle} ${nameLast}.` : `You are not logged in. Activating intruder alert.`}</h3>
            { posts.map( p => <h4 key={p.id}> {p.title} </h4> )}
            </Container>
        </>
    )
}

