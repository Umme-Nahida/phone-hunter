// banner section added
const bannerSection = async()=>{
  const res = await fetch("https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089");
  const data = await res.json();
  const banner = data.data
  displayBannerText(banner)
}

const displayBannerText = (data)=>{
  console.log("banner content",data)
  const bannerSection = document.getElementById("banner-section");
  const div = document.createElement("div");
  div.innerHTML = `
  <div className="hero min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">${data.name}</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    <div>
      <img src=${data?.image} alt="" />
    </div>
  `

  bannerSection.appendChild(div);
}

bannerSection();
const loadData = async(search="iphone",isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}


const displayPhones = (phones,isShowAll)=>{
  console.log("phones length",phones.length,phones);
  const btn = document.getElementById("show-all");

  if(phones.length > 10 && !isShowAll){
    btn.classList.remove("hidden");
    console.log("length is so logn getter then 12")
  }
  else{
    btn.classList.add("hidden")
    console.log("mone hoy 4 ar teke chutu sog")
  }
  console.log(isShowAll,"show all");
 
 if(!isShowAll){
  phones = phones.slice(0,10);
 }
 
//  phones card container section 
  const phoneContainer = document.getElementById("phone-container");
      phoneContainer.innerHTML = "";
      phones.forEach(phone => {
      console.log(phone)
      const div = document.createElement("div");
      div.classList = "card bg-base-100 shadow-xl border p-5";
      div.innerHTML = `
      <figure ><img class ="bg-[#96baf0] rounded-sm" src=${phone.image} alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button onclick="handleShowDetails('${phone.slug}'); " class="btn btn-primary">Show details</button>
        </div>
      </div>
      `
      phoneContainer.appendChild(div);
      loaderSpinner(false);
   });
}


// search functionality
const handleSearch =(isShowAll)=>{
  loaderSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadData(searchText,isShowAll);
}
// loadData();

function loaderSpinner(isloading){
    const spinner = document.getElementById("loader");
    if(isloading){
      spinner.classList.remove("hidden")
    }else{
      spinner.classList.add("hidden");
    }
    // console.log(isloading)
}

// show spinner button
const showAllPhones =()=>{
  handleSearch(true);
  console.log("iam added here");
}

// get details by id
const handleShowDetails =async(id)=>{
 const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
 const data = await res.json();
 console.log(data)
 showPhoneDetails(data)

}
// display the phone details 
const showPhoneDetails=(phone)=>{
  my_modal_5.showModal()
  console.log(phone.data)
  const phoneDetailsContainer = document.getElementById("phone-details-container");
  phoneDetailsContainer.innerHTML = `
  <figure class="px-10 py-10 flex items-center justify-center mb-5 bg-cyan-300">
  <img src=${phone.data.image} alt="Shoes" class="rounded-xl"/>
 </figure>
 <div class="items-center text-left">
    <h2 class="text-3xl">${phone.data.name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <p><span class="font-medium">Storage: </span>${phone.data?.mainFeatures.storage}</p>
    <p><span class="font-medium">Display Size: </span>${phone.data?.mainFeatures?.displaySize}</p>
    <p><span class="font-medium">Chipset: </span>${phone.data?.mainFeatures?.chipSet}</p>
    <p><span class="font-medium">Memory: </span>${phone.data?.mainFeatures?.memory}</p>
    <p><span class="font-medium">Slug: </span>${phone.data?.slug}</p>
    <p><span class="font-medium">Release Date: </span>${phone.data?.releaseDate}</p>
    <p><span class="font-medium">Brand: </span>${phone.data?.brand}</p>
    <p><span class="font-medium">GPS: </span>${phone.data?.others?.GPS ? phone.data?.others?.GPS : "no GPS available"}</p>
    
  </div>
  `
}
loadData();
// Add event listener to the "Show All" button
// const showAllBtn = document.getElementById("show-all");
// showAllBtn.addEventListener("click", showAllPhones);