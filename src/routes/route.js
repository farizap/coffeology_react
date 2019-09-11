import React from 'react';
import { store } from '../store/store';
import { Provider, connect } from 'unistore/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import pages
// import Brewing from '../pages/brewing';
import RecipesSelection from '../pages/recipesSelection';

function Routes() {
  return (
    <Provider store={store} className="allpage">
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/brewing" component={Brewing} /> */}
          <Route exact path="/recipes" component={RecipesSelection} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default Routes;
