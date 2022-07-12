function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(
        " active",
        ""
      );
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
 
(async () => {
  var breeds = await (await fetch('https://api.thecatapi.com/v1/breeds')).json();
  var breedSelect = document.getElementById('breedSelect');
  breedSelect.options.length = 0;
  breeds.map(breed => {
    breedSelect.options[breedSelect.options.length] = new Option(breed.name, breed.id);
  }); 
})();

async function getBreeds() {
  


  var container = document.querySelector('.nav-display-result');

  var type = document.getElementById('typeSelect')
  var typeValue = type.value

  var order = document.getElementById('orderSelect')
  var orderValue = order.value

  var limit = document.getElementById('limitSelect')
  var limitValue = limit.value

  var breed = document.getElementById('breedSelect')
  var breedValue = breed.value

  var container = document.querySelector('.nav-display-result');

  var params = new URLSearchParams();
  params.set('limit', limitValue);
  params.set('mime_types', typeValue);
  params.set('order', orderValue);
  params.set('breed_id', breedValue);
  
  var searchParams = await(await fetch('https://api.thecatapi.com/v1/images/search?' + params, {
  headers: {
    "x-api-key": "27958382-a5cb-4854-86b7-fc4cf6850b66"
  }})).json();
//display the result in container
searchParams.map(result => {
  var newImg = new Image();
  newImg.src = result.url;
  container.appendChild(newImg);
})    
}