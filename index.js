'use strict';

const r = [
    {
      name: 'zupa',
      ingredients: ['kartofle', 'woda','mieso'],
      directions: 'Zagotuj wode, pokroj kartofle, daj mieso',
    },
    { name: 'kluski',
      ingredients: ['kartofle', 'maka','jajka'],
      directions: 'Zagotuj wode, pokroj kartofle, przeciś przez praskę, daj mieso'
    },
    { name: 'makaron',
      ingredients: ['maka', 'woda','jajka'],
      directions: 'Zagotuj wode, pokroj kartofle, daj mieso, obierz jajka, ugnieć mąkę.'
    },
    { name: 'salatka z soczewicy',
      ingredients: ['soczewica', 'woda','cebula', 'marchew'],
      directions: 'Zagotuj wode, pokroj kartofle, daj mieso, obierz wszystko, poszatkuj'
    },
];

class RecipeBox extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      recipes: r,
      indexActive: 0,
      recipeView: false,
    }
     
    this.handleClick = this.handleClick.bind(this);
    this.closeRecipe = this.closeRecipe.bind(this);
  }
  
  closeRecipe(){
    this.setState({
      recipeView: false,
    })
  }

  handleClick(i){
    console.log('handleClick i: ', i); 
    this.setState({
      recipeView: true,
      indexActive: i,
    });

    
  }

  render() {
    let recipe = null;
    if (this.state.recipeView) {
      recipe = <Recipe recipe={this.state.recipes[this.state.indexActive]}
                 closeRecipe={this.closeRecipe}
                 />
    }
    
    return (
      <div className='container'>
        <ul className='mainList'>
          {this.state.recipes.map( (r, i) => 
            <ListItem recipe={r} index={i} onClick={this.handleClick}/>)
          }
        </ul>
        {recipe}
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
    
    this.state = {
      editMode: false,
    }
    
    this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
  }

  handleEditBtnClick (){
    this.setState({
      editMode: true,
    })
  }
  
  handleCloseBtnClick (){
    this.props.closeRecipe();
  }
  
  render (){
    
    let recipeName = this.props.recipe.name  
    let ingredients = this.props.recipe.ingredients;
    let directions = this.props.recipe.directions;
    
    if (this.state.editMode) {
      return (
        <div className='recipe'>
          
          <Button className='close-button' onclick={this.handleCloseBtnClick}>&times;</Button>
          <input value = {recipeName}></input>
          <h3> Ingredients: </h3>
          <input value={ingredients}></input>
          <h3>Directions:</h3>
          <textarea value={directions}> </textarea>
          <Button className='edit-button' onclick={this.handleEditBtnClick}>Edit</Button>
        </div>
      )
    } else 
      return (
        <div className='recipe'>
          
          <Button className='close-button' onclick={this.handleCloseBtnClick}>&times;</Button>
          <h1> {recipeName} </h1>
          <h3> Ingredients: </h3>
          <Ingredients value={ingredients}/>         
          <h3>Directions:</h3>
          <p> {directions} </p>
          <Button className='edit-button' onclick={this.handleEditBtnClick}>Edit</Button>
        </div>
      )
  };

}

class Button extends React.Component {
  constructor (props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.onclick();
  }
  
  render () {
    return (
      <button className={this.props.className} onClick={this.handleClick}>{this.props.children}</button>
    )
  }
}

function Ingredients(props){
  let ingredients = props.value;
  return (
    <ul>
      {ingredients.map(item => <li>{item}</li> )}
   </ul>
  )
}


ReactDOM.render(<RecipeBox/>,document.getElementById('app'));