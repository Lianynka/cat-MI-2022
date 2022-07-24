var tabcontent = document.getElementsByClassName("tabcontent");
var container = document.querySelector(".nav-display-result");
var breedsContainer = document.querySelector(".breeds-display");
var votingImg = document.querySelector(".voting-img");
var searchResult = document.getElementsByClassName("search-result");

(async () => {
  var breeds = await (
    await fetch("https://api.thecatapi.com/v1/breeds")
  ).json();
  var breedSelect = document.getElementById("breedSelect");
  breedSelect.options.length = 0;
  //placing breeds in drop down menu
  breeds.map((breed) => {
    breedSelect.options[breedSelect.options.length] = new Option(
      breed.name,
      breed.id
    );
  });

  //get random picture from breeds list
  function getRandomImg() {
    var breedsRand = Math.floor(Math.random() * breeds.length - 1);
    var randBreed = breeds[breedsRand];
    var newRand = new Image();
    newRand.src = randBreed.image.url;
    votingImg.appendChild(newRand);
    imgId = randBreed.image.id;
    return imgId;
  }

  getRandomImg();

  window.like = async () => {
    votingImg.innerHTML = "";
    getRandomImg();
    // imgId = randBreed.image.id;

    var likeRequest = await fetch("https://api.thecatapi.com/v1/votes", {
      method: "POST",
      headers: {
        "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_id: imgId, value: 1 }),
    });

    var likeResponse = await likeRequest.json();
    console.log(likeResponse);
  };
  window.dislike = async () => {
    votingImg.innerHTML = "";
    getRandomImg();
    // imgId = randBreed.image.id;

    var dislikeRequest = await fetch("https://api.thecatapi.com/v1/votes", {
      method: "POST",
      headers: {
        "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_id: imgId, value: 0 }),
    });

    var dislikeResponse = await dislikeRequest.json();
    console.log(dislikeResponse);
  };
})();
// search for breeds by name
async function search() {
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    container.innerHTML = "";
  }
  var input = document.getElementsByClassName("search-input");
  var inputValue = input[0].value;
  var params = new URLSearchParams();
  params.set("q", inputValue);
  var searchParams = await (
    await fetch("https://api.thecatapi.com/v1/breeds/search?" + params, {
      headers: {
        "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
      },
    })
  ).json();
  searchParams.map(async (result) => {
    var search_id = result.id;
    var limitValue = 25;
    var params = new URLSearchParams();
    params.set("limit", limitValue);
    params.set("breed_id", search_id);
    var search_image = await (
      await fetch("https://api.thecatapi.com/v1/images/search?" + params, {
        headers: {
          "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
        },
      })
    ).json();

    search_image.map((image) => {
      var imgCotainer = document.createElement("div");
      var newImg = new Image();
      newImg.src = image.url;
      imgCotainer.className = "tooltip";
      imgCotainer.appendChild(newImg);
      //   searchResult[0].appendChild(newImg);
      container.appendChild(imgCotainer);
    });
  });
}

(async () => {
  var limit = document.getElementById("limitBreeds");
  var limitBreeds = limit.value;
  var breed = document.getElementById("allBreeds");
  var allBreeds = breed.value;

  var params = new URLSearchParams();
  params.set("limit", limitBreeds);
  if (allBreeds !== "0") {
    params.set("breed_id", allBreeds);
  }

  var searchParams = await (
    await fetch("https://api.thecatapi.com/v1/images/search?" + params, {
      headers: {
        "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
      },
    })
  ).json();

  var breeds = await (
    await fetch("https://api.thecatapi.com/v1/breeds")
  ).json();
  var breedSelect = document.getElementById("allBreeds");
  breedSelect.options.length = 0;
  breedSelect.options.add(new Option("All Breeds"));
  breeds.map((breed) => {
    breedSelect.options[breedSelect.options.length] = new Option(
      breed.name,
      breed.id
    );
  });
  searchParams.map((result) => {
    var imgCotainer = document.createElement("div");
    imgCotainer.className = "tooltip";
    var newImg = new Image();
    newImg.src = result.url;
    newImg.onclick = async () => {
      var imageId = result.id;
      await (
        await fetch("https://api.thecatapi.com/v1/favourites", {
          method: "POST",
          headers: {
            "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image_id: imageId }),
        })
      ).json();
    };
    imgCotainer.appendChild(newImg);
    var tooltip = document.createElement("span");
    tooltip.className = "tooltiptext";
    // tooltip.innerHTML = result.breeds[0].name;
    imgCotainer.appendChild(tooltip);
    container.appendChild(imgCotainer);
  });
})();

async function updateBreeds() {
  container.innerHTML = "";
  var limit = document.getElementById("limitBreeds");
  var limitBreeds = limit.value;
  var breed = document.getElementById("allBreeds");
  var allBreeds = breed.value;
  var params = new URLSearchParams();
  params.set("limit", limitBreeds);
  if (allBreeds !== "0") {
    params.set("breed_id", allBreeds);
  }

  var searchParams = await (
    await fetch("https://api.thecatapi.com/v1/images/search?" + params, {
      headers: {
        "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
      },
    })
  ).json();

  searchParams.map((result) => {
    var imgCotainer = document.createElement("div");
    imgCotainer.className = "tooltip";
    var newImg = new Image();
    newImg.src = result.url;
    newImg.onclick = async () => {
      var imageId = result.id;
      await (
        await fetch("https://api.thecatapi.com/v1/favourites", {
          method: "POST",
          headers: {
            "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image_id: imageId }),
        })
      ).json();
    };
    imgCotainer.appendChild(newImg);
    var tooltip = document.createElement("span");
    tooltip.className = "tooltiptext";
    // tooltip.innerHTML = result.breeds[0].name;
    imgCotainer.appendChild(tooltip);
    container.appendChild(imgCotainer);
  });
}
