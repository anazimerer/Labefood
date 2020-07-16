import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import useInputValue from '../../hooks/useInput'
import { getRestaurants } from "../../functions/axios";
import Header from '../Header/index'

import { Search, TextPage} from './styles'
import { makeStyles } from "@material-ui/core/styles";
import {
	OutlinedInput,
	CardActionArea,
	CardContent,
	Typography,
	CardMedia,
	Container,
	Card,
} from "@material-ui/core";

const useStyles = makeStyles({
	root: {
	  alignContent: "center",
	  maxWidth: "345",
	  border: "1px solid #b8b8b8",
	  marginBottom: "2vh",
	  boxShadow: "none",
	  borderRadius: "10px",
	},

	title: {
	  fontSize: "1rem",
	  color: "#e8222e",
	  fontFamily: "Roboto, sans-serif",
	  letterSpacing: "-0.39px",
	},

	input: {
		paddingLeft: "5%",
		marginTop: "10vh",
		marginBottom: "2%",
		width: "100%",	
		letterSpacing: "-0.39px",			
	}
});

const SearchPage = () => {
	const history=useHistory();
	const classes = useStyles();
	
	const [searchInput, handleChangeSearchInput]=useInputValue("")
	const [listOfRestaurants, setListOfRestaurants]=useState()

	useEffect( ()  =>{
		(async () => {		
			const response= await getRestaurants()
			setListOfRestaurants(response)	
		 })()		
	}, [])		
	
	let filteredRestaurants= listOfRestaurants
	let restaurantsFound= "Busque por restaurante"

	if(searchInput !== ""){
    	filteredRestaurants = filteredRestaurants.filter((restaurant) => {			
		return restaurant.name.toLowerCase().includes(searchInput.toLowerCase());			
	})
	}    	

	if (filteredRestaurants !== undefined && filteredRestaurants !== "" && filteredRestaurants !== null){
		restaurantsFound = filteredRestaurants.map((rest)=>{
			return (
			<Card
              key={rest.id}
              className={classes.root}
              onClick={() => history.push(`/restaurants/${rest.id}`)}
            >
              	<CardActionArea>
              	  	<CardMedia
              	  	  	component="img"
              	  	  	alt={rest.name}
              	  	  	height="140"
              	  	  	image={rest.logoUrl}
              	  	  	title={rest.name}
              	  	/>
              	  	<CardContent>
              	  	  	<Typography
              	  	  	  	gutterBottom
              	  	  	  	variant="h5"
              	  	  	  	component="h2"
              	  	  	  	className={classes.title}
              	  	  	>
              	  	  	  	{rest.name}
              	  	  	</Typography>
              	  	  	<Typography
              	  	  	  	variant="body2"
              	  	  	  	color="secondary"
              	  	  	  	component="p"
              	  	  	>
              	  	  	    {rest.shipping} min
              	  	  	</Typography>
              	  	</CardContent>
              	</CardActionArea>
            </Card>
			);
		})
	}

  	return(
		<Container
		style={{ height: "100vh" }}
		maxWidth="md">	
			<Header title={"Busca"} back={"true"}/>
			<div>
				<Search />
    		    <OutlinedInput
				  	className= {classes.input}
				  	color="secondary"
    		      	type="text"
    		      	name="searchInput"  
				  	value={searchInput}
				  	placeholder="Restaurante"
    		      	pattern=""
    		      	title="Esse campo só aceita letras" 
				  	onChange={handleChangeSearchInput}
    		    /> 				
				{searchInput.length > 0 ? 
					(restaurantsFound.length > 0 ? restaurantsFound : 
						(<TextPage>Não encontramos :(</TextPage>)) : 
							(<TextPage>Busque por nome de restaurante</TextPage>)
					}
			</div>
		</Container>
	);
};

export default SearchPage;
