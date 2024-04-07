import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, useNavigate } from 'react-router-dom';
import FormStyles from '../components/css/Form.module.css'


const NewPost = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);


  const handleClose = () => navigate(-1);


  const handleAddPost = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const submission = {
      title: formData.get('title'),
      message: formData.get('message'),
    };
    // console.log(submission);
    // Add the new post
    await postAction(submission);
    
    // Close the modal and navigate to the home page to trigger a re-render
    handleClose();
    navigate("/");
  };


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tell us something new</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method='Post' action='/create-post' onSubmit={handleAddPost} className={FormStyles.ModalForm}>
            
            <label htmlFor="">Title</label>
            <input
              type="text" 
              name='title' 
              placeholder="title" 
              required 
            />


            <label htmlFor="">Message</label>
            <textarea
              name="message" 
              id="message" 
              cols="20" 
              rows="5" 
              placeholder="message" 
            />


            <div>
              <button type='submit' className={FormStyles.addBtn}> Add Post </button>
              <button className={FormStyles.closeBtn} onClick={handleClose}> Close </button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewPost;



export const postAction = async (submission) => {
  try {
    const response = await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
  
    if (response.ok) {
      console.log('Post added successfully');
    } else {
      console.error('Failed to add post:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding post:', error);
  }
};


