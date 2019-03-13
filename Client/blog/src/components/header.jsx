import React, {Fragment} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Link from 'react-bootstrap/NavLink';
import Dropdown from 'react-bootstrap/Dropdown';

import {UserConsumer} from '../components/context/user';
import CategoriesService from '../services/categories-service';

class  Header extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			categories:[]
		}
	}
	static service = new CategoriesService();

	async componentDidMount() {
		let categories = await Header.service.getCategories();

		this.setState({
			categories
		})
	}

	render() {
		const {isAdmin,isLoggedIn, username, logout} = this.props;
		
		if(isAdmin){
			return(
			<Navbar className="navbar navbar-light" style={{"background-color":"#e3f2fd"}}>
				<Fragment>
				<Nav className="mr-auto">
				   <Nav.Link href="/">Home</Nav.Link>
				   <Dropdown>
					   <Dropdown.Toggle variant="info-outline" id="dropdown-basic">
						   Categories
					   </Dropdown.Toggle>

					   <Dropdown.Menu>
					   		{
								this.state.categories.map(category =>(
									<Dropdown.Item key={category._id} href="#/action-1">{category.name}</Dropdown.Item>))
							}
					   </Dropdown.Menu>
					</Dropdown>
				   <Nav.Link href="/createpost">Create Post</Nav.Link>		
				   <Nav.Link href="/createcategory">Create Category</Nav.Link>
				   <Nav.Link href="/manageposts">Manage Posts</Nav.Link>		
				 </Nav>
				 
			   <Nav className="float-right">
				   <Link>Hello, {username}</Link>
				   <Nav.Link href="#" onClick={logout}>Log out</Nav.Link>
			   </Nav>
			   <Form inline>
			   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
			   <Button variant="outline-success">Search</Button>
			   </Form>
		   </Fragment>
		   </Navbar>
				)
					
		}
		else if(isLoggedIn){
			return(<Fragment>
				<Navbar>
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Dropdown>
					   <Dropdown.Toggle variant="info-outline" id="dropdown-basic">
						   Categories
					   </Dropdown.Toggle>

					   <Dropdown.Menu>
					   		{
								this.state.categories.map(category =>(
									<Dropdown.Item key={category._id} href="#/action-1">{category.name}</Dropdown.Item>))
							}
					   </Dropdown.Menu>
					</Dropdown>
				  </Nav>
				<Nav className="float-right">
					<Link>Hello, {username}</Link>
					<Nav.Link href="#" onClick={logout}>Log out</Nav.Link>
				</Nav>
			<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<Button variant="outline-success">Search</Button>
			</Form>
			</Navbar>
			</Fragment>)
		}
		else {
			return(
			<Fragment>
				<Navbar>
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Dropdown>
					   <Dropdown.Toggle variant="info-outline" id="dropdown-basic">
						   Categories
					   </Dropdown.Toggle>

					   <Dropdown.Menu>
					   		{
								this.state.categories.map(category =>(
									<Dropdown.Item key={category._id} href="#/action-1">{category.name}</Dropdown.Item>))
							}
									
					   </Dropdown.Menu>
					</Dropdown>
				</Nav>
				<Nav.Link href="/login">Login</Nav.Link>
				<Nav.Link href="/register">Register</Nav.Link>
				<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<Button variant="outline-success">Search</Button>
			</Form>
				</Navbar>
			</Fragment>)
					
		}
	}	
}		

const HeaderWithContext = (props) => {
    return ( 
        <UserConsumer>
        {
            ({isLoggedIn, isAdmin, username}) => (
                <Header 
                    {...props} 
					isLoggedIn={isLoggedIn} 
					isAdmin = {isAdmin}
					username={username}
                />
            )
        }
    </UserConsumer>)
   
}

export default HeaderWithContext;
