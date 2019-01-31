import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';

import { db } from '../../../firebase';

const styles = {
  root: {
    width: '100%',
    maxWidth: 360,
    //backgroundColor: theme.palette.background.paper,
  },
  nested: {
    //paddingLeft: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    width: 200,
  },
  buttonParent: {
  	marginTop: '28px',
    height: '45px'
  }
};

class AddBill extends Component {
	constructor(props) {
			super(props);
			this.state = {
				workName: '',
				workRate: 0,
				total: 0,
				worksAdded: []				
			};				
	}

	handleChange = name => event =>  {
			this.setState({
				[name]: event.target.value
			})
	}

	addTotal = data =>  {
			let worksArray = this.state.worksAdded;
			worksArray.push(data.id);
			this.setState({
				total: Number(this.state.total) + Number(data.price),
				worksAdded: worksArray
			})
	}

	callback = state => {
		alert(state);
	}
	addBill = value =>  {
	  
	  const data = {
	  	name: this.state.workName,
	  	total: this.state.workRate,
	  	works: this.state.worksAdded,
	  	id: JSON.stringify(new Date).replace(' ', ''),
	  	createdAt: new Date
	  };

	  db.addBill(data, this.callback);

	}



	filterWorks = () => this.props.works.filter(data => data.name.includes(this.state.workName) && data.name !== ''); 


	render() {
		return(
				<div>Add Bill
		 				<form className={styles.container} noValidate autoComplete="off">
		 						<div>{this.state.total}</div>
		 						<div>
		        						<TextField
		          								id="name"
		          								label="Name"
		          								className={styles.textField}
		          								value={this.state.workName}
		          								onChange={this.handleChange('workName')}
		          								margin="normal"
		        						/>
		        						{ 
		      									this.state.workName.length > 0 ? 
		      									this.filterWorks().map(data => 
		      											<div onClick={
		      														()=> {
		      																this.addTotal(data);
		      														}
		      											}>
		      													{data.name}
		      											</div>
		      									) : null
		      							}
		        				</div>
		        				<div>
		        						<TextField
		          								id="rate"
		          								label="Rate"
		          								className={styles.textField}
		          								value={this.state.workRate}
		          								onChange={this.handleChange('workRate')}
		          								margin="normal"
		        						/>	    
		        				</div>
		        				<div className={styles.buttonParent}>    
			        					<Button 
			        							variant="contained" 
			        							color="primary" 
			        							className={styles.button}
			        							onClick={() => this.addBill()}
			        					>
		        								Add Work
		      							</Button>
	      						</div>
	      						
	        				</form>
				</div>
		)
	}
}


export default AddBill;
