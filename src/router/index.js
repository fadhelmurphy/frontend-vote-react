import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AuthRoute from '../component/AuthRoute';
import { Home,Login } from '../pages';
import { ListAll,VoteId } from '../pages/Voting';
// import { Admin } from '../utils/Auth';
export default function index() {
    const rootRouter = [
        {
            path:"/",component:Home,exact:true
        },
        {
            path:"/voting",component:ListAll,exact:true,login:true
        },
        {
            path:"/voting/:id",component:VoteId,login:true
        },
        {
            path:"/login",component:Login
        }
    ]
    return (
        <>
            <BrowserRouter>
                <Switch>
                    {
                        rootRouter.map((el)=>{
                            return el.login?
                            (
                                <AuthRoute path={el.path} exact={el.exact} component={el.component} />
                            )
                            :
                            (
                                <Route path={el.path} exact={el.exact} component={el.component} />
                            )
                        })
                    }
                </Switch>
            </BrowserRouter>
        </>
    )
}
