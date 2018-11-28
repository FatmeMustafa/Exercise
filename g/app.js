
/**************CREATE <DIV>**************/
let blogpostsContainer = document.createElement('div');
blogpostsContainer.id = 'blogpostsContainerID';
document.body.appendChild(blogpostsContainer); 

/**************FETCH POSTS***************/
fetch('https://jsonplaceholder.typicode.com/posts')    
.then(response => {
    console.log(response);                      //AJAX request data
    return response.json();                     //transform data to json
})
.then(blogposts => {                            //execute code if fetch succeeds
    console.log(blogposts);
    addRandomLikes(blogposts);
    displayBlogposts(blogposts);
})
.catch(error =>                                 //execute code if fetch fails
    console.log(error)
);

/*************FETCH COMMENTS*************/
fetch('https://jsonplaceholder.typicode.com/comments')    
.then(response => {
    return response.json();                       
})
.then(comments => {                            
    console.log(comments);
    displayComments(comments);
})
.catch(error =>                                
    console.log(error)
);

/************ADD RANDOM LIKES************/
function addRandomLikes(blogpost) {
    blogpost.forEach(like => {
        like['likes'] = Math.floor(Math.random() * 100);
    });
}

/************DISPLAY BLOGPOSTS***********/
function displayBlogposts(blogpost) {
    let displayBlogpost = blogpost.map(blog =>
        `<div id="blogposts">
            <h3>${blog.title}</h3>
            <p>${blog.body}</p>
            <span>Likes: ${blog.likes}</span>
            <button class="loadComments">Load comments</button>
            <div class="loadedComments"></div>
        </div><br>`
    );
    displayBlogpost1 = displayBlogpost.join("");            //remove comma signs from arrays 
    document.getElementById('blogpostsContainerID').innerHTML = displayBlogpost1;
}

/************DISPLAY COMMENTS************/
function displayComments(comments) {
    let $loadedCommentsDIV = $('.loadedComments');
    let $loadCommentsBTN = $('.loadComments');

    for (let i = 0; i < $loadedCommentsDIV.length; i++) {   //loop through divs     
        $loadedCommentsDIV.each(function(i) {           
            let $loadedCommentsDIVid = $(this).attr('id', 'commentDiv-' + ++i);     //give each div id="commentDiv-" + number from 1-100
        });
    } 

    for (let i = 0; i < $loadCommentsBTN.length; i++) {     //loop through buttons
        $loadCommentsBTN.each(function(i) {
            let $loadCommentsBTNid = $(this).attr('id', ++i);   //give each button id="number from 1-100"   
        });

        $loadCommentsBTN[i].onclick = function() {          //execute function when button is clicked
            let selectedBTN = this.id;                      //store id value of selected button
            let findMatch = comments.filter(function(comment) {
                return comment.postId == selectedBTN;       //filter through all postId's in comment and return postId that match selectedBTN id
            });         
        
            let printingComments = findMatch.map(comment => //why cant I print directly from filter()?
                `<br>
                <b>${comment.email}:</b>
                <i> ${comment.body}</i>
                <hr>`
            );
            printingComments1 = printingComments.join("");
            document.getElementById('commentDiv-' + this.id).innerHTML = printingComments1;
        }
    }    
}