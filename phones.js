// function loadData (){
//     // fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
//     // .then(res => res.json())
//     // .then(data => console.log(data.data))

// }

const loadData = async(search="iphone",isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}


const displayPhones = (phones,isShowAll)=>{
  console.log("phones length",phones.length);
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

const showPhoneDetails=(phone)=>{
  my_modal_5.showModal()
  console.log(phone.data)
  const phoneDetailsContainer = document.getElementById("phone-details-container");
  phoneDetailsContainer.innerHTML = `
  <figure class="px-10 pt-10 mx-auto text-center">
  <img src=${phone.data.image} alt="Shoes" class="rounded-xl" />
 </figure>
 <div class="items-center text-center">
    <h2 class="text-3xl">${phone.data.name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    
  </div>
  `
}
loadData();
// Add event listener to the "Show All" button
// const showAllBtn = document.getElementById("show-all");
// showAllBtn.addEventListener("click", showAllPhones);