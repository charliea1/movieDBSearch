// API key: 1528b7b943f83c1d57707a85d7c18b14
// read access token: eyJhbGciOiJIUzI1NiJ9.ey
// JhdWQiOiIxNTI4YjdiOTQzZjgzYzFkNTc3MDdhODVkN2M
// xOGIxNCIsInN1YiI6IjVlZTAxZmQ4ZjM2YTMyMDAxZjhl
// MjBmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9
// uIjoxfQ.kuSs5PbrQ4K7ELakfkWa2A9TJgxywtwUaBY0oR-_Jc4


//sample link: https://api.themoviedb.org/3/movie/76341?api_key=<<1528b7b943f83c1d57707a85d7c18b14>>
//search movie: https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
//query movie details: https://api.themoviedb.org/3/movie/343611?api_key={api_key}&append_to_response=videos




// when page loads, show movies currently in theaters
//show message if no results are found

ajax("https://api.themoviedb.org/3/movie/now_playing?api_key=1528b7b943f83c1d57707a85d7c18b14&language=en-US&page=1&region=US");
document.querySelector("#num_results").style.display="none";
document.querySelector("#error_results").style.display="none";


function ajax(endptParam) {
    //AJAX call with JS
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", endptParam );
    httpRequest.send();
    //handle server response event:
    httpRequest.onreadystatechange = function() {
        //this code will run on a response from server
        //request is ready on state 4
        console.log(httpRequest.readyState);
        if( httpRequest.readyState == 4){
            //http code 200 means success
            if(httpRequest.status == 200){
                displayResults(httpRequest.responseText);
            }
            else{
                //display error message if something went wrong
                alert("AJAX error");
            }
        }	
    }
}


//function to display results from API response in this page
function displayResults(responseParam){


    //first remove previously added table info
    document.querySelector("#results").innerHTML = "";

    //convert this JSON string into JS objects
    //in order to access individual info from search results
    let output = JSON.parse(responseParam);
    console.log(output);
    // if no results, display error message
    if(output.results.length == 0){
        document.querySelector("#error_results").style.display="inline";
        document.querySelector("#num_results").style.display="none";

        return;
    }
    document.querySelector("#error_results").style.display="inline";


    document.querySelector("#error_results").style.display="none";
    document.querySelector("#default_results").style.display="none";
    document.querySelector("#num_results").style.display="inline";

    var result_num;
    if(output.results.length > 20){
        result_num = 20;
    }
    else{
        result_num = output.results.length;
    }

    document.querySelector("#num-results").innerHTML = result_num;
    document.querySelector("#max-results").innerHTML = output.total_results;
    
    

    //add div sections with results
    for(let i=0;i<result_num;i++){

        let element = document.createElement("div");
        element.classList.add("col");
        
        let overlay = document.createElement("div");
        overlay.classList.add("img-overlay");
        overlay.innerHTML="Rating: " + output.results[i].vote_average + "; " + "Votes: " + output.results[i].vote_count + "; Synopsis: " + output.results[i].overview;
        let img_element=document.createElement("img");
        

        let info_element = document.createElement("p");
        info_element.innerHTML = output.results[i].original_title + ", " + output.results[i].release_date;
        info_element.style.color="white";
        info_element.style.fontSize="small";

        img_element.src = "http://image.tmdb.org/t/p/w500/" + output.results[i].poster_path;
        img_element.alt = output.results[i].original_title;
        img_element.classList.add("movie-img");



        element.appendChild(img_element);
        element.appendChild(overlay);
        element.appendChild(info_element);
        document.querySelector("#results").appendChild(element);
        overlay.style.display="none";
        overlay.onmouseenter = function(){
            this.style.display="inline";
        }
    }
    
    
}

document.querySelector("form").onsubmit = function(event) {
    event.preventDefault();
    document.querySelector("#error_results").style.display="none";
    document.querySelector("#default_results").style.display="none";
    let input = document.querySelector("#search-id").value;
    let endpt = "https://api.themoviedb.org/3/search/movie?api_key=1528b7b943f83c1d57707a85d7c18b14&query=" + input + "&page=1";
    ajax(endpt);
}

let box = document.querySelector("#results .col img");
box.onmouseover = function(){
    console.log("over");
}


/*
document.querySelector("img").addEventListener("mouseover", function(event){
    event.target.style.opacity = "0.5";
});

/*
document.querySelector("#results .col").onmouseenter = function(){
    document.querySelector("#results .col img").style.opacity = "0.5";
    console.log("hoverz!");
}*/