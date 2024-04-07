import React, { useState} from 'react'
import PostStyles from '../components/css/Posts.module.css'
import FormStyles from '../components/css/Form.module.css'
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Form  from'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



const Post = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(props.new.title);
  const [message, setMessage] = useState(props.new.message);


  const handleClose = () => setShow(false);


  async function deletePost(id) {
    const confirmed = window.confirm(`Are you sure you want to delete this post?`);
    if (confirmed) {

      try {
        await fetch(`http://localhost:4000/posts/${id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log('post deleted successfully');
        navigate("/")

      } catch (error) {
      console.log(error) 
    }
  }  
};


  async function updatePost(id) {

  try {
    const response = await fetch(`http://localhost:4000/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title, message}),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log(title, message);

    handleClose();
    navigate("/")

    if (!response.ok) throw Error('post could not be updated');   

  } catch (error) {
    console.log(error)
  }
} 



  return (
    <>
    <div>
        <div className={PostStyles.postContainer}>

          <span className={PostStyles.icons}> 
            <MdModeEdit onClick={()=>setShow(true)} />
            <MdDeleteForever onClick={()=>deletePost(props.new.id)} />
          </span>

            <h4 className={PostStyles.title}>{props.new.title}</h4>
            <p className={PostStyles.message}>{props.new.message}</p>

        </div>
    </div>



    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form className={FormStyles.ModalForm}>  

            <label htmlFor="">Title</label>
            <input
              type="text" 
              name="title" 
              placeholder="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              required />

            <label htmlFor="">Message</label>
            <textarea
              name="message" 
              id="message" 
              cols="20" 
              rows="5" 
              placeholder="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} /> 

            <div>
              <button type='submit' className={FormStyles.addBtn} onClick={()=>updatePost(props.new.id)}> Save Changes </button>

              <button className={FormStyles.closeBtn} onClick={handleClose}> Close </button>
            </div>

          </Form>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default Post;

