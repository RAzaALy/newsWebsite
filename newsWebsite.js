const learnMore = document.getElementById("learnMore");
const see = document.getElementById("watch");
const main = document.getElementById("main");

let pageNo = 1;
let url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI?pageNumber=${pageNo}&pageSize=14&withThumbnails=true`;

const config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "x-rapidapi-key": "c9063559acmshf7d49bc6e683824p1fca9cjsn938e1a377dfb",
    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
  },
};

async function getNews(url) {
  const response = await fetch(url, config);
  const data = await response.json();
  // console.log('Data \n ',data)
  const value = data.value;
  // console.log('Value Of Data \n' , value)
  // console.log("Data Value Id\n " , data.value[0].id);
  showNews(value);
}
function showNews(value) {
  main.innerHTML = ``;
  value.map((item) => {
    // console.log(item);
    const { title, description, url, image } = item;
    let card = document.createElement("div");
    card.classList.add("xl:w-1/4");
    card.classList.add("md:w-1/2");
    card.classList.add("p-4");
    card.classList.add("card");
    card.innerHTML = `
    <div class="bg-gray-100 p-6 rounded-lg">
      <img
        class="h-100 rounded w-full object-cover object-center mb-6"
      
        src="${image.url}"
        alt="content"
      />
      <button class="flex mt-4 mb-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        <a href="${url}" id="watch" target="_blank">
        Watch Now
      </a>
      </button>
      <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
        ${title}
      </h2>
      <p class="leading-relaxed text-base">
       ${description}
        <a class="text-indigo-500 inline-flex items-center" id="learnMore" target="_blank" href="${url}">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
      </p>
    </div>
    `;
    main.appendChild(card);
  });
}
getNews(url);

//pagination
const anchor = document.querySelectorAll(".pagination a");
anchor.forEach((a) => {
  a.addEventListener("click", (e) => {
    removeActive();
    a.classList.add("active");
    // console.log(a.innerText);
    pageNo = +a.innerText;
    const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI?pageNumber=${pageNo}&pageSize=12&withThumbnails=true`;
    // console.log(url);
    getNews(url);
  });
});
function removeActive() {
  anchor.forEach((a) => {
    a.classList.remove("active");
  });
}
function nextPage() {
  pageNo = pageNo + 1;
  const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI?pageNumber=${pageNo}&pageSize=12&withThumbnails=true`;
  // console.log(url);
  getNews(url);
}
function prevPage() {
  if (pageNo !== 1) {
    pageNo = pageNo - 1;
    const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI?pageNumber=${pageNo}&pageSize=12&withThumbnails=true`;
    // console.log(url);
    getNews(url);
  } else {
    getNews(url);
    alert("Can not go to Back!");
  }
}

var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({
    top : 0,
    behavior : "smooth"
  })
}
