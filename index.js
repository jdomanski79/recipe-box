'use strict';

const r = [
    {
      name: 'zupa',
      ingredients: ['kartofle', 'woda','mieso'],
      directions: 'Zagotuj wode, pokroj kartofle, daj mieso',
    },
    { name: 'kluski',
      ingredients: ['kartofle', 'maka','jajka'],
      directions: 'Zagotuj wode, pokroj kartofle, daj mieso'
    },
    { name: 'makaron',
      ingredients: ['maka', 'woda','jajka'],
      directions: 'Zagotuj wode, pokroj kartofle, daj mieso'
    },
    { name: 'salatka z soczewicy',
      ingredients: ['soczewica', 'woda','cebula', 'marchew'],
      directions: 'Zagotuj wode, pokroj kartofle, daj mieso'
    },
];

class RecipeBox extends React.Component {
	constructor(props){
		super(props);

    this.state = {
      recipes: r,
      indexActive: 0,
    }
	   
    this.handleClick = this.handleClick.bind(this);     
  }

  handleClick(i){
    console.log('handleClick i: ', i); 
    this.setState({
      indexActive: i,
    });

  }

	render() {
    console.log('Render!');
		return (
		  <div className='container'>
        <ul className='mainList'>
          {this.state.recipes.map( (r, i) => 
            <ListItem recipe={r} index={i} onClick={this.handleClick}/>)
          }
        </ul>
        <Recipe recipe={this.state.recipes[this.state.indexActive]} />
      </div>
		)
	}
}

class ListItem extends React.Component {
  constructor (props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    console.log(this.props);
    this.props.onClick(this.props.index);
    //  this.props.onClick
  }

  render (){
      return (
        <li onClick={this.handleClick}>{this.props.recipe.name}</li>
      )
  };

}

class Recipe extends React.Component {
  constructor (props){
    super(props);

  }

  render (){
      return (
        <div className='recipe'>
          <h1>{this.props.recipe.name}</h1>
          <ul>{this.props.recipe.ingredients.map(item =>
              <li>{item}</li>
              )}
          </ul>
          <p>{this.props.recipe.directions}</p>
        </div>
      )
  };

}



ReactDOM.render(<RecipeBox/>,document.getElementById('app'));