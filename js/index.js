var tabcontent = document.getElementsByClassName("tabcontent");
var mainPic = document.getElementsByClassName("mainPic");
var navigation = document.getElementsByClassName("navigation");
var container = document.querySelector(".nav-display-result");
container.innerHTML = "";

function openTab(evt, tabName) {
  var i, tablinks;
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    // mainPic[i].style.display = "block";
  }
  tablinks = document.getElementsByClassName("tablinks");
  mainPic[0].style.display = "none";
  navigation[0].style.display = "block";
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  // tabcontent.onclick = () => {
  //   document.getElementsByClassName("mainPic").style.display = "none";
  //   document.getElementsByClassName("navigation").style.display = "block";
  //   openTab();
  // };
}

(async () => {
  var breeds = await (
    await fetch("https://api.thecatapi.com/v1/breeds")
  ).json();
  var breedSelect = document.getElementById("breedSelect");
  breedSelect.options.length = 0;
  breeds.map((breed) => {
    breedSelect.options[breedSelect.options.length] = new Option(
      breed.name,
      breed.id
    );
  });
})();
(async () => {
  var limit = document.getElementById("limitBreeds");
  var limitBreeds = limit.value;
  var breed = document.getElementById("allBreeds");
  var allBreeds = breed.value;

  var params = new URLSearchParams();
  params.set("limit", limitBreeds);
  if (allBreeds) {
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

  searchParams.map((resultBreeds) => {
    var newBreeds = new Image();
    newBreeds.src = resultBreeds.image.url;
    container.appendChild(newBreeds);
  });
})();

async function getBreeds() {
  var type = document.getElementById("typeSelect");
  var typeValue = type.value;

  var order = document.getElementById("orderSelect");
  var orderValue = order.value;

  var limit = document.getElementById("limitSelect");
  var limitValue = limit.value;

  var breed = document.getElementById("breedSelect");
  var breedValue = breed.value;

  var params = new URLSearchParams();
  params.set("limit", limitValue);
  params.set("mime_types", typeValue);
  params.set("order", orderValue);

  if (breedValue) {
    params.set("breed_id", breedValue);
  }

  var searchParams = await (
    await fetch("https://api.thecatapi.com/v1/images/search?" + params, {
      headers: {
        "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
      },
    })
  ).json();
  //display the result in container
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
    tooltip.innerHTML = result.breeds[0].name;
    imgCotainer.appendChild(tooltip);
    container.appendChild(imgCotainer);
  });
}
async function getFavourites() {
  tabcontent[2].style.display = "none";
  var resultFavourites = document.querySelector(
    ".nav-display-result-favourites"
  );

  var favouritePics = await (
    await fetch("https://api.thecatapi.com/v1/favourites", {
      headers: { "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66" },
    })
  ).json();
  favouritePics.map((resultFav) => {
    var newFav = new Image();
    newFav.src = resultFav.image.url;
    resultFavourites.appendChild(newFav);
    newFav.onclick = async () => {
      await (
        await fetch("https://api.thecatapi.com/v1/favourites/" + resultFav.id, {
          method: "DELETE",
          headers: {
            "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
          },
        })
      ).json();
      resultFavourites.removeChild(newFav);
    };
  });
}
