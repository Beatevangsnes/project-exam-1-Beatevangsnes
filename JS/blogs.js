const url = "https://exam1.beatiz.com/wp-json/wc/store/products";

const blogPostsContainer = document.querySelector(".blog-posts");
const loadMoreButton = document.querySelector(".load-more");
const searchInput = document.querySelector("#search-input");
const resetButton = document.querySelector("#reset-button");

let page = 1;
const perPage = 10;
let existingPosts = []; 

async function getBlogs(searchQuery = "") {
  try {
    const response = await fetch(`${url}?page=${page}&per_page=${perPage}&search=${searchQuery}`);
    const data = await response.json();

    if (data.length === 0) {
      loadMoreButton.style.display = "none";
      return;
    }

    data.forEach((post) => {
      const { id, name, images } = post;
      
      
      if (!existingPosts.includes(id)) {
        existingPosts.push(id); 
        
        const blogPost = document.createElement("div");
        blogPost.classList.add("blog-post");
        blogPost.innerHTML = `
          <a href="blog-specific.html?id=${id}">
            <div class="post-card">
              <img class="card-image" src="${images[0].src}" />
              <h2 class="card-title">${name}</h2>
              <p class="card-published">Published: </p>
            </div>
          </a>
        `;
        blogPostsContainer.appendChild(blogPost);
      }
    });

    page++;
  } catch (error) {
    console.error(error);
  }
}

function loadMore() {
  getBlogs();
}

function searchPosts() {
  const searchQuery = searchInput.value.trim();
  blogPostsContainer.innerHTML = "";
  page = 1;
  loadMoreButton.style.display = "block";
  existingPosts = []; 
  getBlogs(searchQuery);
  resetButton.style.display = searchQuery === "" ? "none" : "block"; 
}

function handleSearch(event) {
  const searchQuery = searchInput.value.trim();
  if (event.key === "Enter") {
    searchPosts();
  } else if (event.key === "Backspace" && searchQuery === "") {
    resetSearch();
  } else {
    blogPostsContainer.innerHTML = "";
    page = 1;
    loadMoreButton.style.display = "block";
    existingPosts = []; 
    getBlogs(searchQuery);
    resetButton.style.display = "none"; 
  }
}

function resetSearch() {
  searchInput.value = "";
  blogPostsContainer.innerHTML = "";
  page = 1;
  loadMoreButton.style.display = "block";
  existingPosts = []; 
  getBlogs();
  resetButton.style.display = "none"; 
}

function checkReferrer() {
  const referrer = document.referrer;
  resetButton.style.display = referrer.includes("blogs.html") ? "block" : "none";
}

loadMoreButton.addEventListener("click", loadMore);
searchInput.addEventListener("keydown", handleSearch);
resetButton.addEventListener("click", resetSearch);


getBlogs();
checkReferrer();
