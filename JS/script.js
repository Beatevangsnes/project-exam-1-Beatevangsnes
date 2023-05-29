const url = "https://exam1.beatiz.com/wp-json/wl/v1/blogs";

const latestPostsContainer = document.querySelector(".latest-posts");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;
let posts = [];

async function getPosts() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    posts = Object.values(data);

    showPosts();
  } catch (error) {
    console.error(error);
  }
}

function showPosts() {
  latestPostsContainer.innerHTML = "";

  const startIndex = currentIndex * 4;
  const endIndex = startIndex + 4;
  const currentPosts = posts.slice(startIndex, endIndex);

  currentPosts.forEach((post, index) => {
    const { id, slug, title, featured_image, date, author } = post;
    const d = new Date(date).toLocaleDateString("en-EU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class="latest-post-card">
    <a href="/html/blog-specific.html?slug=${slug}">
    <div class="post-card">
      <img class="card-image" src="${featured_image.large}" />
      <h2 class="card-title">${title}</h2>
      <p class="card-published">${d}</p>
    </div>
  </a>
    </div>
      
    `;
    latestPostsContainer.appendChild(card);
  });
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showPosts();
  }
});

nextBtn.addEventListener("click", () => {
  const maxIndex = Math.ceil(posts.length / 4) - 1;
  if (currentIndex < maxIndex) {
    currentIndex++;
    showPosts();
  }
});

getPosts();
