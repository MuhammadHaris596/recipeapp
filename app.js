
    async function USERDETAILS() {
        
        try {
            console.log("getUserr ...");
        const {
            data: { user,session },
        } = await supabase.auth.getUser();
        if (user) {
            console.log(user);
            console.log(session);
    
            try {
            const { data, error } = await supabase
                .from("users")
                .select("name, email , userId")
                .eq("userId", user.id);
            if (data) {
                console.log(data);
    
                let currentUser = {
                name:data[0].name,
                email: data[0].email,
                userId: data[0].userId,
                }

                console.log(currentUser.name)
                console.log(currentUser.email)
                console.log(currentUser.userId)
                

                localStorage.setItem('currentUser' , JSON.stringify(currentUser))
            }
            }
            catch (error) {
        console.log(error);
                Swal.fire({
                    text: error.message,
                    icon: "error"
                });
            }
        }
        } catch (error) {
        console.log(error);
        Swal.fire({
            text: error.message,
            icon: "error"
        });
        }
    }
    
    window.onload = USERDETAILS;
    