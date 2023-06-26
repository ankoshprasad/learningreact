import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from './request';
import { addData } from './request';
import '../App.css';
import { Modal, Button } from 'react-bootstrap';


function Blogs() {

  const [posts, setPosts] = useState([]);
  const [reposts, resetPosts] = useState([]);
  const [submitposts, submitsetPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const year = 2023;
  const id = 13;
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!false)
  }
  const initModalhide = () => {
    return invokeModal(false)
  }

  useEffect(() => {
    axios.get('http://localhost/REST-APIS/items/read')
      .then(response => {
        setPosts(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost/REST-APIS/items/read?year=' + year)
      .then(response => {
        console.log(response)
        resetPosts(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
    {/*}
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
        */}
  },
    []);

  const shoot = () => {
    axios.post('http://localhost/REST-APIS/items/delete', { id }).then(response => {
      console.log(response)
      submitsetPosts(response.data);
    })
      .catch(error => {
        console.error(error);
      });

  }

  const fetchfromservice = () => {
    var config = { "Access-Control-Allow-Origin": "*" }
    addData(year, config, (res) => {
      console.log(res)
    }, (err) => {
      //error
      alert(err);
    });
  }

  const addDatafromservice = () => {
    var config = { "Access-Control-Allow-Origin": "*" }
    addData(id, config, (res) => {
      console.log(res)
    }, (err) => {
      //error
      alert(err);
    });
  }

  const addPosts = async (id) => {
    await fetch('http://localhost/REST-APIS/items/delete', {
      method: 'POST',
      body: JSON.stringify({
        id: 100
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        submitsetPosts((posts) => [data, ...posts]);
        setTitle('');
        setBody('');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      {/*
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.month}</li>
        ))}
      </ul>
      <ul>
        {reposts.map(post => (
          <li key={post.id}>{post.month}</li>
        ))}
      </ul>
      <button onClick={addDatafromservice}>Take the shot!</button>
      */}

      <div className='mt-3'>
        <div className='my-3 me-2 float-end'> <Button variant="success" onClick={initModal}>Open Modal</Button></div>
        
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => {
              return (
                <tr key={post.id}>
                  <td>{post.month}</td>
                  <td>{post.year}</td>
                  <td>{post.volume}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModalhide}>
          <Modal.Title>React Modal Popover Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModalhide}>
            Close
          </Button>
          <Button variant="dark" onClick={initModalhide}>
            Store
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default Blogs;

