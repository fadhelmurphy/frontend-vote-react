import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthRoute } from '../component/Utils';
import { Home,Login,Voting, PublicVote, Register,LinkManager } from '../pages';
// import { ListAll,VoteId } from '../pages/PrivateVoting';
// import { Admin } from '../utils/Auth';
export default function index() {
    const rootRouter = [
        {
            path:"/",component:Home,exact:true
        },
        {
            path:"/links",component:LinkManager,exact:true,login:true
        },
        {
            path:"/voting",component:Voting,exact:true,login:true
        },
        {
            path:"/voting/:id",component:PublicVote,
        },
        {
            path:"/login",component:Login
        },
        {
            path:"/register",component:Register
        },
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
