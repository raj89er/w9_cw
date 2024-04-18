import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import { CategoryType } from './types';



export default function App(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState<string|undefined>(undefined)
    const [category, setCategory] = useState<CategoryType|undefined>(undefined)

    const handleClick = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
        setMessage(newMessage);
        setCategory(newCategory);
        // setTimeout(() => {
        //     if (newMessage && newCategory){
        //         flashMessage(undefined, undefined)
        //     }
        // }, 10000)
    }

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Container>
                {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} handleClick={handleClick} /> } />
                    <Route path='/signup' element={<SignUp flashMessage={flashMessage} /> } />
                    <Route path='/login' element={<Login flashMessage={flashMessage} /> } />
                </Routes>
            </Container>
        </>
    )
}
