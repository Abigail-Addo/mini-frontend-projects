import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePost } from '../Context/PostContext';


const NewItem = () => {
    const redirect = useNavigate();
    const { posts, setPosts } = usePost();

    const [show, setShow] = useState(true);
    const [item, setItem] = useState('');
    const [summary, setSummary] = useState('');


    const handleClose = () => redirect(-1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!item || !summary) {
            toast.error('All inputs must be entered');
            return;
        }

        try {
            const response = await fetch('http://localhost:9090/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item: item,
                    summary: summary,
                }),
            });

            if (response.status == 200 || response.status == 201) {
                const newItem = await response.json();
                handleClose();
                setPosts([...posts, newItem]);
                toast.success('Item added successfully');
            } else {
                toast.error('An error occurred');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    const handleItemChange = (e) => {
        setItem(e.target.value);
    };

    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
    };

    return (
        <>
            <ToastContainer />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Item</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={item}
                                onChange={handleItemChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={summary}
                                onChange={handleSummaryChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Add Item
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewItem;
