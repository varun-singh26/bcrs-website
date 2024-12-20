import renderLandingSplash from "./src/components/Homepage/LandingSplash.js";
import {renderOnCampusForm, renderOffCampusForm} from "./src/components/Homepage/SearchForm.js";
import {renderOnCampusListings, renderOffCampusListings} from "./src/components/Homepage/Listings.js";
import renderForm from "./src/components/Homepage/Form.js";
import { renderNavBar, toggleMenu } from "./src/components/navbar.js";
import {renderFooter} from "./src/components/footer.js";

//Declare global form object that will be shared across the module
//This form object is updated dynamically whenever a change is felt by the select tag in the search bar
//on the home page
let form = {
  "class-year": 0,
  "size-of-group": 0,
  "desired-number-of-roommates": 0,
  "preferred-dorm": ""
};

//Declare global listing location var that will be shared across the module
let listingLocation = ""
  
export default function renderMainPage(data) {

    let body = document.querySelector("body");


    //render header of home page
    let header = document.createElement("header");
    header.innerHTML += renderNavBar();
    
    //add header to existing body
    body.appendChild(header);
    

    //render landing splash of home page
    let landing_Splash = document.createElement("div");
    landing_Splash.id = "landing-splash";
    //create outermost div tag of landing splash
    let div = document.createElement("div");
    div.classList.add("search-bar");
    //create main tag of landing splash
    let main = document.createElement("main");
    main.classList.add("homepage");
    main.innerHTML += renderLandingSplash(data);
    //append main tag to outermost div
    div.appendChild(main);
    //append outermostdiv to landing splash
    landing_Splash.appendChild(div);
    //append landing_Splash to current body
    body.appendChild(landing_Splash);


    //Rendering Andy's part
    let onCampus_wrapper = document.createElement("div");
    onCampus_wrapper.id = "on-campus";
    onCampus_wrapper.innerHTML += renderOnCampusListings();

    let offCampus_wrapper = document.createElement("div");
    offCampus_wrapper.id = "off-campus";
    offCampus_wrapper.innerHTML += renderOffCampusListings();
    //Add both onCampus and offCampus wrappers to current body
    body.appendChild(onCampus_wrapper);
    body.appendChild(offCampus_wrapper);

//Rendering Lucas' part 
    let about_wrapper = document.createElement("div");

    about_wrapper.classList.add("aboutUs");
    about_wrapper.innerHTML = `
                <h2 class="section-title"><span class="keyword">Mission</span></h2>
                <p>
                    At Boston College Roomate Search (BCRS), our vision is to unite BC Students with their ideal roommates. During times of 
                    stress and uncertainty, when the BC Housing Lottery doesn't go your way, we're here to help ease the path to your ideal
                    future housing. We also aim to facilitate the roomate searching process when in need of subletters. Being BC Students
                    ourselves, means that we understand the struggle and pain associated with BC Housing. Therefore, always know that BCRS
                    is here for you, no matter how difficult the situation may be. 

                    BCRS strives to light the path for a BC Eagle's journey from one nest to another.
               </p>
    `;
    body.appendChild(about_wrapper);

    //Rendering Harim's part
    let form_wrapper = document.createElement("div");
    form_wrapper.id = "post";
    form_wrapper.innerHTML = renderForm();
    //Add form to current body
    body.appendChild(form_wrapper);

    //Rendering Footer
    const footer = document.createElement("footer");
    footer.innerHTML = renderFooter();
    document.querySelector("body").appendChild(footer);

    //add event listener to check if listing location has been selected. If so render
    //second form
    let formWrapper = document.querySelector("main div.formWrapper"); //create anchor delegation
    let listingLocationSelect = document.querySelector("form.search select");
    listingLocationSelect.addEventListener("change", (e) => {
      console.log("Event Target:", e.target);
      console.log("Event Target Value:", e.target.value);

      //save user's listing location 
      listingLocation = e.target.value;
      console.log("listingLocation", listingLocation);
      localStorage.setItem("listingLocation", listingLocation);

      // Check if the second form exists, and remove it from the innerHTML of formWrapper
      let secondForm = formWrapper.querySelector("form.field");
      if (secondForm) {
        secondForm.remove();
      }

      //render new form underneath first form based on user's selection
      //let formWrapper = document.querySelector("main div.formWrapper");
      let newForm;
      if (listingLocation == "oncampus") {
        newForm = renderOnCampusForm();
        
      } else if (listingLocation == "offcampus") {
        newForm = renderOffCampusForm();
      }

      //Append new form to formWrapper dynamically
      formWrapper.insertAdjacentHTML("beforeend", newForm);

    });

    // Delegate events to dynamically rendered elements
    formWrapper.addEventListener("change", (e) => {
      // Check if the event target matches the desired selector
      console.log(e.target);
      if (e.target.matches("form.field .select")) { //Target is the tag that triggered the event (ie. select tag of second form)
        console.log("Event Target ID:", e.target.id);
        

        // Update form data
        if (checkForNumberInString(e.target.value)) {
          form[e.target.id] = Number(e.target.value);
        } else {
          form[e.target.id] = e.target.value;
        }

      console.log("Form after change:", form);
      console.log(`${e.currentTarget.id} value from EVENT: ${e.target.value}`);
      
      localStorage.setItem("form", JSON.stringify(form));
      }
    });

    // Delegate form submission
    formWrapper.addEventListener("submit", (e) => {
      if (e.target.matches("form.field")) {
        e.preventDefault(); // Prevent navigation to .php page

        // Modify the URL and navigate
        const currentURL = new URL(window.location);
        currentURL.searchParams.set("page", "listings");
        //currentURL.searchParams.delete("detailView");
        window.location.href = currentURL; //everytime window.location.href changes, index.js is rerun
        console.log("New URL:", window.location.href);
      }
    });
  }

  //When invoked, gets updated form data from localStorage
  export function getFormData() {
    const savedListingLocation = localStorage.getItem("listingLocation"); //Retrieve listingLocation from local storage
    const savedForm = localStorage.getItem("form"); //Retrieve form from local storage
    if (savedForm) {
      return [JSON.parse(savedForm), savedListingLocation]; //returned parsed form data if found
    } 
    return [form, savedListingLocation]; //Fallback to the initial form if nothing is stored
  }

  //If any of the user answers to the search fields are numbers, this function converts those answers
  //to integers so they match the format of db.JSON
  function checkForNumberInString(string) {
    switch (string) {
      case "1":
        return true;
      case "2":
          return true;
      case "3":
        return true;
      case "4":
        return true;  
      case "5":
        return true;
      case "6":
        return true;
      case "7":
        return true;
      case "8":
        return true;
      case "2025":
        return true;
      case "2026":
        return true;
      case "2027":
        return true;
      case "2028":
        return true;
      default:
        return false;  
    }
  }
