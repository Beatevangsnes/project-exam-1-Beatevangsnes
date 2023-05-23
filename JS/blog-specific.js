const blogSpecificContainer = document.querySelector(".blog-specific");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  blogSpecificContainer.innerHTML = "No product ID found in URL";
} else {
  const url = "https://exam1.beatiz.com/wp-json/wc/store/products/" + id;

  async function fetchBlogSpecificPost() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      blogSpecificContainer.innerHTML = "";
      const blogSpecific = document.createElement("div");
      blogSpecific.classList.add("blog-specific");
      blogSpecific.innerHTML = `
        <div class="card-title">
          <h1>${data.name}</h1>
        </div>
        <div class="big-image">
        <img class="card-image" src="${data.images[0].src}" />
        </div>
        <div class="card-ingredients">
          <h2>Ingredients</h2>
        </div>
        <div class="card-instructions">
          <h2>Instructions</h2>
          <p>${data.short_description}</p>
        </div>
        <div class="card-description">
          <h2>Facts</h2>
          <p>${data.description}</p>
        </div>
      `;
      blogSpecificContainer.appendChild(blogSpecific);

      blogSpecificContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("card-image")) {
          const modal = document.createElement("div");
          modal.classList.add("modal");

          const modalImage = document.createElement("img");
          modalImage.classList.add("modal-image");
          modalImage.src = event.target.src;

          modal.appendChild(modalImage);

          modal.addEventListener("click", function(event) {
            if (event.target === modal) {
              modal.remove();
            }
          });

          document.body.appendChild(modal);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  fetchBlogSpecificPost();
}


