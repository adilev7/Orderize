import React from "react";
import { Route, Redirect } from "react-router-dom";
import userService from "../../services/userService";

//Creating a custom route in order to add functionalities
//here we will make a protected route;

//pass path and render so they would'nt be passed into "...rest"
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  // currentUser --> if user is logged in or not
  const currentUser = userService.getCurrentUser();
  //return a <Route> in order to use the component like a Route;
  return (
    <Route
      {...rest}
      //props is props of the <Route>
      render={(props) => {
        console.log("88888888" + JSON.stringify(props));
        //render the Route only if the user is not logged in OR (if the ProtectedRoute's 'biz' is true AND not a biz user).
        if (!currentUser || (rest.admin && !currentUser.admin)) {
          return (
            //redirect to the sign-in page while saving the current location in order to redirect the user back to the unauthorized page after signing in.
            <Redirect
              //"to" of Redirect can get either a path or an object.
              //the object has keys- pathname and state, the state gets an object of your choice.
              //in this case "state" gets an object containing the props.location of the page redirected from.
              //this way the user will be redirected but still preserve information about his previouse location.
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          );
        }
        //You can give the <ProtectedRoute> as props, or a component or render as props.
        //if a component was provided to ProtectedRoute return the <Component/> with the props^,
        //if not return render() with props^
        //pass the props of render of Route (line 17) to the "<Component/>" or the "render".
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
  //use the rest/spread operator in order to save all the functionalities that Route has other then path and component into the <ProtectedRoute>.
};

export default ProtectedRoute;
