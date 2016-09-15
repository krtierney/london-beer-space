# London Beer Space

![screen shot home](https://cloud.githubusercontent.com/assets/2197306/18556554/844de338-7b63-11e6-83ad-4da65005d467.png)

TimeOut, Eventbrite, Design My Night… there are more event listing websites on the internet than anyone knows what to do with. And yet, after more than a year spent working in London’s burgeoning craft beer industry, most interesting events popped up on my radar via Facebook or Twitter. It was just too difficult to filter through the cruft of bad beer events or paid promoted listings to actually find out about the great grassroots activities going on in town. 

I created London Beer Space with the hope that my friends and former colleagues working in the industry will adopt it as an event listing platform. Created by a beer nerd, for other beer nerds, its success will depend heavily on finding an engaged user base. As someone who put on frequent events in London, and who wants to attend events of this ilk, it’s something I would use frequently. Time will tell if others feel the same way. At the very least, carefully crafting a good user experience with the MEAN stack was a fun exercise that allowed me to build familiarity with Angular, particularly in the area of form validation and error handling.

## Planning
I stuck with **Trello** for project management, color-coding issues with labels to mark bugs and priorities for new feature implementations. I played out with the new **Adobe XD** for building wireframes and interactive prototyping.

![screen shot trello](https://cloud.githubusercontent.com/assets/2197306/18556555/84529298-7b63-11e6-9a2d-26cbf090c0f4.png)

![screen shot adobe xd](https://cloud.githubusercontent.com/assets/2197306/18556557/84542ce8-7b63-11e6-867c-193b946cea18.png)

### Project requirements
We were given two requirements for this project: It needed to be built with the MEAN stack, and needed to include some form of user authentication. Since I knew I’d be working with MongoDB and Mongoose, my data models have evolved over the course of the project, freeing up more time to spend planning user journeys rather than planning the database design.

![screen shot](https://cloud.githubusercontent.com/assets/2197306/18556558/845483e6-7b63-11e6-9ea2-80ba3f3981ae.png)

## Build
London Beer Space is built with a **Node.js** server, **Express** MVC framework, and **MongoDB with Mongoose**. Authentications are done with **Satellizer** using OAuth on the front-end, **JSON Web Tokens**, and **BCrypt** for password hashing on the server-side. Image uploading for event listings was accomplished with **Multer** and **AWS S3**.
Front-end architecture uses **Angular 1.5.8** and incorporates Angular UI Bootstrap and Bootstrap CSS for the layout, mainly to support form styling and improved user interactions like the date/time picker. I used **Bower** to manage client-side dependencies and **npm** for Node.js modules.

![screen shot](https://cloud.githubusercontent.com/assets/2197306/18556556/845397ba-7b63-11e6-825e-b48b0f6fc2b2.png)

For this final project, students were introduced to Gulp to automate builds for production, which was an utter delight. I don’t know how I ever managed SCSS without Live Reload. I adore it.

## Future Plans

There’s still a tremendous amount of work to do. I’m hesitant to spend too much time building out functionality and adding features without having a committed user base, so I’ll be moving slowly and prioritising new features as demand scales up.

* Improving **validation flow** and **error handling** between Angular forms and MongoDB: In particular, I’d like to pass a request to the server to confirm that usernames or email addresses are unique as they’re entered on the Register form
* Integrating **map displays** and **location-based search** (currently weighing choices between Google Maps, which supports the current autocomplete interaction vs Mapbox)
* Adding search bar for events; allowing users to **search by keywords, tags, location, etc.** (This seems superfluous until the quantity of events listed reaches a certain critical mass.)
* Creating a **Featured Events page** to highlight especially well-presented or interesting events
* Allowing users to create **profiles** and edit their personal information

![screen shot](https://cloud.githubusercontent.com/assets/2197306/18556559/845560ae-7b63-11e6-8443-62970f284267.png)

## Credits
As always, I’m grateful to the instructional team at General Assembly for their support and assistance: Mike Hayden, Chanse Campbell, and Rosanna Rossington. I also owe a massive debt of gratitude to the open-source developer community for their hard work in making these tools and technologies available and for maintaining them. To everyone who’s ever worked hard to write excellent documentation for your code: Thank you, from the bottom of my heart. You’re the true heroes. And of course, everyone spending their precious free time answering questions on Stack Overflow. 🙌🏿