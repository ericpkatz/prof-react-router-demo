import React, { Component } from 'react';
import axios from 'axios';
import UserList from './UserList';
import ThingList from './ThingList';
import Home from './Home';
import Nav from './Nav';
import { Route } from 'react-router-dom';


class App extends Component{
  constructor(){
    super();
    this.state = {
      things: [],
      users: []
    };
  }

  componentDidMount(){
    Promise.all([
      axios.get('/api/users'),
      axios.get('/api/things'),
    ])
    .then(([ usersData, thingsData ])=> {
      this.setState({
        users: usersData.data,
        things: thingsData.data,
      });
    })
  }

  render(){
    const { things, users } = this.state;
    return (
      <div className='container'>
        <h1>Users and Things</h1>
        <Route render={(router)=> <Nav users={users} things={ things } router={ router }/> } />
        <Route exact path='/' component={ Home } />
        <Route path='/users' render={ ()=> <UserList users={ users }/> } />
        <Route exact path='/things' render={ ()=> <ThingList things={ things }/> } />
      </div>
    );
  }
  
}

export default App;
