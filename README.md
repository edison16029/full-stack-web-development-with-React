# Full-Stack-Web-Development-with-React

This project is based on the following course work
- "Full-Stack Web Development with React" by "THE HONG KONG UNIVERSITY OF SCIENCE AND TECHNOLOGY" , a 4 Course Specialisation.
- Course 1 : Front-End Web UI Frameworks and Tools: Bootstrap 4
- Course 2 : Front-End Web Development with React 
- Course 3 : Multiplatform Mobile App Development with React Native 
- Course 4 : Server-side Development with NodeJS, Express and MongoDB 
- Link : https://www.coursera.org/programs/ssn-college-of-engineering-on-coursera-3vm49/browse?productId=x8mwvRC8EeiB6Qq6n4PnfA&productType=s12n&query=Full-Stack+Web+Development+with+React&showMiniModal=true

# React/confusion 
This folder is the working directory of the Course 2 - React Web App.
The WebApp is hosted using an Amazon S3 Bucket and the data is served using a JsonServer through Heroku.
Link : http://reactlearningconfusionwebapp.s3-website.ap-south-1.amazonaws.com
Json - Server link : https://react-confusion-web-app.herokuapp.com/

# ReactNative/confusion 
This folder is the working directory of the Course 3 - React Native Hybrid Mobile App.
The parent folder contains the apk.
If you want to run the app on Expo Client, goto : https://expo.io/@edison16029/confusion

# json-server
This folder is the json server set up for development purpose.
To run the React Web App, start this server as 
> json-server --watch db.json -d 2000 -p 3001
