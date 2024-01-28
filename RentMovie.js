let readlineSync = require('readline-sync');
let checkState = true;
let selectOtherMovie;
const movieTitleArray = [];
const cart = [];
const paymentOption = ['Card', 'Cash', 'Transfer'];
const adminActions = ['Add Movie', 'View Available Movies', 'Edit Admin Name', 'Get Current Admin Name'];
const bankDetails = {
  Bank: 'Access Bank',
  Account_Number: 1234567890,
  Account_Name: 'MovieStore'
}

const _movies = [
  {
    Title: "Inception",
    Director: "Christopher Nolan",
    ReleaseYear: 2010
  },
  {
    Title: "Interstellar",
    Director: "Christopher Nolan",
    ReleaseYear: 2014
  }
]

class Admin {
  adminName = 'admin'

  static AdminPasskey = 12345
  static accessStatic() {
    return Admin.AdminPasskey
  }

  getAdminName() {
    return this.adminName
  }
  
  setAdminName(name) {
    this.adminName = name
  }
}

const admin = new Admin();

class MovieStore {
  constructor (_movies = []){
    this.movies = _movies;
  }

  setNewMovie(title, director, releaseYear){
    this.movies.push({
      Title: title,
      Director: director,
      ReleaseYear: releaseYear
    })
  }

  getMovies(){
    this.movies.map((item) => (
      console.log(item)
    ));
  }
}

const movies = new MovieStore(_movies);


console.log(`Welcome to MovieStore.`);

const userMode = readlineSync.keyInYN(`Are you logging in as an admin?: `);

if (userMode) {
  const adminAuth = () => {
    const verifyPasskey = readlineSync.question(`Enter passkey: `);
    // console.log(verifyPasskey)
    if (parseInt(verifyPasskey) !== Admin.AdminPasskey) {
      console.log(`Pass Incorrect`)
      adminAuth();
    }else {
      // console.log(Admin.AdminPasskey);
      CurrentAdminAction();
      // console.log(selectAdminAction)
    }
  }

  const CurrentAdminAction = () => {
    const selectAdminAction = readlineSync.keyInSelect(adminActions, `What action would you like to perform?: `);
  
    if (selectAdminAction === 0) {
      addNewMovie();
  
      if (readlineSync.keyInYN(`Add another movie? `)) {
        addNewMovie()
      }else {
        CurrentAdminAction();
      }
  
    }else if (selectAdminAction === 1){
      _movies.forEach((item, index) => {
        console.log(`${index + 1}. ${item.Title} by ${item.Director}. Release year: ${item.ReleaseYear}`)
      })
      CurrentAdminAction();
      
    }else if (selectAdminAction === 2) {
      const newAdminName = readlineSync.question(`Enter new admin name: `);
      admin.setAdminName(newAdminName);
      console.log(`New admin name set to ${admin.getAdminName()}`);
      CurrentAdminAction();
  
    }else if (selectAdminAction === 3) {
      console.log(`Current admin name is ${admin.getAdminName()}`);
      CurrentAdminAction();
    }
  }

  const addNewMovie = () => {
    console.log(`Enter movie details: `)
    const Title = readlineSync.question(`Title of movie: `);
    const Director = readlineSync.question(`Movie Director: `);
    const ReleaseYear = readlineSync.question(`Release Year: `);
    
    movies.setNewMovie(Title, Director, ReleaseYear);
  }

  console.log(`Welcome Admin!`);
  console.log(`Verify admin`);
  adminAuth();

}else {
  console.log(`Welcome user.`)
  _movies.forEach((items) => {
    movieTitleArray.push(items.Title)
  })

  const SelectMovie = () => {
    const movieSelect = readlineSync.keyInSelect(movieTitleArray, `Select Movie to Rent: `);
    console.log(`You have selected ${movieTitleArray[movieSelect]}`);
    cart.push(movieTitleArray[movieSelect]);
    // console.log(cart)

    selectOtherMovie = readlineSync.keyInYN(`Do you want to select another movie?: `)
    if (selectOtherMovie == true) {
      SelectMovie();
    }else {
      console.log(`Proceed to checkout`);
      checkout();
    }
  }

  const checkout = () => {
    console.log(`Cart items: `, cart)
    const selectPaymentOption = readlineSync.keyInSelect(paymentOption, `Select payment option: `);
    if (selectPaymentOption == 0) {
      console.log(`Enter card details in the next page.`)
      console.log(`Redirecting...\n`);
    }else if (selectPaymentOption == 1) {
      console.log(`You will pay upon delivery.`);
    }else if (selectPaymentOption == 2) {
      console.log(`Transfer to: `, bankDetails)
    }
    
    console.log(`Return date ETA: 5 days from day of collection.`);
    console.log(`Everyday after elapse of return date warrants an extra $1`);
    console.log(`Thank you for renting with MovieStore.\n`);
  }

  if (readlineSync.keyInYN(`Checkout available movies?`)){
    _movies.forEach((item) => {
      console.log(item);
    })

    if (readlineSync.keyInYN(`Do you want to rent a movie?`)){
      SelectMovie();
    }else {
      console.log(`Returning Home...`);
    }
  }else {
    console.log(`Returning Home...`);
  }
}

// Admin Section









// movies.getMovies();
// movies.getMovies();