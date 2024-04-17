import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { PostFormDataType } from '../types';

type PostFormProps = {
    addNewPost: (data: PostFormDataType) => void
}

export default function PostForm({ addNewPost }: PostFormProps) {
    const [newPost, setNewPost] = useState<PostFormDataType>({title: '', body: ''});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.name, event.target.value);
        setNewPost({...newPost, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewPost(newPost)
    }

    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create a new journal entry</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name='title' placeholder='Title your entry' value={newPost.title} onChange={handleInputChange} />
                    <Form.Label>Journal Entry</Form.Label>
                    <Form.Control name='body' placeholder='Your thoughts here...' value={newPost.body} onChange={handleInputChange} />
                    <Button className='mt-3 w-100' variant='success' type='submit'>Submit Entry</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}