import {BrowserRouter as Router, Route, Switch,  Redirect}  from 'react-router-dom';
import {Home, Login, Signup, Settings, UsersProfile} from '../pages';
import {Loader, Navbar} from './';
import {useAuth} from '../hooks';

// Our Custom  <PrivateRoute>
function PrivateRoute ({children, ...rest}){        
 // Children will be the component which is inside the privateroute   

const auth = useAuth();
return (
<Route
{...rest}                          // rest  -> (exact, path)
render  = {() => {
  if(auth.user){                  // it would be null, if user is not logged in
     return children;
  }
return <Redirect to ="/login" />
}}
/>
)}

//dummy component
const Page404 = () => {
  return <h1>its a 404 error</h1>
}

function App() {
  const auth = useAuth();

  if(auth.loading){
     return <Loader/>;
  }

  return (
    <div className="App">
   {/*navbar will be rendered for each and every route*/}
<Router>
<Navbar />  
<Switch>    {/*in newer version of react-router-dom, we use Routes instead of Switch, whatever first route it matches, it renders that and wont go down in the code*/}  

<Route exact path= "/">
  {/* <Home postss ={posts}/> */}
  <Home />
</Route>      

<Route exact path ="/login">
  <Login />
  </Route>

<Route exact path="/signup" >
  <Signup /> 
   </Route> 

<PrivateRoute exact path ="/settings">
<Settings />  
</PrivateRoute>

{/* this means /user/:userId will be matched with the /user/someString. whatever the user types after /user/ , that string will be in the param  => (userId). this userId is accessible to us */}
<PrivateRoute exact path ="/user/:userId">       
<UsersProfile />  
</PrivateRoute>

 <Route>
  <Page404 />
</Route> 

</Switch>
</Router>
          
</div>    
  );
}
export default App;
