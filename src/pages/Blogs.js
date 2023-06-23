import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from './request'

function Blogs() {

  const [posts, setPosts] = useState([]);
  const [reposts, resetPosts] = useState([]);
  const [submitposts, submitsetPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const year = 2023;
  const id = 13;

  useEffect(() => {
    axios.get('http://localhost/REST-APIS/items/read')
      .then(response => {
        console.log(response)
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
    fetchData(year,config, (res) => {
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
      <button onClick={fetchfromservice}>Take the shot!</button>
    </>
  );

}

export default Blogs;

