import React from 'react';
import { Provider, connect } from 'unistore/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import alert
import store from '../store/store';

// import pages
import RecipesSelection from '../pages/RecipesSelection';
import Brewing from '../pages/Brewing';
import RecipeDetail from '../pages/RecipeDetail';
import Test from '../pages/test';
import RecipeDemo from '../pages/TimerTest/timerPage';
import SignIn from '../pages/SignIn';
import Register from '../pages/register';
import Activity from '../pages/Activity';
import CreateRecipe from '../pages/CreateRecipe';
import AddStep from '../pages/AddStep';
import InputStep from '../pages/InputStep';
import Review from '../pages/Review';
import Profile from '../pages/Profile';
import Search from '../pages/SearchPage';
import ErrorPage from '../pages/ErrorPage';
import User from '../pages/User';

import EditRecipe from '../pages/EditRecipe';
import EditRecipeAddStep from '../pages/EditRecipeAddStep';

import BeanPage from '../pages/BeanPage';
import BeanDetail from '../pages/BeanDetail';

// import component
import Navbar from '../components/navbar';
import Header from '../components/header';

function Routes() {
  return (
    <div className="App container-fluid px-0 ">
      <div className="container allpage">
        <div className="row justify-content-center">
          <div
            className="col-12 shadow mh-100"
            style={{
              maxWidth: '480px',
              paddingBottom: '125px',
              paddingTop: '100px',
              minHeight: '100vh',
            }}
          >
            <Provider store={store} className="allpage container">
              <BrowserRouter>
                <Header />
                <Switch>
                  <Route exact path="/" component={Brewing} />
                  <Route
                      exact
                      path="/test"
                      component={Test}
                    />
                  <Route
                      exact
                      path="/recipe/:recipeID"
                      component={RecipeDetail}
                    />
                  <Route
                      exact
                      path="/recipe/demo/:recipeID"
                      component={RecipeDemo}
                    />
                  <Route
                      exact
                      path="/recipe/review/:recipeID"
                      component={Review}
                    />
                  <Route
                      exact
                      path="/login"
                      component={SignIn}
                    />
                  <Route
                      exact
                      path="/register"
                      component={Register}
                    />
                  <Route
                      exact
                      path="/activity"
                      component={Activity}
                    />
                  <Route
                      exact
                      path="/recipes/create"
                      component={CreateRecipe}
                    />
                  <Route
                      exact
                      path="/recipes/create/addstep"
                      component={AddStep}
                    />
                  <Route
                      exact
                      path="/recipes/create/inputstep"
                      component={InputStep}
                    />
                  <Route
                      exact
                      path="/recipes/:methodID"
                      component={RecipesSelection}
                    />
                  <Route
                      exact
                      path="/profile/me"
                      component={Profile}
                    />
                  <Route
                      exact
                      path="/profile/:userID"
                      component={User}
                    />
                  <Route
                      exact
                      path="/search"
                      component={Search}
                    />
                  <Route
                      exact
                      path="/beans"
                      component={BeanPage}
                    />
                  <Route
                      exact
                      path="/beans/:beanID"
                      component={BeanDetail}
                    />

                  <Route
                      exact
                      path="/recipe/edit/:recipeID"
                      component={EditRecipe}
                    />
                  <Route
                      exact
                      path="/recipe/edit/addstep/:recipeID"
                      component={EditRecipeAddStep}
                    />
                  <Route component={ErrorPage} />
                </Switch>
                <Navbar />
              </BrowserRouter>
            </Provider>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Routes;
