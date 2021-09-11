import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthRoute } from "../component/Utils";
// import { Home,Login,Voting, PublicVote, Register,LinkManager } from '../pages';
// import { ListAll,VoteId } from '../pages/PrivateVoting';
// import { Admin } from '../utils/Auth';

function loadComponent(name) {
    name = name.split(":")
    if(name.length>1){
        name = name.join('')
    }else{
        name = name[0]
    }
  const Component = React.lazy(() => import(`../pages${name}`));
  return Component;
}

export default function index() {
  const rootRouter = [
    {
      url: "/",
      exact: true,
    },
    {
      url: "/links",
      exact: true,
      login: true,
    },
    {
      url: "/voting",
      exact: true,
      login: true,
    },
    {
      url: "/voting/:id",
      login: true,
    },
    {
      url: "/login",
    },
    {
      url: "/register",
    },
  ];
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading... </div>}>
          <Switch>
            {rootRouter.map((el) => {
              return el.login ? (
                <AuthRoute
                  path={el.url}
                  exact={el.exact}
                  component={loadComponent(el.url)}
                />
              ) : (
                <Route
                  path={el.url}
                  exact={el.exact}
                  component={loadComponent(el.url)
                }
                />
              );
            })}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
