/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const ITEMS_PER_PAGE = 9;  // The number of students displayed on a page at a time
let dataCopy = data; // Making a copy of the students data for search functionality
// removing dataCopy breaks the pagination after search is done

/*
Function:      showPage()
Description:   Creates HTML items from data to be displayed in pages
Parameters:
   list:       Array of Objects containing student data
   page:       An index which will determine what page of data to display next
*/

function showPage(list, page) {
   // listTypes will be used to create the elements required to build a student item displayed on the page
   const listTypes = {
      picture: (picture) => {
         const htmlImg = document.createElement('IMG');
         htmlImg.className = 'avatar';
         htmlImg.setAttribute('src', picture.large);
         htmlImg.setAttribute('alt', 'Profile Picture');
         return htmlImg;
      },
      name: (name) => {
         const htmlName = document.createElement('H3');
         htmlName.innerText = `${name.first} ${name.last}`;
         return htmlName;
      },
      email: (email) => {
         const htmlEmail = document.createElement('SPAN');
         htmlEmail.className = 'email';
         htmlEmail.innerText = email;
         return htmlEmail;
      },
      registered: (registered) => {
         const htmlDateJoined = document.createElement('SPAN');
         htmlDateJoined.className = 'date';
         htmlDateJoined.innerText = `Joined ${registered.date}`;
         return htmlDateJoined;
      }
   }

   // listTypesOrder will be used to maintain the order the list items of students are displayed in
   const listTypesOrder = [
      'picture',
      'name',
      'email',
      'registered'
   ];

   // Index variables to store the items displayed on each page
   const startIndex = (page * ITEMS_PER_PAGE) - ITEMS_PER_PAGE;
   const endIndex = (page * ITEMS_PER_PAGE) > list.length ? list.length : page * ITEMS_PER_PAGE; // endIndex will never exceed the max amount of student data available
 
   // List of students will be cleared every time showPage() runs
   const htmlStudentList = document.querySelector('.student-list');
   htmlStudentList.innerHTML = '';
   
   // Loop to create each HTML student item for the page requested
   for (let i = startIndex; i < endIndex; i++) {
      let htmlStudentDetails = document.createElement('DIV');
      htmlStudentDetails.className = 'student-details';
      let htmlJoinedDetails = document.createElement('DIV');
      htmlJoinedDetails.className = 'joined-details';

      // Iterating over listTypesOrder to call functions from listTypes
      for (let index = 0; index < listTypesOrder.length; index++) {
         htmlStudentDetails.appendChild(listTypes[listTypesOrder[index]](list[i][listTypesOrder[index]]));
      }

      let htmlStudentItem = document.createElement('LI');
      htmlStudentItem.className = 'student-item';
      htmlStudentItem.classList.add('cf');
   
      htmlStudentItem.appendChild(htmlStudentDetails);
      htmlStudentItem.appendChild(htmlJoinedDetails);
      htmlStudentList.appendChild(htmlStudentItem);
   }
 }

/*
Function:      addPagination()
Description:   Creates pagination selection buttons and their functionality
Parameters:
   list:       Array of Objects containing student data
*/

function addPagination(list) {
   // Calculate the amount of pages to be created so we know how many buttons to create
   const numOfPages = Math.ceil(list.length / ITEMS_PER_PAGE);
 
   let linkList = document.querySelector('.link-list');
 
   linkList.innerHTML = ''; // clear the pagination every time addPagination() executes

   for (let i = 1; i <= numOfPages; i++) {
      let buttonsLI = document.createElement('LI');
      let button = document.createElement('BUTTON');
      button.setAttribute('type', 'button');
      button.innerText = i;
      buttonsLI.appendChild(button);
      linkList.appendChild(buttonsLI);
   }

   linkList.firstElementChild.firstElementChild.className = 'active';

   // Creating functionality for each button
   linkList.addEventListener('click', (e) => {
      if (e.target.type === 'button') {
         let active = document.querySelector('.active');
         active.className = '';
         e.target.className = 'active';
         showPage(dataCopy, e.target.innerText);
      }
   });
}

/*
Function:         studentSearch()
Nested Function:  searchObj()
Description:      Creates the search functionality to find student data,
                  this iterates over multidimensional objects while
                  also preventing duplicate results from occurring
Parameters:
   search:        User data provided to search for
   list:          Array of Objects containing student data
   index:         The current index from the list being searched
Returns:          A complete array of objects containing matched data
*/

function studentSearch(search) {
   let found = [];
   
   function searchObj(list, index) {
      for (let key in list) {
         if (typeof list[key] === 'object') {
            searchObj(list[key], index);
         } else if (typeof list[key] === 'string') {
            if (key === 'first' || key === 'last') { //for this project only search name.first and name.last
               if (list[key].toUpperCase().includes(search.toUpperCase())) {
                  if (found.indexOf(data[index]) === -1) found.push(data[index]);
               }
            } else if (list[key].toUpperCase().includes(search.toUpperCase())) {
               if (found.indexOf(data[index]) === -1) found.push(data[index]);
            }
         } else if (typeof list[key] === 'number') {
            if (list[key].toString().includes(search)) {
               if (found.indexOf(data[index]) === -1) found.push(data[index]);
            }
         }
      }
   }
   
   for (let i = 0; i < data.length; i++) {
      searchObj(data[i], i);
   }
   
   return found;
}

/*
Function:      searchButton()
Description:   Creates a search button to find student data
*/

function searchButton() {
   const header = document.querySelector('.header');
   
   // searchInit will fire once Enter is pressed or the search button is clicked
   function searchInit() {
      // Start code for close button
      if (document.querySelector('.close')) {
         let remove = document.querySelector('.close');
         remove.parentElement.removeChild(remove);
      }

      let closeButton = `
         <button style="background-color: red; height: 37px; width: 37px;" class="close" type="button">
            <img src="img/icn-close.svg" alt="Close search">
         </button>`;
      
      searchButton.parentElement.insertAdjacentHTML('beforeend', closeButton);
      closeButton = document.querySelector('.close');
      closeButton.addEventListener('click', () => {
         showPage(data, 1);
         addPagination(data);
         closeButton.parentNode.removeChild(closeButton);
         input.value = '';
         dataCopy = data; // reset data to original
      });
      // End code for close button

      dataCopy = studentSearch(document.getElementById('search').value); //store search results over dataCopy instead

      if (dataCopy.length > 0) {
         showPage(dataCopy, 1);
         addPagination(dataCopy);
      } else {
         let pagination = document.querySelector('.pagination');
         let studentList = document.querySelector('.student-list');
         pagination.firstElementChild.innerHTML = '';
         studentList.innerHTML = '';
         pagination.firstElementChild.insertAdjacentHTML('beforeend', '<li><h2>No results found!</h2></li>');
      }
   }

   // Start creating search field and button
   let search = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;

   header.insertAdjacentHTML('beforeend', search);
   const searchButton = document.querySelector('.student-search').lastElementChild;
   let input = document.getElementById('search');
   // End creating search field and button

   input.addEventListener('keyup', (e) => {
      searchInit();
   });

   searchButton.addEventListener('click', () => {
      searchInit();
   });
}

// Call functions
showPage(data, 1);
addPagination(data);
searchButton();