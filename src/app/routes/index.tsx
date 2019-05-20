import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Root from '../containers';

const routes = (
  <Switch>
    <Route exact path="/" component={Root} />
    <Route path="/:quizType" component={Root} />
    <Route component={() => <h1>404 dude</h1>} />
  </Switch>
);

export default routes;
