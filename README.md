# Welcome to FRAMED!

Using the FRAMED app, you can scroll the roll of photos to your heart's content, add images that you want to share with the world and comments on images in the roll. Find inspiration, enjoy the beauty of world and share some of your best work!

The FRAMED app welcomes photographers of all different skill levels to share their snapshots of the world through a lense. Get out there in the world and show us what an image can look like! Report back and post your image ;)

Checkout the Framed here: https://framed-app.herokuapp.com/

## FRAMED User Guide

<!-- ### Local Set Up

1) Clone the repo and run npm install
2) Create a .env file and fill in all fields, refer to the .env.example for reference
3) Create a database user (with createDB) using the same information you wrote inside of your .env file
3) After that you will want -->

![](README-images/splash.png)

On the top right of the page, in the nav bar, you can find "Log In", "Sign Up" and "Demo User". Using the "Log In" link you will be redirected to the "Log In Page" where you can log in if you have an existing account. If you do not have an existing account you can create a new account on the "Sign Up Page" using he sign up link.

Additionally, in the nav bar at the top right of the page, you can find a "Demo User" link to log in and test the functionality of the site without creating an account. Log in and check it out!

![](README-images/Add-Image.png)

After you are logged in, you can add a URL image using the "Add Image" link that will now appear in the nav bar. You will additionally see a proile icon that will list you information and a logout button if clicked.

![](README-images/add-image-page.png)

When logged in, a user can click on any of the photos located in the roll and see details about the image and who posted it. Logged in users can additionally, add comments to any image. If you added an image to the scroll yourself, you can edit this image or remove it from the roll completely.

![](README-images/Photo-detail.png)

At the bottom of the page you can find links to my LinkedIn and GitHub profiles.

## List of Technologies Used

### PERN STACK

- Javascript
- Rect
- Express.js
- Redux
- Node.js
- PostgreSQL
- SEQEULIZE
- CSS
- HTML

## Features of FRAMED

- Sign-In/Log-In with user creditionals
- Demo User
- Create, Read, Update, and Destroy Images with error handling
- Create, Read and Destroy Comments with error gandling

## Future To-Dos

- Update Comments (Posted by User)
- Albums
- AWS Image Storing
- Favorites
- Tags
- Google Maps

## Technical Implementation Details

I spent extra time making sure that my database was planned out properly before getting into the code. This was an important lesson I learned from my first a/A project.

Conditionally rendering certain buttons or components was something that I really felt comfortable with by the end of this project. Below is a quick same of some code from one of my components to make sure that only certain buttons or options appeared if you have the appropriate credentials.

```
 <div className="image-detail">
      <img id='image-image' src={`${image.imageUrl}`} alt={image.title}></img>
      <div className="image-details-end">
        {content}
        {!showEditForm && showEditButton && <button id="image-edit-button" onClick={goToEditPage}>Edit Image</button>}
        {!showEditForm && showDeleteButton && <button type="button" onClick={handleDeleteImage}>Delete Image</button>}
        <CommentComponent />
        {!showEditForm && showAddCommentButton && <button id="add-comment-button" type="button" onClick={handleAddComment}>Add Comment</button>}
        {showAddComment && <AddCommentComponent setShowAddComment={setShowAddComment} setShowAddCommentButton={setShowAddCommentButton} />}
      </div>
    </div>
```

A very small but surprisingly difficulty that I ran into during this project was rendering the footer on all pages and mobile. My final fix was to use DOM manipulation to assign specific classes to the footer in certain components only. This allowed me to have different styling for the footer on different pages while still have overall styles that keep the footer layout the same on all page.

```
let footer = document.querySelector(".footer");
if (footer) {
footer.classList.remove("footer-position");
}
```
