import ReactDOM from 'react-dom/client';
import React, { useState, useEffect  } from 'react';
import axios from 'axios';

function Blogs() {
 
  const [posts,setPosts] = useState([]);
  const [reposts,resetPosts] = useState([]);
  const [submitposts,submitsetPosts] = useState([]);
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
      axios.get('http://localhost/REST-APIS/items/read?year='+2023)
      .then(response => {
        console.log(response)
        resetPosts(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
  },
   []);

  
   const shoot = () => {
      axios.post('http://localhost/REST-APIS/items/delete', {id}).then(response => {
          console.log(response)
          submitsetPosts(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    
  }

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
    <button onClick={shoot}>Take the shot!</button>
    </>
  );
 
}

export default Blogs;

