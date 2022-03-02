const errorMessage = document.getElementById("error");
errorMessage.style.display = "none";

const loadData = () => {
  const inputField = document.getElementById("input-field");
  const inputText = inputField.value;
  //   clear data
  inputField.value = "";
  if (inputText == "") {
    errorMessage.style.display = "block";
    return;
  }

  const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length == 0) {
        errorMessage.style.display = "block";
      } else if (data.data.length > 20) {
        const first20Data = data.data.slice(0, 20);
        displayResults(first20Data);
      } else {
        displayResults(data.data);
      }
    })
    .catch((error) => {
      errorMessage.style.display = "block";
      console.log(error);
    });
};

const displayResults = (phones) => {
  errorMessage.style.display = "none";

  const searchResult = document.getElementById("results");
  searchResult.innerHTML = "";
  for (const phone of phones) {
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.classList.add("col-sm-12");
    div.innerHTML = `
          <div class="card ">
              <img src="${phone.image}" class="card-img-top" />
              <div class="card-body">
                  <h3 class="card-title">${phone.phone_name}</h3>
                  <h5 class="card-title">${phone.brand}</h5>
                  <button onclick="loadphoneDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
              </div>
          </div>
          
      `;
    searchResult.appendChild(div);
  }
};

const loadphoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayphoneDetail(data.data));
};

const displayphoneDetail = (phone) => {
  const phoneDetails = document.getElementById("details");
  phoneDetails.innerHTML = "";

  const div = document.createElement("div");
  div.innerHTML = `
  <img src="${phone.image}" class="card-img-top" />
  <div class="card-body my-2">
    <h3 class="card-title">Name: ${phone.name}</h3>
    <h5 class="card-title">Brand: ${phone.brand}</h5>

    <h2>Main Features</h2>
    <ul>
      <li>displaySize: ${phone.mainFeatures.displaySize}</li>
      <li>chipSet: ${phone.mainFeatures.chipSet}</li>
      <li>storage: ${phone.mainFeatures.storage}</li>
      <li>memory: ${phone.mainFeatures.memory}</li>
    </ul>  
    
    <h2>Others</h2>
    <ul>
      <li>WLAN: ${phone.others.WLAN ? phone.others.WLAN : "No"}</li>
      <li>Bluetooth: ${
        phone.others.Bluetooth ? phone.others.Bluetooth : "No"
      }</li>
      <li>GPS: ${phone.others.GPS ? phone.others.GPS : "No"}</li>
      <li>Radio: ${phone.others.Radio ? phone.others.Radio : "No"}</li>
      <li>NFC: ${phone.others.NFC ? phone.others.NFC : "No"}</li>
      <li>USB: ${phone.others.USB ? phone.others.USB : "No"}</li>
      </ul>   
    
    <h2>Sensors</h2>
    <p class="ms-3"> ${
      phone.mainFeatures.sensors ? phone.mainFeatures.sensors : "Nothing found"
    } </p>
    <br/>
    <h4>Release date: ${
      phone.releaseDate ? phone.releaseDate : "No date found"
    }</h4>
  </div>
    `;
  phoneDetails.appendChild(div);
};
