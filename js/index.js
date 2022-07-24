var tabcontent = document.getElementsByClassName("tabcontent");
var mainPic = document.getElementsByClassName("mainPic");
var navigation = document.getElementsByClassName("navigation");
var container = document.querySelector(".nav-display-result");
var breedsContainer = document.querySelector(".breeds-display");
var menu = document.querySelector(".menu");
var dropDownMenu = document.getElementById("allBreeds");
//changing tab in navigation container
function openTab(evt, tabName) {
  var i, tablinks;
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  mainPic[0].style.display = "none";
  navigation[0].style.display = "block";
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// responsive menu

//fetch for gallery tab
(async () => {
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
    // tooltip.innerHTML = "<img src='../img/icons/heart.svg'>";
    imgCotainer.appendChild(tooltip);
    container.appendChild(imgCotainer);
  });
})();

async function getBreeds() {
  container.innerHTML = "";
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
    container.appendChild(imgCotainer);
  });
}

async function getFavourites() {
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    container.innerHTML = "";
  }
  // var resultFavourites = document.querySelector(
  //   ".nav-display-result-favourites"
  // );
  //fetch for adding pics to the Favourities list
  var favouritePics = await (
    await fetch("https://api.thecatapi.com/v1/favourites", {
      headers: { "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66" },
    })
  ).json();
  favouritePics.map((resultFav) => {
    var imgCotainer = document.createElement("div");
    var heart = document.createElement("span");
    heart.className = "heart-btn";
    imgCotainer.className = "tooltip";
    var newFav = new Image();
    newFav.src = resultFav.image.url;
    imgCotainer.appendChild(heart);
    imgCotainer.appendChild(newFav);
    container.appendChild(imgCotainer);
    newFav.onclick = async () => {
      await (
        await fetch("https://api.thecatapi.com/v1/favourites/" + resultFav.id, {
          method: "DELETE",
          headers: {
            "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
          },
        })
      ).json();
      imgCotainer.removeChild(newFav);
    };
  });
}

// function sortDown() {}

function sortMenuZ() {
  var sortOut = (function (opt) {
    var list = [];
    for (var i = 0, len = opt.length; i < len; i++) list.push(opt.item(i));
    return list;
  })(dropDownMenu.options);
  sortOut = sortOut.sort(function (a, b) {
    var aVal = a.value.toLowerCase();
    var bVal = b.value.toLowerCase();

    if (aVal > bVal) {
      return 1;
    }
    if (aVal < bVal) {
      return -1;
    }

    return 0;
  });
  for (var i = 0, len = sortOut.length; i < len; i++)
    dropDownMenu.remove(sortOut[i].index);
  for (var i = 0, len = sortOut.length; i < len; i++)
    dropDownMenu.add(sortOut[i], null);
}
function sortMenuA() {
  var sortOut = (function (opt) {
    var list = [];
    for (var i = 0, len = opt.length; i < len; i++) list.push(opt.item(i));
    return list;
  })(dropDownMenu.options);
  // sorting options Array
  sortOut = sortOut.sort(function (a, b) {
    var aVal = a.value.toLowerCase();
    var bVal = b.value.toLowerCase();

    if (aVal < bVal) {
      return 1;
    }
    if (aVal > bVal) {
      return -1;
    }

    return 0;
  });
  for (var i = 0, len = sortOut.length; i < len; i++)
    dropDownMenu.remove(sortOut[i].index);
  for (var i = 0, len = sortOut.length; i < len; i++)
    dropDownMenu.add(sortOut[i], null);
}
