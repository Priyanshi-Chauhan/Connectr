import {useState} from 'react';
import styles from '../styles/login.module.css';
import {useToasts} from 'react-toast-notifications';
import {useAuth} from '../hooks';
import {Redirect} from 'react-router-dom';


const Login = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [loggingIn ,setLoggingIn] = useState(false);
      const {addToast} = useToasts();
       const auth = useAuth();
       console.log("Auth in Login", auth);

const handleSubmit = async (e) => {
     e.preventDefault();
     setLoggingIn(true);
     
     if(!email  || !password){
          return addToast('please enter both email and password' ,{
               appearance : 'error', 
          }); 
     }

const response = await auth.login(email, password);            // auth baad mei aaya tha 

if(response.success) {
     addToast('successfully logged In' ,{
     appearance : 'success'
})
}
else {
       addToast(response.message , {
          appearance : 'error'

      })
}
setLoggingIn(false);
}
if(auth.user){
     return <Redirect to="/" />
 }

     return (
          <form className = {styles.loginForm} onSubmit ={handleSubmit}> 
               <span className ={styles.loginSignupHeader}>Log In</span>
               <div className = {styles.field}>
                    <input type ="email"
                     placeholder = "Email"
                          required
                      value ={email}
                      onChange = {(e) => setEmail(e.target.value)}
                    />
               </div>
                 
            <div className= {styles.field}>
               <input type= "password" 
               placeholder ="Password" 
                required
               value = {password}
               onChange ={(e) => setPassword(e.target.value) }
               />
            </div>

            <div className= {styles.field}>
               <button disabled ={loggingIn}>
                    {loggingIn ? 'Logging in...' : 'Log In'}
                    </button>
            </div>
          </form>
     )
}

export default Login; 