const url = "https://exam1.beatiz.com/wp-json/wl/v1/blogs";

const blogPostsContainer = document.querySelector(".blog-posts");
const loadMoreButton = document.querySelector(".load-more");
const searchInput = document.querySelector("#search-input");
const searchClearButton = document.querySelector("#search-clear-button");

let page = 1;
const initialPerPage = 10; 
const perPage = 4; 
let existingPosts = [];
let searchKeyword = "";

async function getBlogs() {
  try {
    const response = await fetch(
      `${url}?page=${page}&per_page=${page === 1 ? initialPerPage : perPage}`
    );
    const data = await response.json();

    if (data.length === 0) {
      loadMoreButton.style.display = "none";
      return;
    }

    let filteredData = data;

    if (searchKeyword.trim() !== "") {
      filteredData = data.filter((post) =>
        post.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    filteredData.forEach((post, index) => {
      const { id, title, featured_image, date, author, slug } = post;
      const d = new Date(date).toLocaleDateString("en-EU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      if (page === 1 && index >= initialPerPage) {
        return;
      }

      if (!existingPosts.includes(id)) {
        existingPosts.push(id);

        const blogPost = document.createElement("div");
        blogPost.classList.add("blog-post");
        blogPost.innerHTML = `
          <a href="/blog-specific.html?slug=${slug}">
            <div class="post-card">
              <img class="card-image" src="${featured_image.large}" />
              <h2 class="card-title">${title}</h2>
              <p class="card-published">Published: ${d} </p>
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
  page = 1;
  existingPosts = [];
  blogPostsContainer.innerHTML = "";
  searchKeyword = searchInput.value.trim();
  getBlogs();
}

function clearSearch() {
  searchInput.value = "";
  searchKeyword = "";
  page = 1;
  existingPosts = [];
  blogPostsContainer.innerHTML = "";
  getBlogs();
  searchClearButton.style.display = "none";
}

loadMoreButton.addEventListener("click", loadMore);
searchInput.addEventListener("input", function () {
  searchClearButton.style.display = searchInput.value.trim() ? "block" : "none";
});
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPosts();
  }
});
searchClearButton.addEventListener("click", clearSearch);


getBlogs();
