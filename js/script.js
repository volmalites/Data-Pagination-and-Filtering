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

function showPage(list, page = false) {
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
   let firstIndex, lastIndex;
 
   // select the element with a class of `student-list` and assign it to a variable
   const htmlStudentList = document.querySelector('.student-list');
 
   // set the innerHTML property of the variable you just created to an empty string
   htmlStudentList.innerHTML = '';
 
   // loop over the length of the `list` parameter
   for (let i = 0; i < 9; i++) {
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



// Call functions
showPage(data);
console.log(data);