async function dislike() {
  votingImg.innerHTML = "";
  getRandomImg();
  var dislikeRequest = await (
    await fetch("https://api.thecatapi.com/v1/votes", {
      method: "POST",
      headers: {
        "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_id: imgId, value: 0 }),
    })
  ).json();
  console.log(dislikeRequest);
}
dislike();

async function getlike() {
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    container.innerHTML = "";
  }
  var likedImg = await (
    await fetch("https://api.thecatapi.com/v1/votes", {
      headers: { "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66" },
    })
  ).json();
  var likes = likedImg.filter((item) => item.value === 1);
  console.log(likes);
  likes.map(async (resultFav) => {
    var imgCotainer = document.createElement("div");
    imgCotainer.className = "tooltip";
    var newFav = new Image();
    var get_pic = await (
      await fetch("https://api.thecatapi.com/v1/images/" + resultFav.image_id, {
        headers: { "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66" },
      })
    ).json();
    newFav.src = get_pic.url;
    imgCotainer.appendChild(newFav);
    container.appendChild(imgCotainer);
  });
}
async function getdislike() {
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    container.innerHTML = "";
  }
  var likedImg = await (
    await fetch("https://api.thecatapi.com/v1/votes", {
      headers: { "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66" },
    })
  ).json();
  var likes = likedImg.filter((item) => item.value === 0);
  console.log(likes);
  likes.map(async (resultFav) => {
    var imgCotainer = document.createElement("div");
    imgCotainer.className = "tooltip";
    var newFav = new Image();
    var get_pic = await (
      await fetch("https://api.thecatapi.com/v1/images/" + resultFav.image_id, {
        headers: { "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66" },
      })
    ).json();
    newFav.src = get_pic.url;
    imgCotainer.appendChild(newFav);
    container.appendChild(imgCotainer);
  });
}
