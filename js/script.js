/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const ITEMS_PER_PAGE = 9;

function showPage(list, page) {
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

   const listTypesOrder = [
      'picture',
      'name',
      'email',
      'registered'
   ];

   // create two variables which will represent the index for the first and last student on the page
   let startIndex = (page * ITEMS_PER_PAGE) - ITEMS_PER_PAGE;
   let endIndex = (page * ITEMS_PER_PAGE) > list.length ? list.length : page * ITEMS_PER_PAGE;
 
   // select the element with a class of `student-list` and assign it to a variable
   const htmlStudentList = document.querySelector('.student-list');
 
   // set the innerHTML property of the variable you just created to an empty string
   htmlStudentList.innerHTML = '';
 
   // loop over the length of the `list` parameter
   for (let i = startIndex; i < endIndex; i++) {
      let htmlStudentDetails = document.createElement('DIV');
      htmlStudentDetails.className = 'student-details';
      let htmlJoinedDetails = document.createElement('DIV');
      htmlJoinedDetails.className = 'joined-details';

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
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   // create a variable to calculate the number of pages needed
   const numOfPages = Math.ceil(list.length / ITEMS_PER_PAGE);
 
   // select the element with a class of `link-list` and assign it to a variable
   let linkList = document.querySelector('.link-list');
   let buttonsLI = document.createElement('LI');
 
   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = '';

   // loop over the number of pages needed
   for (let i = 1; i <= numOfPages; i++) {
      let button = document.createElement('BUTTON');
      button.setAttribute('type', 'button');
      button.innerText = i;
      buttonsLI.appendChild(button);
   }

   buttonsLI.firstElementChild.className = 'active';

   linkList.addEventListener('click', (e) => {
      if (e.target.type === 'button') {
         let active = document.querySelector('.active');
         active.className = '';
         e.target.className = 'active';
         showPage(data, e.target.innerText);
      }
   });
 
   // create an event listener on the `link-list` element
     // if the click target is a button:
       // remove the "active" class from the previous button
       // add the active class to the clicked button
       // call the showPage function passing the `list` parameter and page to display as arguments
   linkList.appendChild(buttonsLI);
 }

// Call functions
showPage(data, 1);
addPagination(data);