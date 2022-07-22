var image_input = document.querySelector("#image-input");
var upload_btn = document.querySelector(".upload-btn");
var nofile_selected = document.querySelector(".nofile-selected");
var message = document.querySelector(".upload-message");
var image_container = document.querySelector("#display-image");
const drag_area = document.querySelector(".drap-area");

//open upload menu
function openUpload() {
  var openUploadP = document.getElementById("nav-display-upload");
  openUploadP.style.display = "block";
  //   document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
//close upload menu
function closeUpload() {
  document.getElementById("nav-display-upload").style.display = "none";
}

//upload a pic to server
async function uploadPic() {
  var data = new FormData();
  data.append("file", image_input.files[0]);

  var possibleCat = await (
    await fetch("https://api.thecatapi.com/v1/images/upload", {
      method: "POST",
      body: data,
      headers: {
        "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66",
      },
    })
  ).json();

  if (possibleCat.approved) {
    // image_input.style.backgroundImage = "none";
    upload_btn.style.display = "none";
    nofile_selected.innerHTML = "No file seleced";
    message.innerHTML = "Thanks for the Upload - Cat found!";
    // document.querySelector("#display-image").style.backgroundImage = null;
  } else {
    document.querySelector(".drag-area").style.backgroundColor = "#FBE0DC";
    upload_btn.style.display = "none";
    message.innerHTML = "No Cat found - try a different one";
  }
}
//upload an img on the page

image_input.addEventListener("change", function () {
  //   drag_area.backgroundImage = "none";
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    image_container.style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

document.querySelectorAll(".drag-zone-input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest("#display-image");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {});
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drag-area-text")) {
    dropZoneElement.querySelector(".drag-area-text").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}
