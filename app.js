
const base_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const fromCurr =document.querySelector(".from select");  
const toCurr =document.querySelector(".to select");  

const msg=document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");

for(let select of dropdowns){
    for (let CurrCode in countryList){

        let newOption = document.createElement("option"); 
        newOption.innerText =CurrCode;
        newOption.value=CurrCode;

        if (select.name==="from" && CurrCode==="USD"){
            newOption.selected ="selected";  

        }else if( select.name==="to" && CurrCode==="INR"){
            newOption.selected ="selected"; 
        }

        select.append(newOption);     
    }

    select.addEventListener("change", (evt) =>{
           updateFlag(evt.target);  
    });

}

const updateFlag = (element) =>{
    console.log(element);  
    let CurrCode = element.value;  
    console.log(CurrCode);
    let countryCode = countryList[CurrCode];

    let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src =newImgSrc ;       
}

const btn = document.querySelector("form button");
//add event listener
btn.addEventListener("click", (evt)=>{   

     evt.preventDefault(); 
     updateExchangeRate();
})


const updateExchangeRate =async () =>{
    //access input amount
    let amount = document.querySelector("form input");
    let amtVal = amount.value;

    if (amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    console.log(fromCurr.value, toCurr.value);  
    

    const URL = `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; 
    

    let response = await fetch(URL); 

    let data = await response.json();
    console.log(data);  

    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);

    console.log(amount);  
    let finalAmt = amtVal*rate;  
    msg.innerText =` ${amtVal}  ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})



