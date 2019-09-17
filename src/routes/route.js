import React from "react";
import { Provider, connect } from "unistore/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import alert
import store from "../store/store";

// import pages
import RecipesSelection from "../pages/RecipesSelection";
import Brewing from "../pages/Brewing";
import RecipeDetail from "../pages/RecipeDetail";
import Test from "../pages/test";
import RecipeDemo from "../pages/RecipeDemo";
import Login from "../pages/loginTest";
import Register from "../pages/register";
import Activity from "../pages/activity";
import CreateRecipe from "../pages/CreateRecipe";
import AddStep from "../pages/addStep";
import InputStep from "../pages/inputStep";
import Review from "../pages/Review";
import Navbar from "../components/navbar"
function Routes() {
  return (
    <Provider store={store} className="allpage container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Brewing} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/recipe/:recipeID" component={RecipeDetail} />
          <Route exact path="/recipe/demo/:recipeID" component={RecipeDemo} />
          <Route exact path="/recipe/review/:recipeID" component={Review} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/activity" component={Activity} />
          <Route exact path="/recipes/create" component={CreateRecipe} />
          <Route exact path="/recipes/create/addstep" component={AddStep} />
          <Route exact path="/recipes/create/inputstep" component={InputStep} />
          <Route exact path="/recipes/:methodID" component={RecipesSelection} />
        </Switch>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
}

export default Routes;
