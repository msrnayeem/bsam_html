// Side menu panel
function openMenuBar() {
  document.getElementById('sideMenu').classList.add('active')
  document.getElementById('overlay').classList.add('active')
}

function closeMenuBar() {
  document.getElementById('sideMenu').classList.remove('active')
  document.getElementById('overlay').classList.remove('active')
}

// Profile menu panel
function openProfileSideBar() {
  document.getElementById('profile').classList.add('active')
  document.getElementById('overlay').classList.add('active')
}

function closeProfileSideBar() {
  document.getElementById('profile').classList.remove('active')
  document.getElementById('overlay').classList.remove('active')
}

// dropdown
let dropdownOptions = document.getElementById('dropdown-options');
function openDropdownOptions() {
  if (getComputedStyle(dropdownOptions).display === 'none') {
    dropdownOptions.classList.add('active');
  } else {
    dropdownOptions.classList.remove('active');
  }
}

// Side cart panel
function openCart() {
  document.getElementById('cartSideBar').classList.add('active')
  document.getElementById('overlay').classList.add('active')
}

function closeCart() {
  document.getElementById('cartSideBar').classList.remove('active')
  document.getElementById('overlay').classList.remove('active')
}

// Promotional categories slider 
$('.categories').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 10,
  slidesToScroll: 1,
  // arrows: true,

  prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 10
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 8
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 6
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 4
      }
    }
  ]
});


// slider seaction starts here 
$('.slider-section').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true,
  arrows: false,
  fade: true,
});
// slider seaction ends here 


// Category wise products slider starts here
$('.products').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 1,
  // arrows: true,

  prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-circle-arrow-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-circle-arrow-right"></i></button>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
// Category wise products slider ends here

// Cart quantity increase/decrease functions starts here
document.addEventListener('DOMContentLoaded', function () {
  const decreaseButtons = document.querySelectorAll('.decrease');
  const increaseButtons = document.querySelectorAll('.increase');
  const qtyInputs = document.querySelectorAll('.qunatityValue');

  // Modal elements
  const modal = document.getElementById('deleteModal');
  const confirmBtn = document.getElementById('confirmDelete');
  const cancelBtn = document.getElementById('cancelDelete');

  let rowToDelete = null; // store row temporarily

  qtyInputs.forEach((input, index) => {
    const decreaseBtn = decreaseButtons[index];
    const increaseBtn = increaseButtons[index];

    function updateDecreaseButton() {
      let qty = parseInt(input.value);
      if (qty > 1) {
        decreaseBtn.innerHTML = '-';
      } else {
        decreaseBtn.innerHTML = '<span class="text-danger deleteBtn"><i class="fa-solid fa-trash"></i></span>';
      }
    }

    updateDecreaseButton();

    increaseBtn.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
      updateDecreaseButton();
    });

    decreaseBtn.addEventListener('click', () => {
      let current = parseInt(input.value);
      if (current > 1) {
        input.value = current - 1;
      } else {
        // Show custom modal
        rowToDelete = decreaseBtn.closest('tr');
        modal.style.display = 'flex';
      }
      updateDecreaseButton();
    });
  });

  // Confirm delete
  confirmBtn.addEventListener('click', () => {
    if (rowToDelete) {
      rowToDelete.remove();
      rowToDelete = null;
    }

    modal.style.display = 'none';

    // Show toast message
    const toast = document.getElementById('successMessage');
    toast.classList.add('show');

    // Hide after 2.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  });

  // Cancel delete
  cancelBtn.addEventListener('click', () => {
    rowToDelete = null;
    modal.style.display = 'none';
  });
});
// Cart quantity increase/decrease functions ends here



//---------------------------------------- Checkout page body codes starts here  ----------------------------------------
function showPopup() {
  const popup = document.getElementById('popupContainer');
  popup.style.display = 'flex';
}

function hidePopup() {
  const popup = document.getElementById('popupContainer');
  popup.style.display = 'none';
}


// show location in map on search in input box starts here 
let map;
let geocoder;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.8103, lng: 90.4125 }, // Dhaka by default
    zoom: 10,
  });
  geocoder = new google.maps.Geocoder();
}

function geocodeLocation() {
  const address = document.getElementById("locationInput").value;
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
      map.setZoom(14);
      if (marker) marker.setMap(null);
      marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

document.getElementById("locationInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    geocodeLocation();
  }
});


