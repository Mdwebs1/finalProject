# welcome

# Quick Compo

## Description

***`welcome`*** If you want to move to a new city and there is no one to guide you the way! We can help you book with one of the best people of the land and enjoy their instructions and learn about their customs and traditions for a limited number of days so that you can complete your trip with confidence



## User Stories

- **Signup:** As a user, I can register on the platform so that I can reserve a suitable place for me.

- **Login:** As a user I can login to the platform .

- **Logout:** As a user I can logout from the platform so no one else can use it.

- **House reservation** As a user I can book a house to stay in.

- **View all homes** As a user, I want to see all the homes that I can book in and their owners and choose the appropriate one.

- **Edit Guest** As a guest I can edit my profile.

- **Edit Host** As a host I can edit my profile.

- **Edit Home** As a host I can edit my home.

- **Booking** As a host I can except or reject the request from the guest.

  

  

  

## Backlog

Guest profile:

- see mor information 

- delete acount

- update profile

  ### Extra 
  
  - socit.io

  - more design


# Client / Frontend

## React Router Routes (React App)

| Path               | Component | Permissions                 | Behavior                                                     |
| ------------------ | --------- | --------------------------- | ------------------------------------------------------------ |
| `/`                | Home      | public `<Home>`             | Home page                                                    |
| `/SignUp`          | SignUp    | anon only `<AnonRoute>`     | Signup form, link to login, navigate to homepage after signup |
| `/LogIn`           | LogIn     | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/GuestProf/:id`   | GuestProf | guest only `<PrivateRoute>` | Shows all guest information                                  |
| /ViewHomes/:hostId | HostProf  | guest and host              | See home information and booking schedule                    |
| `/ViewHomes/:id`   | ViewHomes | guest and host              | Details of host name and photo                               |
| /HostProf          | HostProf  | host only                   | Shows all host information                                   |
| /Booking           | Booking   | host only                   | Shows all request for booking                                |
                                 |
|                    |           |                             |                                                              |
|                    |           |                             |                                                              |
|                    |           |                             |                                                              |
|                    |           |                             |                                                              |
|                    |           |                             |                                                              |

## Components

- SignUp

- LogIn

- GuestProf

- ViewHomes

- HostProf

- Booking

- LogOut

  



# Server / Backend

## Models

Guest model

```
   userName:{ 
        type: String,
        required: [true, "user should be provided"],
        unique: true
    }, 
    name:{
        type: String,
       
    },
    email:{
        type:String,
        required: [true, " email should be provided"],
        unique: true,
        lowercase: true,
        validate:[isEmail,"is invalid"]
    },
    password:{
    type:String,
    minLength:[6,"pass more than 6"],
    required: [true, "pass should be provided"],
 }
```

Host model

```
  userName:{ 
        type: String,
        required: [true, "user should be provided"],
        unique: true,
    }, 
    name:{
        type: String,
        required: [true, "name should be provided"]
    },
    email:{
        type:String,
        required: [true, " email should be provided"],
        unique: true,
        lowercase: true,
        validate:[isEmail,"is invalid"]
    },
    password:{
    type:String,
    minLength:[6,"pass more than 6"],
    required: [true, "pass should be provided"],
 },
 hostImage:{
    type:String
 },
 homes:[homeSchema],
```

Home model

```
  image:{
    type:String,
    required: [true, "image be provided"],
}, 
 phoneNumber:{
    type:Number,
    required: [true, "phoneNumber be provided"],
 },
 informations:{
     type:String,
     required: [true, "informations be provided"],

 }
 
```

schedule model

```
  host:{type:mongoose.Schema.Types.ObjectId,ref:'host'}, 
    guest:{type:mongoose.Schema.Types.ObjectId,ref:'guest'}, 
    date: {type: Date,default:Date.now},
    bookingStatues:{type:String,default:"Pending"}
 
```



## Backend routes

| HTTP Method | URL                   | Request Body                     | Success status | Error Status | Description                                                  |
| ----------- | --------------------- | -------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/:id`                |                                  | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/guestRouter/signup` | {userName,name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/guestRouter/login`  | {email, password}                | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/guestRouter/logout` | (empty)                          | 204            | 400          | Logs out the user                                            |
| POST        | /guestRouter/booking  | {hostId,guestId,date}            |                |              | To book appointments                                         |
| POST        | /addHome/:id          | {imag,phonNumber,information}    |                |              | So that the host can add information about his اخةث          |
| PUT         | updateHomes           |                                  |                |              | Used to get one exit point document by id                    |
| PUT         | /updateProdile/:id    |                                  |                |              | update host profile                                          |
| PATCH       | /axceptedBokking      |                                  |                |              | chnge request:Axcept                                         |
| PUT         | /rejectedBooking      |                                  |                |              | chnge request:Reject                                         |

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/OwoA2mWv/welcome) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Mdwebs1/finalProject/tree/main/FrontEnd)

[Server repository Link](https://github.com/Mdwebs1/finalProject/tree/main/BackEnd)

https://github.com/Mdwebs1/finalProject

### Slides

The url to your presentation slides

[Slides Link](https://prezi.com/view/t9b2nEwtfMLTpfHZpPrW/)

Wireframe

The url to your presentation slides

[Figma Link](https://www.figma.com/file/rCa94vx4wD4LU1BuOELGA5/Untitled?node-id=0%3A1)

https://ibb.co/zHzCg4W
