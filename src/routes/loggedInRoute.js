import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

const LoggedInRoute = ({ component: Component, ...rest }) => {

    const { user } = useSelector((state) => state.userSignin);
    const { userInfo } = useSelector((state) => state.userRegister);

    return (
    <Route
        {...rest}
        render={props =>
        !userInfo && !user ? (
             <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/home",
                        state: { from: props.location }
                    }}
                ></Redirect>
            )
        }
    />
  )
};

export default LoggedInRoute;
