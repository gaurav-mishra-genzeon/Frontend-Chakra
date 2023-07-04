
export default function authHeader() {
  const user = localStorage.getItem("token");
  // console.log("1",user)
  
  if (user) {
    const a= { Authorization: `Bearer ${user}` };
     return a
  }
  else{
    return {}
  }
}


