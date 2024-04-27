// function loadData (){
//     // fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
//     // .then(res => res.json())
//     // .then(data => console.log(data.data))

// }

const loadData = async(search)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)
}


const displayPhones = (phones)=>{
  console.log(phones.length);
  const btn = document.getElementById("show-all");
  if(phones.length >4){
    phones = phones.slice(0,4);
    btn.classList.remove("hidden");
    console.log("length is so logn getter then 12")
  }else{
    btn.classList.add("hidden")
    console.log("mone hoy 12 ar teke chutu sog")
  }
 
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
          <button class="btn btn-primary">Show details</button>
        </div>
      </div>
      `
      phoneContainer.appendChild(div);
   });
}



const handleSearch =()=>{
  loaderSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadData(searchText);
  searchField.value = "";
}
// loadData();

function loaderSpinner(isloading){
    const spinner = document.getElementById("loader");
    if(isloading){
      spinner.classList.remove("hidden")
    }
    console.log(isloading)
}