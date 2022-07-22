var tabcontent = document.getElementsByClassName("tabcontent");
var container = document.querySelector(".nav-display-result");
var breedsContainer = document.querySelector(".breeds-display");
var votingImg = document.querySelector(".voting-img");

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

  //voting for image

  //press the button
  //1 - go take the id - create a post reqest
  // don't forget t pass the value and image - id
  //if the action successfull clear the div and run a function

  //list.filter(item => item.value === 1)

  //
})();

// search for breeds by name
async function search() {
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    container.innerHTML = "";
  }
  var input = document.getElementsByClassName("search-input");
  var inputValue = input.value;
  var params = new URLSearchParams();
  params.set("q", inputValue);
  var searchParams = await (
    await fetch("https://api.thecatapi.com/v1/breeds/search" + params, {
      headers: {
        "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
      },
    })
  ).json();
  console.log(searchParams);
  //   searchParams.map((result) => {
  //     var searchResult = document.getElementsByClassName("search-result");
  //     var newImg = new Image();
  //     newImg.src = result.url;
  //     searchResult.appendChild(newImg);
  //   });
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
    breedsContainer.appendChild(imgCotainer);
  });
})();