// show selected option's text starts here 
function setActive(btn) {
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.toggle-btn');
  buttons.forEach(button => button.classList.remove('active'));

  // Add active class to clicked button
  btn.classList.add('active');

  // Update the active text
  document.getElementById('instruction1').textContent = btn.textContent;
}
// show selected option's text ends here 

// Additional instruction section starts here
function updateText() {
  const input = document.getElementById('textInput');
  const output = document.getElementById('additinal2');
  output.textContent = input.value || 'Additional instructions'; // fallback if empty
}
// Additional instruction section ends here

// Payment method card information form starts here 
function paymentToggleForm() {
  const form = document.getElementById("debitCreditCardForm");
  form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
}
// Payment method card information form ends here 


//---------------------------------------- Checkout page body codes ends here  ----------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  console.log("loaded");
  const signUpForm = document.getElementById('signUpForm');
  const signInForm = document.getElementById('signInForm');
  const modalTitle = document.getElementById('modalTitle');
  const toggleButton = document.getElementById('toggleButton');
  const togglePhoneEmailBtn = document.getElementById('togglePhoneEmailBtn');
  const toggleText = document.getElementById('togglePhoneEmailBtnText');
  const phoneForm = document.getElementById('continueWithMobile');

  // Set initial form type
  window.setFormType = function (type) {
    console.log("setFormType called with type:", type);
    if (type === 'signUp') {
      signUpForm.style.display = 'block';
      signInForm.style.display = 'none';
      modalTitle.textContent = 'Sign Up';
      toggleButton.textContent = 'Already have an account? Sign In';
    } else {
      signUpForm.style.display = 'none';
      signInForm.style.display = 'block';
      modalTitle.textContent = 'Sign In';
      toggleButton.textContent = 'Need an account? Sign Up';
    }
  };

  // Toggle between sign up and sign in
  window.toggleForm = function () {
    const isSignUpHidden = signUpForm.style.display === 'none';
    setFormType(isSignUpHidden ? 'signUp' : 'signIn');
  };

  // Toggle between phone and email signup
  if (togglePhoneEmailBtn) {
    togglePhoneEmailBtn.addEventListener('click', function () {
      const isPhoneHidden = phoneForm.style.display === 'none';
      if (isPhoneHidden) {
        phoneForm.style.display = 'block';
        signUpForm.style.display = 'none';
        signInForm.style.display = 'none';
        toggleText.textContent = 'Continue with Email';
        modalTitle.textContent = 'Sign Up with Phone';
        toggleButton.style.display = 'none';
      } else {
        phoneForm.style.display = 'none';
        setFormType('signUp');
        toggleText.textContent = 'Continue with Phone';
        toggleButton.style.display = 'inline-block';
      }
    });
  }

  // Country code selection
  window.selectCountryCode = function (element) {
    const code = element.getAttribute('data-code');
    const flag = element.getAttribute('data-flag');
    document.getElementById('countryCodeBtn').textContent = `${flag} ${code}`;
    document.getElementById('countryCode').value = code;

    // Update active class
    document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
      item.classList.remove('active');
    });
    element.classList.add('active');
  };


});

document.addEventListener('DOMContentLoaded', function () {
  const modalAuth = new bootstrap.Modal(document.getElementById('modalAuth'));
  document.querySelector('[data-target="#modalAuth"]').addEventListener('click', function () {
    modalAuth.show();
  });
});


// Payment option adding codes starts here
const popupContainer = document.getElementById('paymentMethodPopupContainer');
const popupStep1 = document.getElementById('popupStep1');
const popupStep2 = document.getElementById('popupStep2');
const cardForm = document.getElementById('cardForm');
const selectedCardTitle = document.getElementById('selectedCardTitle');

function shwoPaymentMethodPopup() {
  popupContainer.style.display = 'flex';
  popupStep1.style.display = 'block';
  popupStep2.style.display = 'none';
}

function closePaymentMethodPopup() {
  popupContainer.style.display = 'none';
}

function selectCard(cardType) {
  popupStep1.style.display = 'none';
  popupStep2.style.display = 'block';
  selectedCardTitle.innerText = `Add ${cardType} Details`;
  cardForm.style.display = 'flex';
}

function goBack() {
  popupStep2.style.display = 'none';
  popupStep1.style.display = 'block';
}
// Payment option adding codes ends here
