import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import TextField from '@material-ui/core/TextField';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import addWorks from '../../../actions/add_works';


import { db } from '../../../firebase';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  buttonParent: {
  	marginTop: '28px',
    height: '45px'
  }
});

class NestedList extends React.Component {
  constructor(props) {
    super(props);
    this.getWorks = this.getWorks.bind(this);
    this.callback = this.callback.bind(this); 
  }

  state = {
    openIndex: 500,
    work: '',
    rate: 0
  };

  getWorks = data =>  {
    this.props.addWorks(data);
  }

  callback(data) {
  	// alert(data);
    db.getWorks(this.getWorks);
  }



  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  addNewWork() {
  	db.addWork(this.state.work, this.state.rate, JSON.stringify(new Date).replace(' ', ''), this.callback);
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      	 <form className={classes.container} noValidate autoComplete="off">
	        <TextField
	          id="name"
	          label="Name"
	          className={classes.textField}
	          value={this.state.name}
	          onChange={this.handleChange('work')}
	          margin="normal"
	        />
	        <TextField
	          id="rate"
	          label="Rate"
	          className={classes.textField}
	          value={this.state.rate}
	          onChange={this.handleChange('rate')}
	          margin="normal"
	        />	    
	        <div className={classes.buttonParent}>    
		        <Button 
		        	variant="contained" 
		        	color="primary" 
		        	className={classes.button}
		        	onClick={() => this.addNewWork()}
		        >
	        		Add Work
	      		</Button>
      		</div>
        </form>
      
      	{
      		this.props.works.map(w => 
      		
		          <ListItem button onClick={this.handleClick}>
		          	<Avatar>
            			<ImageIcon />
          			</Avatar>          
		          	<ListItemText primary={w.name} secondary={`RS -/ ${w.price}`} />
		          </ListItem>			          
      		)
      	}        
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
  works: PropTypes.array.isRequired,
};
NestedList.defaultProps = {
  works: []
};

const mapStateToProps = state => {
  console.log(state);
  return {
    state
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addWorks
  }, dispatch);
}

export default compose(withStyles(styles),
connect(mapStateToProps, mapDispatchToProps)
)(NestedList);