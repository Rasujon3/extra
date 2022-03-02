const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  searchField.value = "";
  if (searchText == "") {
    document.getElementById("error-message").style.display = "block";
  } else {
    //load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((dat) => displaySearchResult(dat.data));
    document.getElementById("error-message").style.display = "none";
  }
};

//display search result
const displaySearchResult = (phones) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  if (!phones) {
    document.getElementById("error-message").style.display = "block";
  }
  let i = 0;
  phones?.forEach((phone) => {
    i++;
    if (i > 20) {
      return;
    }
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card border border-white rounded">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">Brand: ${phone.brand}</h5>
                <p class="card-text">Model: ${phone.phone_name}</p>
                <a href="#" onclick="loadPhoneDetails('${phone.slug}')" class ="btn btn-primary">Show Details</a>
             </div>
         </div>
        `;
    searchResult.appendChild(div);
  });
};
//load single phone
const loadPhoneDetails = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((dat) => displayPhoneDetails(dat.data));
};
//display single phone
const displayPhoneDetails = (phone) => {
  // console.log(phone);
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.classList.add("col-sm-12");
  div.innerHTML = `
        <div class="card border border-white rounded">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">Brand: ${phone.brand}</h5>
                <p class="card-text">Release Date: ${phone.releaseDate}</p>
                <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
                <p class="card-text">Display Size: ${phone.mainFeatures.displaySize}</p>
                <p class="card-text">Chipset: ${phone.mainFeatures.chipSet}</p>
                <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
                <p class="card-text">Main Sensor: ${phone.mainFeatures.sensors[0]}</p>
                <p class="card-text">WLAN: ${phone.others.WLAN}</p>
                <p class="card-text">Bluetooth: ${phone.others.Bluetooth}</p>
                <p class="card-text">GPS: ${phone.others.GPS}</p>
                <p class="card-text">NFC: ${phone.others.NFC}</p>
                <p class="card-text">Radio: ${phone.others.Radio}</p>
                <p class="card-text">USB: ${phone.others.USB}</p>
            </div>
        </div>
    `;
  phoneDetails.appendChild(div);
};
