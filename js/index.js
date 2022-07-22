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
var x = window.matchMedia("(max-width: 768px)");
function mediaSize(x) {
  if (x.matches) {
    function openTab(evt, tabName) {
      var i, tablinks;
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      navigation[0].style.display = "block";
      menu.style.display = "none";
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " active";
    }
    function humberger() {
      // document.querySelector(".container").style.display = "none";
      var menuOPt = document.getElementById("menu-options");
      menuOPt.style.display = "block";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    return humberger();
  }
}
mediaSize(x);

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

//get a random picture for voting tab
// (async () => {
//   var randomPic = function getRandomPic() {
//     return Math.floor(Math.random());
//   };
//   var voting = await (
//     await fetch("https://api.thecatapi.com/v1/images/" + randomPic, {
//       headers: {
//         "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
//       },
//     })
//   ).json();

//clck on voting go to the voting page
// get the random mnumber however big the list is
// take the number  - cat list [] this cat you want to work with

//   randomPic.map((ranPic) => {
//     var imgCotainer = document.createElement("div");
//     imgCotainer.className = "pic";
//     var newFav = new Image();
//     newFav.src = resultFav.image.url;
//     imgCotainer.appendChild(heart);
//     imgCotainer.appendChild(newFav);
//     container.appendChild(imgCotainer);
//   });
// })();
//save the list of breeds
//select the breeds when you vote
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
    // var tooltip = document.createElement("span");
    // tooltip.className = "tooltiptext";
    // tooltip.innerHTML = result.breeds[0].name;
    // imgCotainer.appendChild(tooltip);
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

//sorting the drop down menu
// function sortUp() {
//   var sort = (function (nl) {
//     var a = [];
//     for (var i = 0, len = nl.length; i < len; i++) a.push(nl.item(i));
//     return a;
//   })(sel.options);
//   // sort OPTIONs Array
//   ary.sort(function (a, b) {
//     // sort by "value"? (numeric comparison)
//     // NOTE: please remember what ".value" means for OPTION objects
//     return a.value - b.value;
//     // or by "label"? (lexicographic comparison) - case sensitive
//     //return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
//     // or by "label"? (lexicographic comparison) - case insensitive
//     //var aText = a.text.toLowerCase();
//     //var bText = b.text.toLowerCase();
//     //return aText < bText ? -1 : aText > bText ? 1 : 0;
//   });
//   // remove all OPTIONs from SELECT (don't worry, the original
//   // OPTION objects are still referenced in "ary") ;-)
//   for (var i = 0, len = ary.length; i < len; i++) sel.remove(ary[i].index);
//   // (re)add re-ordered OPTIONs to SELECT
//   for (var i = 0, len = ary.length; i < len; i++) sel.add(ary[i], null);
// }
// function sortDown() {}

function sortMenuZ() {
  var sortOut = (function (opt) {
    var list = [];
    for (var i = 0, len = opt.length; i < len; i++) list.push(opt.item(i));
    return list;
  })(dropDownMenu.options);
  sortOut.sort(function (a, b) {
    return b.value - a.value;
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
  sortOut.sort(function (a, b) {
    return a.value - b.value;
  });
  for (var i = 0, len = sortOut.length; i < len; i++)
    dropDownMenu.remove(sortOut[i].index);
  for (var i = 0, len = sortOut.length; i < len; i++)
    dropDownMenu.add(sortOut[i], null);
}
