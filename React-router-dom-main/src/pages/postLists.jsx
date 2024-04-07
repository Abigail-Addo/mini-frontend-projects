import { useEffect, useState } from 'react'
// import Post from './posts'
import { Outlet, useNavigate } from 'react-router-dom';
import { usePost } from '../Context/PostContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const PostLists = () => {
  const { posts, setPosts } = usePost();
  const [show, setShow] = useState(false);
  const [item, setItem] = useState('');
  const [summary, setSummary] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const redirect = useNavigate();

  const handleClose = () => {
    setShow(false);
    redirect(-1);
  }
  const handleOpen = (post) => {
    setSelectedPost(post);
    setItem(post.item);
    setSummary(post.summary);
    setShow(true);
  }

  useEffect(() => {
    (async () => {
      try {
        const results = await fetch('http://localhost:9090/posts');
        const response = await results.json();
        console.log(response);
        setPosts(response);

      } catch (err) {
        console.error(err);
      }
    })();
  }, [])

  const deletePost = async (postId) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this item");
      if (confirmed) {
        const result = await fetch(`http://localhost:9090/posts/${postId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const response = await result.json()
        console.log(response)

        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        toast.success('item deleted successfully');
        handleClose();

      } else {
        toast.error('Failed to delete item')
      }
    } catch (error) {
      console.error(error);
    }
  }

  // const editPost = async (postId) => {
  //   console.log("hi")
  //   try {
  //     await new Promise((resolve, reject) =>
  //       setTimeout(resolve("resolved"), 6000)
  //     );
  //     const request = await fetch(`http://localhost:9000/posts/${postId}`, {
  //       method: "PATCH",
  //       body: JSON.stringify({
  //         item,
  //         summary
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     handleClose();
  //     // redirect("/");

  //     if (!request.ok) throw Error("The post could not be updated");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const editPost = async () => {
    if (!selectedPost) {
      return;
    }
    try {
      const postId = selectedPost.id;
      await new Promise((resolve) =>
        setTimeout(resolve("resolved"), 6000)
      );

      const request = await fetch(`http://localhost:9090/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item,
          summary
        }),

      });
      if (request.status == 200 || request.status == 201) {
        const response = await request.json();
        console.log(response);
        setItem(response.item);
        setSummary(response.summary);
        toast.success('Post updated successfully');
        handleClose();

        const updatedResults = await fetch('http://localhost:9090/posts');
        const updatedResponse = await updatedResults.json();
        setPosts(updatedResponse);

      } else {
        toast.error('Failed to update post');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="container py-5">
        {
          posts.map((post) => (
            <div className="card" key={post.id}>
              <p className="fw-bold">{post.item}</p>
              <p className="text-justify">{post.summary}</p>
              <div className='icons'>
                <DeleteIcon onClick={() => deletePost(post.id)} />
                <EditIcon onClick={() => handleOpen(post)} />
              </div>
            </div>
          ))
        }
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={editPost}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Outlet />

    </>
  )
}
export default PostLists
