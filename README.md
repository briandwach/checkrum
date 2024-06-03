# Checkrūm: Inspection Tracker

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](http://choosealicense.com/licenses/mit/)

## Description

Inspection tracker for audio video technologies in conference rooms.  Technical managers can keep track of client conference rooms and assign staff to perform inspections.  Application provides notice of overdue inspections and catalogs inspection report data.

[Deployed Application](https://checkrum.onrender.com)


![Screenshot of Checkrūm homepage](/client/src/assets/homepage.png)

## Team Members

- [Drew Hermanson](https://github.com/drewhermanson)
- [Charlotte Stowe](https://github.com/Charlotte-St)
- [Brian Wach](https://github.com/briandwach)

## Table of Contents

- [Usage](#usage)
- [Installation](#installation)
- [License](#license)
- [Resources](#resources)
- [Questions](#questions)

## Usage

[Deployed Application](https://checkrum.onrender.com)

[Code Repository](https://github.com/briandwach/checkrum)

Checkrūm has workflows for both administrative users and staff users. 

### Administrative Users

Administrative users can maintain data, review the results of maintenance checks, and assign staff users to complete maintenance checks on rooms. 

#### Assigning Reports

![A gif of an administrative user assigning a report](/client/src/assets/assign-report.gif)

1. Go to Reports, then to Assign. 

2. Select the staff member you want to assign the report to. 

3. Select the location where the rooms are located. Click the Search for Rooms button to find rooms at the location selected. 

4. Check the rooms that you want to assign the staff member to check. 

5. Click the Create Report button to assign the reports to the selected staff member. 


#### Managing In Progress Reports

![A gif of an administrative user editing and deleting reports](/client/src/assets/managing-inprogress-reports.gif)

 Go to Reports, then to In Progress. This will display a list of reports that have been assigned to staff, but not yet completed. 

To update the user a report is assigned to, find the report you want to update, then select the new user to assign it to from the dropdown box. 

To delete a report, find the report you want to delete, then click the trash can icon to delete the report. You will be prompted to confirm that you want to delete the report. Confirm if you want to delete the report. 

#### Viewing Completed Reports

Go to Reports, then to Completed.  As a manager, you can view all completed reports and update a report at anytime.  

All previously completed reports will be viewable.  Four filters are available in order to find the reports you want.  You can filter by client, staff, month the report was submitted, and the status of the report (shows reports that include failed equipment checks).

#### Managing User Roles

![A gif of a user accessing the page to update a user's role](/client/src/assets/manage-roles.gif)

Go to Maintain, then to View Staff. This will show you a list of all users currently in the application. 

To update the role of a user, click on their name, then select the button for the role you want to give them. 

#### Adding or Editing Client, Location, or Room Data

![A gif of a user editing room data](/client/src/assets/editing-client-data.gif)

Users can edit client, location or room data through the Edit Client component, or add a new client through the Add Client component. 

To add a client, go to Maintain, then Clients, then Add Client. The form will guide you through adding a new client, locations belonging to that client, and rooms belonging to that client. If you need to edit the client, go to the Edit Client component. 

To edit a client, go to Maintain, then Clients, then Edit Client. Select the client you wish to edit. Their data will appear on the page after they are selected. Use the buttons to edit client, location, or room data as needed. Deletion of client data is not supported in Checkrūm at this time. 

#### Adding, Editing, and Deleting Equipment

![A gif of a user adding, editing, and deleting an equipment item](/client/src/assets/maintain-equipment.gif)

To add, edit, or delete an equipment item, go to Maintain, then to Equipment. 

New equipment items can be added at the bottom of the table by entering the name of the equipment item, then clicking the floppy disk icon to save. 

Existing equipment items can be edited by clicking the edit pencil icon in the row for the equipment item, updating the name of the equipment item in the text box, then clicking the floppy disk icon to save. 

Users can delete equipment icons by clicking the trash can icon next to the equipment item. 

Please note that this functionality is for maintaining the list of equipment that can be assigned to rooms. To assign or remove equipment to rooms, please use the Edit Client component. 

### Staff Users

Staff users can see what maintenance checks are assigned to them and reivew the results of recent maintenance checks. 

#### Viewing and Completing Assigned Reports

![a gif of a user accessing and completing a report](/client/src/assets/assigned-reports.gif)

When logged into the staff side of Checkrūm, users default to seeing the outstanding reports assigned to them. Otherwise, they can access these reports by going to Assigned reports. 

To complete an assigned report: 

1. Click on the Inspect button for the report you want to complete. 

2. Review the condition of each equipment item and indicate if it passes or fails inspection. If the inspection fails, the user must enter a comment. Users may enter comments on passing equipment items, but it is not required. 

3. The user has an option to enter an additional comment about the room. 

4. When the user has completed the report, they can click the Submit button to submit the report. The report will then show as a completed report. If the user decides not to complete a report they have opened, they can select the Go Back button. 

### Viewing a Completed Report and Updating a Completed Report

![a gif of a user viewing completed reports and updating a completed report](/client/src/assets/updating-completed-reports.gif)

To view completed reports, go to Recent Reports. Reports recently completed by the user will be visible for 48 hours after they are completed. 

To update a report, click on the Update button, then update the form as necessary. Click the Update button to save when done. 

## Installation

Checkrūm is a hosted on Render and does not need to be installed. 

## License

This application is covered under the [MIT License](http://choosealicense.com/licenses/mit/).

## Resources

[React](https://react.dev/)

[Vite](https://vitejs.dev/)

[Tailwind CSS](https://tailwindcss.com/)

[DaisyUI](https://daisyui.com/)

[PostCSS](https://postcss.org/)

[Apollo](https://www.apollographql.com/)

[bcrypt](https://www.npmjs.com/package/bcrypt)

[JWT](https://jwt.io/)

[date-fns](https://date-fns.org/)

[Express](https://expressjs.com/)

[GraphQL](https://graphql.org/)

[MongoDB](https://www.mongodb.com/)

[Mongoose](https://mongoosejs.com/)

[concurrently](https://www.npmjs.com/package/concurrently)

[Font Awesome](https://fontawesome.com)

[React Hook Form](https://react-hook-form.com)

### Tutorials

[Create a Table in React](https://www.youtube.com/watch?v=dYjdzpZv5yc)

[React Hook Form - Complete Tutorial (with Zod)](https://www.youtube.com/watch?v=cc_xmawJ8Kg)

## Questions

Please contact us with any questions regarding this application at: checkrumproj@gmail.com