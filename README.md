## Packages

The packages installed in this project are:

- React Query
- Aphrodite
- Prettier
- Use Debounce

npm install should install all of these after cloning the repo.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### How it works

This app takes advantage of the SWAPI's search parameter/functionality. Each resource supports search based on specific fields for each resource (for example, films supports searching by title, starships by name/model, etc). Each resource also contains a relevant relation to a person in the Star Wars universe, which is exactly the data we need. The app filters out duplicates and prints them out in a simple unordered list.

### Examples

``-> 82 results, all characters`A New Hope`-> 18 results, 18 characters`Death Star`-> 0 results, no pilots`Sand Crawler`-> 0 results, no pilots`Wookie`-> 2 results, 2 wookies`Tatooine` -> 10 reults, 10 people from the planet

### Thoughts for high volume cases

If we wanted to have this functioning properly for high volume cases (e.g more data), we could add things such as pagination in order to section the results to different pages and optimize load speed of current viewed content. Otherwise, adding things such as design components/styling, accessibility, and potentially sectioning off different kinds of searches (not just for people, but also being able to look up films, starships, etc) would add to the value of the product.
