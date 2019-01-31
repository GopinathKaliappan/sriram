import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import firebase from 'firebase';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import addWorks from '../../actions/add_works';
import Drawer from '@material-ui/core/Drawer';
import Tabs from './Tabs/Tabs';

class HomePage extends Component {
  constructor(props) {
    super(props);
    
  this.state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    data: {},
    work: '',
    isSideMenuOpen: false
  };
    this.addWorks = this.addWorks.bind(this);
    this.getWorks = this.getWorks.bind(this);
    this.db = db;
  }

  componentDidUpdate() {
    console.log(this.props);
  }
  componentDidMount() {
    console.log(this.props);
    const { onSetUsers } = this.props;
    const storeData = firebase.firestore().collection('works');
    // console.log(storeData.firestore());


    db.getWorks(this.getWorks);
    db.onceGetUsers().then(snapshot =>
       onSetUsers(snapshot.val())
    );
    
    // db.addWork('one', 1000, 'dsdfdfsdf',JSON.stringify(new Date), this.addState);

  }
  changeWork(value) {
      console.log(value);
      this.setState({
        work: value
      })
  }
  addState(state) {
      console.log(state);
  }
   
  getWorks(data) {
    this.props.addWorks(data);
  }
  addWorks() {
       this.db.addWork(this.state.work, 1000, this.addState , JSON.stringify(new Date), this.addState);
  }

  toggleDrawer = () => () => {    
    this.setState({
      isSideMenuOpen: !this.state.isSideMenuOpen
    });
  };

  render() {
    const { users } = this.props;

    return (
      <div>
        <h1 onClick={this.toggleDrawer()}>Sri Ram</h1>
        <Drawer 
          open={this.state.isSideMenuOpen} 
          onClose={this.toggleDrawer()}
        >
          <div
            onClick={this.toggleDrawer('left', false)}
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {'sideList'}
          </div>
        </Drawer>
        <Tabs works={this.props.state.works.works} />        
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  
  </div>

const mapStateToProps = (state) => {
  console.log(state);
  return {
    users: state.userState.users,  
    state
  }  
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
  addWorks 
}, dispatch);

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);

