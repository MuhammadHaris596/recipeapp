let signupEmail = document.getElementById('signup_email')
let signupPass = document.getElementById('signup_password')
let signupBtn = document.getElementById('signup_btn')
// let signup_btn_spinner = document.getElementById("signup_btn_spinner")

let loginBtn = document.getElementById('login_btn')
let loginEmail = document.getElementById('login_email')
let loginPass = document.getElementById('login_password')
// let login_btn_spinner = document.getElementById('login_btn_spinner')

let signupName = document.getElementById("signup_name")


let sessionBtn = document.getElementById('session_btn')

let logoutBtn = document.getElementById('logout_btn')


async function signup() {
  try {
    // signupBtnLoader.style.display = "block";
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail.value,
      password: signupPass.value,
    });

    if (error) throw error;
    if (data) {
      console.log(data.user.id);

      // as signup success , add record also in DB
      try {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .insert({
            userId: data.user.id,
            email: signupEmail.value,
            name: signupName.value,
          })
          .select("");

        if (userData) {


        //   let currentUser = {
        //     userId : data.user.userId, 
        //     name :  signupName.value
        //   }

            // console.log(currentUser.userId);
         

        //   localStorage.setItem("currentUser", JSON.stringify(currentUser))
          // console.log(userData);


          Swal.fire({
            title: "User Accout is created successfully!",
            icon: "success"
          });
        }

        if (userError) throw userError;
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {
            
        window.location.href = "login.html"
    }, 2000);
    }
    return data;
  } catch (error) {
    console.log(error);
    
    Swal.fire({
      title: error.message,
      icon: "error"
    });
  } 
  // finally {
  //   signupBtnLoader.style.display = "none";
  // }
}




async function login() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail.value,
        password: loginPass.value,
      })
          if(error) throw error
          if(data) {

// console.log(data);
console.log(data.user.id);
                
      
            console.log(data)
            Swal.fire({
                title: "Sign in Succesfull",
                icon: "success"

                
            });
          
            setTimeout(() => {
            
                window.location.href = "shareRecipe.html"
            }, 2000);
            
        }   

       
          return data;
        }

    
    

     catch (error) {
            console.log(error)

            Swal.fire({
                title: error.message,
                icon: "error"
            });
    }
   
}


async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
  
      window.location.href = "/login.html";
    } catch (error) {
      console.log(error);
    }
  }

 
  

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }



  if(signupBtn){
    signupBtn.addEventListener('click', signup)
    }
    
    
    
    if(loginBtn){
        loginBtn.addEventListener('click',login)
    }
    