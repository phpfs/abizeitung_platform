# Angularabi

This project is a platform to collect quotes and comments about other students for the "Abizeitung"

## Firebase Setup
To run this project you need to create a Firebase project and link it to the app using ```firebase init```.

Activate the Hosting, Database and Functions modules but don't overwrite existing folders.

When asked for the hosting path choose ```./dist```

Create the ```environment.ts``` and ```environment.prod.ts``` from the supplied templates and insert the Firebase configuration that you can automatically create on the Dashboard by clicking ```Web Setup```

Insert student and teacher names in the ````data.ts```` file that you can create from the template.

To deploy this project on Firebase run ````ng build -prod```` and then ```firebase deploy```

## Development server

For the development version to work you need to complete the firebase setup and deploy the project once so the functions and database rules are active.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
