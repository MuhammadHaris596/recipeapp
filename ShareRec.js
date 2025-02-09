let postContent = document.getElementById("postContent");
let postFile = document.getElementById("postFile");
let postButton = document.getElementById("postBtn");
let post_Name = document.getElementById("postName");
let containerPost = document.getElementById("mypostContainer");
let mycontainerPost = document.getElementById("mycontainerPost")
let savepost = document.getElementById("savepost")


async function AddPost() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    console.log(currentUser.name);
    console.log(currentUser.userId);
    console.log(currentUser.email);
    
      try {
    
        // Adding post content in DB
        const { data, error } = await supabase
          .from("posts")
          .insert({ userId: currentUser.userId,Username:currentUser.name,content: postContent.value,  postName: post_Name.value, })
          .select();
    
          // console.log(data);
         
        if (error) throw error;
    
        if (data) {
          console.log(data);
          // Checking if any image is uploaded for that post, so saving image in Storage
          if (postFile.files.length > 0) {
            let currentFile = postFile.files[0];
            
    console.log(postFile.files);
    
            
            
            try {
              const { data: imageStoreData, error: imageStoreError } =
                await supabase.storage
                  .from("postimages") // Bucket name
                  .upload(
                    `data/${data[0].id}`, // File name, post id
                    currentFile,currentFile.name,
                    {
                      cacheControl: "3600",
                      upsert: false,
                    }
                  );
    
    
    
              if (imageStoreError) throw imageStoreError;
    
              if (imageStoreData) {
                console.log(imageStoreData);
    
                try {
                  const { data: publicUrlData } = await supabase.storage
                    .from("postimages")
                    .getPublicUrl(imageStoreData.path); // Current received path of file from Supabase
    
                  if (publicUrlData) {
                    console.log(publicUrlData.publicUrl);
    
                    try {
                      // Update imageURL in the current POST
                      const { data: postUpdateData, error: postUpdateError } =
                        await supabase
                          .from("posts")
                          .update({ imageURL: publicUrlData.publicUrl })
                          .eq("id", data[0].id)
                          .select();
    
                      if (postUpdateError) throw postUpdateError;
    
                      if (postUpdateData) {
                        console.log("Post updated with image URL:", postUpdateData);
                      }
                    } catch (error) {
                      console.log(error);
                    } finally {
                      // postsContainer.innerHTML = "";
                      loadPosts();
                    }
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            } catch (error) {
              console.log(error.message);
            }
          }
        }
      } catch (error) {
      
        console.log(error.message);
      }
    }
    
async function loadPosts(){
    try{
        const { data, error } = await supabase.from('posts')
        .select()
        

        if(error) throw error

        if (data){

            
            let myuserId = JSON.parse(localStorage.getItem("currentUser"))
            data.map((val)=>{
                let myPosts = false
                if(val.userId === myuserId.userId ){
                    myPosts = true
                    console.log(" post is true");
                }

                // containerPost = document.getElementById("mypostContainer")
                if(containerPost){
                  return  containerPost.innerHTML += ` <div class="card d-flex  flex-column ">
                <div class="profile-row d-flex d-flex justify-content-between ">
                    <div class="left-imgSide d-flex flex-row ">
                        <div class="prof-imgBox">
                            <img src="./assets/img/profile img.jpg" alt="">
                        </div>
                        <div class="text-content">
                            <span>Post by</span>
                            <h6>${val.Username}</h6>
                        </div>
                    </div>
                    <div class="right-timeBox">
                        <span>${new Date(
                          val.created_at
                        ).toLocaleString()}</span>
                    </div>
                </div>   
                <div class="card-contentWrap juctify-content-center align-items-center d-flex ">
                    <div class="img-box img_1">
                     <img src="${val.imageURL}" alt="">
                      
                    </div>
                    <div class="texs ">
                        <h4>${val.postName}</h4>
                        <p>${val.content}</p>
                            <div class="btn-box">
                                <button class="view-recipe" id="view_btn"><a href="./recipeView.html">View Recipe</a></button>
                            </div>
                            <div class="btn-pears d-flex ">
                              <button class="save_btn" onclick="saveBtn()"  id="save_btn" onclick="savePost(${val.id})" >

                              
                                <i class="fa-regular fa-bookmark" id="save-empty"></i>
                              
                                </button>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

                      }


            if(mycontainerPost){
                mycontainerPost.innerHTML += ` <div class="container inner-container" id="mycontainerPost">
                <div class="content inner-content">
                    <div class="titlle-row">
                        <h3>${val.postName}</h3>
                    </div>
                    <div class="img-box">
                        <img src="${val.imageURL}" alt="">
                    </div>
                    <div class="texts">
                        <p>${val.content}</p>
                    </div>
                   
                        
                    </div>
                </div>
            </div>`
            }
                        
              
            })
        }
        
    }catch(error){
        console.log(error);
    }
}
async function savePost(postid) {
  try {
    // Fetch the post details
    const { data, error } = await supabase
      .from("posts")
      .select("Username, postName, content, imageURL")
      .eq("id", postid)
      .single(); 

    if (error) throw error;

    console.log("Fetched post data:", data); // Debugging log

    if (data) {
      try {
        // Insert into 'save' table
        const { error: insertError } = await supabase
          .from("save")
          .insert({
            image: data.imageURL, 
            username: data.Username,
            postName: data.postName,
            content: data.content,
          });

        if (insertError) throw insertError;

        console.log("Post saved successfully!");
      } catch (insertError) {
        console.error("Error inserting into save table:", insertError.message);
      }
    }
  } catch (error) {
    console.error("Error saving post:", error.message);
  } finally {
    displaySavePost(); // Refresh the display after saving
  }
}

async function displaySavePost() {
  try {
    const { data: saveData, error: saveError } = await supabase
      .from("save")
      .select();

    if (saveError) throw saveError;

    if (savepost) {
      savepost.innerHTML = ""; // Clear previous content before adding new posts

      saveData.forEach((val) => {
        console.log(val.image);
        savepost.innerHTML += `
          <div class="inner-row d-flex justify-content-center align-items-center">
            <div class="save-box position-relative">
              <div class="img-box">
                <img src="${val.image}" alt="">
              </div>
              <div class="text-box">
                <div class="user-detail d-flex align-items-center">
                  <div class="user-img">
                    <img src="./assets/img/profile img.jpg" alt="userimg">
                  </div>
                  <span>${val.username}</span>
                </div>
                <span>${val.postName }</span>
                <p>${val.content}</p>
              </div>
              <div class="icon-box d-flex flex-column position-absolute">
                <button><img src="./assets/icons/delete.png" alt=""></button>
                <button><i class="fa-solid fa-pen"></i></button>
              </div>
            </div>
          </div>`;
      });
    }
  } catch (saveError) {
    console.error("Error displaying saved posts:", saveError.message);
  }
}




// async function savePost(postid) {
//   try {
//     const { data, error } = await supabase
//       .from("posts")
//       .select("Username", "postName", "content", "imageURL")
//       .eq("id", postid);

//     if (error) throw error;

//     if (data.length > 0) {
//       const post = data[0];

//       const { error: insertError } = await supabase.from("save").insert({
//         image: post.imageURL,
//         username: post.Username,
//         postName: post.postName,
//         content: post.content,
//       });

//       if (insertError) throw insertError;

//       displaySavePost(); // Refresh saved posts
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// }


// async function savePost(postid) {
//   try {
//     const { data, error } = await supabase
//       .from("posts")
//       .select("Username", "postName" , "content","imageURL")
//       .eq("id", postid);
       
//       console.log("my name is asad")

//       if (error) throw error;

//       if(data){
//         try{
//           console.log("my name is not asad")

//             const { error:saverror } = await supabase
//           .from('save')
//           .insert({ 
//             image : data[0].imageURL, 
//             username: data[0].Username , 
//             postName : data[0].postName , 
//             content: data[0].content 
//           })

//         }catch(saverror){
//           console.log(saverror.message);
//         }
         
//       }
//   } catch (error) {  
//     console.error(errorsave.message);
//   }finally{
//     displaySavePost()
//     savePost.innerHTML = ``

//   }
// }

// async function savePost(postid) {
//   try {
//     // Fetch the post details
//     const { data, error } = await supabase
//       .from("posts")
//       .select("Username, postName, content, imageURL")
//       .eq("id", postid)
//       .single(); 

//     if (error) throw error;

//     console.log("Fetched post data:", data); // Debugging log

//     try {
//       if (data) {
//         // Insert into 'save' table
//         const { error: insertError } = await supabase
//           .from("save")
//           .insert({
//             image: data.imageURL, 
//             username: data.Username,
//             postName: data.postName,
//             content: data.content,
//           });

//         if (insertError) throw insertError;

//         console.log("Post not  saved successfully!");
//       }
//     } catch (insertError) {
//       console.error("Error inserting into save table:", insertError.message);
//     }
//   } catch (error) {
//     console.error("Error saving post:", error.message);
//   } finally {
//     displaySavePost();
//     savepost.innerHTML = ""
//   }
// }








async function deleteMyPost(postId) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .delete()
          .eq("id", postId)
          .select();
    
        if (error) throw error;
    
        if (data) {
            
            containerPost.innerHTML = "";
            
          loadPosts();
        }
      } catch (error) {
        console.log(error);
      }
    }


   
 window.onload = displaySavePost
    
window.deleteMyPost = deleteMyPost;

window.savePost = savePost

window.onload = loadPosts;

if(postButton){
postButton.addEventListener("click", AddPost);
}


