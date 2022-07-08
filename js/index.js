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



const firstElm = document.querySelector('.tablinks');
const otherElm = document.querySelector('.menu-btn');
firstElm.addEventListener('mouseover', (e) => {
  otherElm.style.outline = "3px solid red"
  firstElm.style.outline = "3px solid red"
})
otherElm.addEventListener('mouseover', (e) => {
  firstElm.style.outline = "3px solid red"
  otherElm.style.outline = "3px solid red"
})
firstElm.addEventListener('mouseout', (e) => {
  firstElm.style.outline = ""
  otherElm.style.outline = ""
})
otherElm.addEventListener('mouseout', (e) => {
  firstElm.style.outline = ""
  otherElm.style.outline = ""
})

firstElm.addEventListener('click', (e) => {
  otherElm.style.outline = "3px solid blue"
  firstElm.style.outline = "3px solid blue"
})
otherElm.addEventListener('click', (e) => {
  firstElm.style.outline = "3px solid blue"
  otherElm.style.outline = "3px solid blue"
})
firstElm.addEventListener('mouseout', (e) => {
  firstElm.style.outline = ""
  otherElm.style.outline = ""
})
otherElm.addEventListener('mouseout', (e) => {
  firstElm.style.outline = ""
  otherElm.style.outline = ""
})

