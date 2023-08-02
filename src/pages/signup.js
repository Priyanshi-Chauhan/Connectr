import {useState} from 'react';
import {useToasts} from 'react-toast-notifications';
import {useHistory, Redirect} from 'react-router-dom';
import {useAuth} from '../hooks';
import styles from '../styles/login.module.css';

const Signup = () =>{

    const[name, setName] = useState('');
    const [email , setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword , setConfirmPassword] = useState('');
    const [signingUp, setSigningUp] = useState(false);   // signingUp is a variable to keep track of the request being sent
     const {addToast} = useToasts();
     const auth = useAuth() ;
     console.log('auth in signup', auth);
     const history = useHistory();   // this history basically refers to the browsers history
     // browser history acts like a kind of stack 

     console.log(history);
     const handlesubmit = async(e) =>{
          e.preventDefault();
          setSigningUp(true);

   let error = false;       
  if(!name || !email  || !password ||  !confirmpassword ){
    addToast('please enter all the fields' ,  {
        appearance  :'error', 
        autoDismiss : true

    })
    error= true;
  }


  if(password !== confirmpassword){
    addToast('Make sure password and confirm password matches' , {
        appearance: 'error', 
        autoDismiss : true
    })
     error= true;
  }

  if(error){
     return setSigningUp(false);
  }

  const response = await auth.signup(name , email , password, confirmpassword);
 
  if(response.success){
    history.push('/login');
    setSigningUp(false);

     addToast('User Successfully registered , please login now', {
        appearance :  'success', 
        autoDismiss : true
     })
   }
    else {
     addToast(response.message, {
        appearance : 'error',
       autoDismiss : true
    })
   }
   setSigningUp(false);
   
}
 if(auth.user){
     return <Redirect to="/" />
 }

return (
    <form className= {styles.loginForm} onSubmit = {handlesubmit}>
 <span className ={styles.loginSignupHeader}>Sign Up</span>
<div className={styles.field}>
<input  type='text'
placeholder = 'Name'
required
value ={name}
onChange = { (e) => setName(e.target.value)} 
/>
</div>
 <div className= {styles.field}>
    <input type="email"
    placeholder ="Email"
    value ={email}
    onChange = {(e) => setEmail(e.target.value)}
    />
 </div>

<div className= {styles.field}>
    <input type="password"
        placeholder = "Password"
        value ={password}
        onChange = {(e) => setPassword(e.target.value)}
/>
</div>
    <div className = {styles.field}>
        <input
        type ="password"
        placeholder = "ConfirmPassword"
        value ={confirmpassword}
        onChange = {(e) => setConfirmPassword(e.target.value)}
         />
    </div>

<div className = {styles.field}>
    <button disabled= {signingUp}>
        {signingUp ? "signingUp...." : 'Sign Up'}
    </button>

</div>
    </form>
)
}

export default Signup;
