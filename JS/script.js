const url = "https://exam1.beatiz.com/wp-json/wc/store/products";

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
    const { id, name, images, meta_data } = post;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <a href="blog-specific.html?id=${id}">
        <div class="post-card">
          <img class="card-image" src="${images[0].src}" />
          <h2 class="card-title">${name}</h2>
        </div>
      </a>
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
