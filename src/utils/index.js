export * from './constants';

export const setItemInLocalStorage = (key, value) => {
   if(!key || !value){
    return console.error("cannot store in it");
   }

   const valueToStore =  typeof value !== "string" ? JSON.stringify(value) : value; 
  localStorage.setItem(key , valueToStore);
  }


export const getItemFromLocalStorage = (key) => {
  if(!key){
    return console.error('cannot get the value from LS');
  }
  return localStorage.getItem(key);

}

export const removeItemFromLocalStorage = (key) =>{
  if(!key){
    return console.error('cannot remove item from LS');
  }
localStorage.removeItem(key);

}

 // params is  an object 
 // e.g. {username : 'aakash', password: '123123'}
export const getFormBody = (params) => {
  let formBody = [];
  for(let property in params){
//A URI (Uniform Resource Identifier) is a string that refers to a resource.The most common are URLs, which identify the resource by giving its location on the Web. URNs, by contrast, refer to a resource by a name, in a given namespace.
 
 
// The encodeURIComponent() function encodes a URI by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two surrogate characters). Compared to encodeURI(), this function encodes more characters, including those that are part of the URI syntax.
  let encodedKey= encodeURIComponent(property); // 'user name' => 'user%20name' 
  let encodedValue = encodeURIComponent(params[property])     // aakash 123 => aakash%20123

formBody.push(encodedKey + '=' + encodedValue);
}
return formBody.join('&'); // 'username=aakash&password=123123' if {username :'aakash', password:'123123'}
}