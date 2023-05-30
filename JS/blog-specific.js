const blogSpecificContainer = document.querySelector(".blog-specific");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const slug = params.get("slug");

if (!slug) {
  blogSpecificContainer.innerHTML = "No slug found in URL";
} else {
  const url = "https://exam1.beatiz.com/wp-json/wl/v1/blogs/" + slug;

  async function fetchBlogSpecificPost() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      document.title = data.title;
      blogSpecificContainer.innerHTML = "";
      const blogSpecific = document.createElement("div");
      blogSpecific.classList.add("blog-specific");

      const cardImage = data.featured_image && data.featured_image.large ? `<img class="card-image" src="${data.featured_image.large}" />` : '';

      const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = new Date(data.date).toLocaleDateString('en-US', dateOptions);

      blogSpecific.innerHTML = `
        <div class="card-title">
          <h1>${data.title}</h1>
        </div>
        <div class="big-image">
          ${cardImage}
        </div>
        <div class="card-ingredients">
          <h2>Ingredients</h2>
          <p>${data.ingredients}</p>
        </div>
        <div class="card-instructions">
          <h2>Instructions</h2>
          <p>${data.instructions}</p>
        </div>
        <div class="card-description">
          <h2>Facts</h2>
          <p>${data.content}</p>
        </div>
        <div class="card-info">
          <p>${formattedDate} | by ${data.author}</p>
        </div>
      `;
      blogSpecificContainer.appendChild(blogSpecific);

      blogSpecificContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("card-image")) {
          const modal = document.createElement("div");
          modal.classList.add("modal");

          const modalImage = document.createElement("img");
          modalImage.classList.add("modal-image");
          modalImage.src = event.target.src;

          modal.appendChild(modalImage);

          modal.addEventListener("click", function (event) {
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
