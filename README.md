```
                   .d8888b.           888          888
                  d88P  Y88b          888          888
                  Y88b.               888          888
                   "Y888b.   888  888 888  8888b.  888  8888b.
                      "Y88b. 888  888 888     "88b 888     "88b
                        "888 888  888 888 .d888888 888 .d888888
                  Y88b  d88P Y88b 888 888 888  888 888 888  888
                   "Y8888P"   "Y88888 888 "Y888888 888 "Y888888
```

<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/DevSulala/Sulala-ShopDashboard">
    <img src="https://avatars.githubusercontent.com/u/171445244?v=4" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Sulala Dashboard</h3>

  <p align="center">
    A documentation to jumpstart on this projects!
    <br />
    <a href="https://github.com/DevSulala/Sulala-ShopDashboard"><strong>Explore the codes »</strong></a>
    <br />
    <br />
    <a href="https://github.com/DevSulala/Sulala-ShopDashboard">View Demo</a>
    ·
    <a href="https://github.com/DevSulala/Sulala-ShopDashboard/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/DevSulala/Sulala-ShopDashboard/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <!-- <li><a href="#built-with">Built With</a></li> -->
        <li><a href="#overview">Overview</a></li>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#project-goals">Project Goals</a></li>
      </ul>
    </li>
    <li>
      <a href="#architecture">Architecture</a>
      <ul>
        <li><a href="#technology-stack">Technology Stack</a></li>
        <li><a href="#libraries-and-tools">Libraries and Tools</a></li> 
        <li><a href="#folder-structure">Folder Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://sulala.com)

### Overview

Discover Sulala, the premier Middle Eastern marketplace for animals, equipment, tools, foods, and products. Experience unrivaled selection, trusted sellers, and seamless transactions. Join a vibrant community dedicated to animal care and find everything you need in one place. Sulala: Your ultimate destination for all things animal-related in the Middle East.

### Key Features

- Unmatched selection: Explore an extensive range of animals, equipment, tools, foods, and products.
- Trusted sellers: Connect with reputable sellers who offer high-quality items.
- Seamless transactions: Enjoy a smooth and secure buying and selling experience.
- Vibrant community: Join a passionate community of animal enthusiasts and professionals.
- Convenience: Find everything you need in one place, saving you time and effort.
- Dedicated to animal care: Access a platform focused on providing the best care for animals

### Project Goals

1. **Streamline Animal Management**

   - Provide comprehensive tools for tracking animal data, including breed, age, health status, and medical treatments.
   - Integrate with veterinary care records for seamless health monitoring and appointment scheduling.

2. **Enhance Marketplace Operations**

   - Facilitate efficient buying and selling of animals, equipment, tools, foods, and products.
   - Ensure secure transactions with robust payment options and order tracking.

3. **Empower Vendors**

   - Offer a powerful vendor dashboard for managing product listings, inventory, and sales analytics.
   - Enable easy communication with customers for better service and satisfaction.

4. **Optimize Delivery Logistics**

   - Provide a dedicated delivery partner app for real-time order tracking and optimized route planning.
   - Ensure timely and accurate deliveries with direct customer communication.

5. **Foster a Trusted Community**
   - Build a transparent and reliable platform with verified sellers and user reviews.
   - Promote a community of animal enthusiasts and professionals through interactive features and forums.

Experience the excellence of Sulala and elevate your animal-related endeavors in the Middle East today!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Architecture -->

## Architecture

The architecture of the Sulala dashboard frontend is designed to provide a robust, scalable, and maintainable solution for managing a comprehensive marketplace platform. It leverages a combination of modern frameworks, libraries, and tools to ensure a seamless and efficient user experience. The following sections describe the key technologies used in the project, their roles, and how they are utilized.

### Technology Stack

1. **Next.js**

   - **Role:** Next.js is a React framework for server-side rendering and static site generation.
   - **Usage:** We use Next.js to handle routing, server-side rendering, and static generation of pages to improve performance and SEO. It helps streamline the development of the frontend with built-in features and optimizations.

2. **NextAuth**

   - **Role:** NextAuth is a library for handling authentication and authorization in Next.js applications.
   - **Usage:** We use NextAuth to manage user sign-in, sign-out, and session management. It supports various authentication providers, which allows us to offer flexible login options and secure access to user accounts.

3. **React**

   - **Role:** React is a JavaScript library for building user interfaces based on components.
   - **Usage:** React is used to create interactive and dynamic UIs. Its component-based architecture helps in building reusable components and managing state and lifecycle in a structured manner.

4. **Tailwind CSS**

   - **Role:** Tailwind CSS is a utility-first CSS framework for styling applications.
   - **Usage:** We use Tailwind CSS for rapid UI development, providing a consistent design system with utility classes. It allows for flexible and responsive design without writing custom CSS.

5. **DaisyUI**
   - **Role:** DaisyUI is a component library built on top of Tailwind CSS.
   - **Usage:** DaisyUI provides pre-built components that enhance development speed and consistency. We use it to integrate ready-to-use UI elements and components, which align with our design requirements.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Libraries and Tools

1. **ChartJS**

   - **Role:** ChartJS is a library for creating interactive charts and graphs.
   - **Usage:** We use ChartJS to visualize data through various types of charts, such as bar charts and line charts. It helps in presenting analytics and metrics in an interactive and engaging manner.

2. **Framer-motion**

   - **Role:** Framer-motion is a library for animations in React applications.
   - **Usage:** We use Framer-motion to create smooth and dynamic animations for UI components. It helps enhance user experience by providing visually appealing transitions and interactions.

3. **lodash**

   - **Role:** Lodash is a utility library that provides helpful functions for working with arrays, objects, and functions.
   - **Usage:** We use lodash to simplify common programming tasks such as data manipulation and function handling. Its utilities help in writing cleaner and more efficient code.

4. **husky**

   - **Role:** Husky manages Git hooks to automate tasks before commits and pushes.
   - **Usage:** We use husky to enforce code quality by running linting, formatting, and tests automatically during the commit process. It ensures code consistency and reduces manual errors.

5. **dayjs**

   - **Role:** Dayjs is a lightweight library for date and time manipulation.
   - **Usage:** We use dayjs for handling and formatting dates and times. It provides a simple API for parsing, formatting, and manipulating date values, making it easy to manage date-related operations.

6. **intl-tel-input**

   - **Role:** intl-tel-input is a library for managing international telephone input fields.
   - **Usage:** We use intl-tel-input to provide users with a phone number input field that includes country code selection. It helps in standardizing phone number entry and validation across different regions.

7. **libphonenumber-js**

   - **Role:** libphonenumber-js is a library for validating and formatting phone numbers.
   - **Usage:** We use libphonenumber-js to ensure accurate phone number formatting and validation. It helps in processing and validating phone numbers according to international standards.

8. **react-qr-code**

   - **Role:** react-qr-code is a library for generating QR codes within React components.
   - **Usage:** We use react-qr-code to create QR codes for various purposes, such as user authentication or data sharing. It integrates seamlessly with React to provide QR code generation functionality.

9. **zod**

   - **Role:** Zod is a schema validation library for TypeScript and JavaScript.
   - **Usage:** We use Zod to validate user input and define expected data schemas. It helps in ensuring that data conforms to defined structures and provides clear error messages when validation fails.

10. **zustand**

    - **Role:** Zustand is a state management library for React applications.
    - **Usage:** We use Zustand to manage global state across the application. It provides a simple API for state management and helps in maintaining a consistent application state.

11. **Sentry**

    - **Role:** Sentry is an error tracking and performance monitoring tool.
    - **Usage:** We use Sentry to monitor and track errors, performance issues, and application health. It provides real-time insights and helps in identifying and resolving issues quickly.

12. **Docker**
    - **Role:** Docker is a containerization platform for creating and managing consistent development and production environments.
    - **Usage:** We use Docker to containerize the application, ensuring that it runs consistently across different environments. It helps in simplifying deployment and managing dependencies.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Folder Structure

_Below is an overview of the folder structure used in this project. It uilizes the nextjs conventional app router folder structure._

```
├── CHANGELOG
├── commitlint.config.cts
├── docker-compose.yml
├── Dockerfile
├── LICENSE.txt
├── messages                       # 🗣 Translation files like ar.json
├── package.json
├── PROJECT_GUIDELINES.md
├── public                         # 🖼️ Assets and Images
├── README.md
├── scripts                        # 🛠️ Scripts to facilitate development process
│   ├── docker
│   │   ├── BUILD.sh
│   │   └── ...
│   └── git
│       ├── BUMP_VERSION.sh
│       └── ...
├── sentry.client.config.ts
├── ...
├── src
│   ├── actions
│   │   ├── admin-manage           # 🛠️ Server Action for making API requests
│   │   │   ├── answer-support-request.ts
│   │   │   ├── ...
│   │   ├── ...
│   │   ├── google                 # 🌍 For Google Geolocation encoding
│   │   │   ├── get-location-geocode.ts
│   │   │   └── get-location-suggestion.ts
│   │   ├── mapper                 # 🔄 For Data Transfer Objects
│   │   │   ├── animal-mapper.ts
│   │   │   ├── ...
│   ├── app
│   │   ├── api                    # 🔐 For Google Authentication and API requests to Next.js
│   │   │   └── auth
│   │   │       └── [...nextauth]
│   │   │           └── route.ts
│   │   ├── error.tsx              # 🚫 Handling Errors
│   │   ├── favicon.ico
│   │   ├── global-error.tsx       # 🚫 Handling Global Errors
│   │   ├── globals.css
│   │   ├── [lang]                 # 🌐 For Localization
│   │   │   ├── api                # 🔐 For Google Authentication and API requests to Next.js
│   │   │   │   └── auth
│   │   │   │       └── [...nextauth]
│   │   │   │           └── route.ts
│   │   │   ├── auth               # 🔑 Authentication related pages for Vendor and Admin
│   │   │   │   ├── approval
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── ...
│   │   │   ├── components          # 🛠️ Common Components
│   │   │   │   ├── ErrorDisplay.tsx
│   │   │   │   ├── LandingNavBar.tsx
│   │   │   │   ├── LangSwitch.tsx
│   │   │   │   ├── LogoutSwitch.tsx
│   │   │   │   ├── SelectAccount.tsx
│   │   │   │   ├── ThemeSwitch.tsx
│   │   │   │   └── WebsiteUsageAgreement.tsx
│   │   │   ├── dashboard           # 📊 Dashboard related pages for Vendor and Admin
│   │   │   │   ├── (admin)         # 🛠️ Admin page group (the brace won't have effect on route URL)
│   │   │   │   │   ├── customer-support
│   │   │   │   │   │   ├── detail
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   └── utils
│   │   │   │   │   │   │       └── helper.util.ts
│   │   │   │   │   │   ├── error.tsx
│   │   │   │   │   │   ├── loading.tsx
│   │   │   │   │   │   ├── not-found.tsx
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── schema  # 📚 For Table Schema
│   │   │   │   │   │       ├── data.ts
│   │   │   │   │   │       ├── schema.ts
│   │   │   │   │   │       └── type.ts
│   │   │   │   │   ├── ...
│   │   │   │   │   └── statistics  # 📈 For Statistics
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       ├── ...
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── ...
│   │   │   ├── error.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── opengraph-image.tsx # 🖼️ For Open Graph Image description (LinkedIn, Twitter, etc.)
│   │   │   ├── page.tsx
│   │   │   └── ...
│   │   ├── layout.tsx
│   │   ├── manifest.ts             # 📄 For PWA and SEO Indexing
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   └── sitemap.ts              # 🗺️ For Web Crawlers
│   ├── components                  # 🔧 Common Components for all Pages
│   │   ├── AuthWithEmail.tsx
│   │   ├── AuthWithPhone.tsx
│   │   └── common
│   │       ├── form
│   │       │   ├── ColorPaletteInput.tsx
│   │       │   └── ...
│   │       ├── modal
│   │       │   ├── CropImageModal.tsx
│   │       │   └── ...
│   │       ├── table
│   │       │   ├── TableActions.tsx
│   │       │   └── ...
│   │       └── ui
│   │           ├── BackButton.tsx
│   │           └── ...
│   ├── config
│   │   ├── table.config.ts
│   │   └── urls.ts
│   ├── constants
│   │   ├── countries.json
│   │   └── ...
│   ├── error                       # 🛠️ Custom Errors
│   │   └── custom-zod.error.ts
│   ├── hooks
│   │   ├── useCreateQueryString.ts
│   │   └── ...
│   ├── i18n                        # 🌐 Localization Config
│   │   ├── config.ts
│   │   └── navigation.ts
│   ├── i18n.ts
│   ├── instrumentation.ts          # 📊 For Instrumentation and Monitoring with Sentry
│   ├── lib                         # 🛠️ Common Libraries for all Pages
│   │   ├── detect
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   └── ...
│   ├── middleware                  # 🔒 Middleware
│   │   ├── authMiddleware.ts
│   │   └── ...
│   ├── middleware.ts
│   ├── providers                   # 🛠️ Zustand Store Providers
│   │   └── setup-account-store-provider.tsx
│   ├── stores
│   ├── types
│   │   ├── props.type.ts
│   │   └── ...
│   └── utils
│       ├── convertDataURLtoFile.ts
│       └── ...
├── ...
└── tailwind.config.ts
```

This Project utilizes NextJs.

1. **SSR (Server Side Rendering)**:

- Mainly for SEO Optimization and protecting some data fetching endpoints like google map key and reduce request and extra calculation on the users browser.

2. **SSG (Server Side Generation)**:

- The landing page is made to be SSG to reduce server side rendering on each request and since there is no data fetching needed for the landing page.

3. **CSR (Client Side Rendering)**:

- Most of Dynamic Forms and Input uses CSR for interactivity with the user

4. **SA (Server Actions)**:

- All of data request to the backend are made with the new nextjs server actions. This enable us to request data using Fetch and also stateful response using FormState. Beside this, it hides the implementation and url, enabling us to secure google maps key and other things.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is a comprehensive guild on how to get started on this project.

### Prerequisites

Make sure you have node and npm installed on your system. Node version `v20.12.2` and NPM version `10.5.0`. You can install latest version of npm and node using the following command.

- npm

  ```sh
  npm install npm@latest -g
  ```

  or using nvm

  ```sh
  # 1. Installs nvm (Node Version Manager)

  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  # 2. Download and install Node.js (you may need to restart the terminal)

  nvm install 20

  # 3. Verifies the right Node.js version is in the environment

  node -v # should print `v**.**.**`

  # 4. Verifies the right npm version is in the environment

  npm -v # should print `**.**.**`
  ```

You will also need docker installed on you machine. We used docker with version of `26.1.0` . We suggest to use same or above to follow up with this instruction. For installation of latest docker, you can run using the following command

- docker

  ```sh
   # 1. download the script

   curl -fsSL https://get.docker.com -o install-docker.sh

   # 2. verify the script's content

   cat install-docker.sh

   # 4. run the script either as root, or using sudo to perform the installation.

   sudo sh install-docker.sh
  ```

````

### Installation

_Below is an instruction of installing and setting up sulala app._

1. Setup git with token credential
2. Clone the repo
   ```sh
   git clone https://github.com/DevSulala/Sulala-ShopDashboard.git
````

3. Install NPM packages
   ```sh
   npm install
   ```
4. Configure your environmental variables (in `.env`) using `.env.example`

   ```sh
    # backend api url
    BACKEND_BASE_URL = 'http://<url>/'
    # the deployed frontend url of this website
    FRONTEND_BASE_URL = 'http://<url>/'
    # the url for images bucket
    IMAGE_BASE_URL = 'http://<url>/'

    # sentry dns
    SENTRY_DNS = 'https://<api-key>.ingest.us.sentry.io/<secret-key>'
    # sentry auth token
    SENTRY_AUTH_TOKEN = 'sntrys_<auth-token>'
    # sentry organization id
    SENTRY_ORG = '<sentry-org>'
    # sentry project id
    SENTRY_PROJECT = '<sentry-project>'

    # google id for google signup
    GOOGLE_ID='<google-id>.apps.googleusercontent.com'
    # google secret key for google signup
    GOOGLE_SECRET='GOCSPX-<google-secret>'

    # random key for next-auth
    NEXTAUTH_SECRET='<next-auth-secret-key>'
    # random key for next-auth
    SECRET="<secret-key>"
    # production url for this website
    NEXTAUTH_URL='https://<next-auth-url>/'
    # development url for this website
    NEXTAUTH_URL_INTERNAL='http://<next-auth-dev-url>/'

    # google maps key for location auto complete
    NEXT_PUBLIC_GOOGLE_MAPS_KEY='<google-geo-encoding-api-key>'
    # default number of items to be displayed
    NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE='20'
    # default localization to redirect user when no locale found
    NEXT_PUBLIC_DEFAULT_LOCALE='AR'
    # to use sentry for monitoring bugs, errors and web performance
    NEXT_PUBLIC_USE_MONITORING='<true | false>'
   ```

5. Run in development mode
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

6. There is also `Dockerfile` and `docker-compose.yml` for quick start
   **comment out the image that points to the docker hub registry and make it to build from the code instead of pulling it from registry as shown below**
   ```yml
      ...
      dashboard:
         # image: yosephtadesse/sulala-dashboard:latest
         image: sulala-dashboard
         build:
           context: .
           dockerfile: Dockerfile
         restart: unless-stopped
      ...
   ```
   > Otherwise you will get permission denied error. If you want to run it by pulling the image from docker registry, you should configure the credentials first. You can find how to configure on the topic `Development, Building and Pushing images to Docker HUB` below
   > **build and run the docker container**
   ```sh
    npm run docker:build
    npm run docker:run
   ```
   > If you keep getting ` 401 Unauthorized` Error, try running
   ```sh
   npm run docker:logout
   npm run docker:build
   npm run docker:run
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

### Development, Building and Pushing images to Docker HUB

_Below is an instruction of installing and setting up sulala app._

- The image is stored in a docker registry opened with email address yoseph@sulala.com
- For credential, please ask your contractor or employer

1. Login into github account
   ```sh
   npm run docker:login
   ```
2. Configure your environmental variables (in `.env`) using `.env.example`

   ```sh
    # backend api url
    BACKEND_BASE_URL = 'http://<url>/'
    # the deployed frontend url of this website
    FRONTEND_BASE_URL = 'http://<url>/'
    # the url for images bucket
    IMAGE_BASE_URL = 'http://<url>/'

    # sentry dns
    SENTRY_DNS = 'https://<api-key>.ingest.us.sentry.io/<secret-key>'
    # sentry auth token
    SENTRY_AUTH_TOKEN = 'sntrys_<auth-token>'
    # sentry organization id
    SENTRY_ORG = '<sentry-org>'
    # sentry project id
    SENTRY_PROJECT = '<sentry-project>'

    # google id for google signup
    GOOGLE_ID='<google-id>.apps.googleusercontent.com'
    # google secret key for google signup
    GOOGLE_SECRET='GOCSPX-<google-secret>'

    # random key for next-auth
    NEXTAUTH_SECRET='<next-auth-secret-key>'
    # random key for next-auth
    SECRET="<secret-key>"
    # production url for this website
    NEXTAUTH_URL='https://<next-auth-url>/'
    # development url for this website
    NEXTAUTH_URL_INTERNAL='http://<next-auth-dev-url>/'

    # google maps key for location auto complete
    NEXT_PUBLIC_GOOGLE_MAPS_KEY='<google-geo-encoding-api-key>'
    # default number of items to be displayed
    NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE='20'
    # default localization to redirect user when no locale found
    NEXT_PUBLIC_DEFAULT_LOCALE='AR'
    # to use sentry for monitoring bugs, errors and web performance
    NEXT_PUBLIC_USE_MONITORING='<true | false>'
   ```

   > There are some environmental properties needed at build time, so make sure you have one before building the docker image

3. Build the docker image
   ```sh
   npm run docker:build
   ```
   > This command will pick the latest version from git tag, and apply the version tag on the image
   > You will also be prompt to tag the version latest or not. Tagging the latest will result in remove latest tag from the previous image and apply the tag on the current one.
4. Push the docker image
   ```sh
   npm run docker:push
   ```
   > This will push images with the version tag and with the latest tag image.
   > This command will save time and energy from manually writing all the commands and helps in being consistant
5. Running a container from the image
   ```sh
   npm run docker:run
   ```
   > This will run two containers, one the built dashboard container and one a portainer container to monitor containers with GUI.
   > Before running, make sure port 3000 is not occupied by other application.
6. You can also check if the image with the right tag exist by going to `https://hub.docker.com/repository/docker/yosephtadesse/sulala-dashboard/general`
   > This registry repository is PRIVATE, so make sure you have the right access before everything.

### Debugging, Error tracking and Performance Monitoring

_Below is an instruction of debugging, error tracking and performace monitoring of sulala app._

- This application utilizes the brand new nextjs perfomance monitoring hook `instrumentation hook` along side with `sentry`
  > you can read more about instrumentation hook from this `https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation`
  > and about sentry from this `https://docs.sentry.io/platforms/javascript/guides/nextjs/`.
- For local development, debugger is already configure for vscode users. You can check it in `.vscode` folder in this repository. All you have to do is start the debugger using `F5` command on your PC keyboard.
- For production, Sentry and Nextjs Instrumentation Hook is already configured. you can go to `https://sulala.sentry.io/issues/?project=4507542365995008`. You can easily see the trigger, user actions, the request time that cause the bug to happen. We are on Free Plane, so there might be some threshold on what you can do.

### Versioning and Releasing

_Below is an instruction of versioning and release of sulala app._

This application uses semantic versioning. more on this on section (`Helpers`)

1. To run patch version update run
   ```sh
   npm run tag:version:patch
   ```
   yea i know. that's pretty mouthful. or instead you can run
   ```sh
   ./scripts/git/INIT_TAG.sh --patch
   ```
2. To run minor version, you probably guessed it
   ```sh
   npm run tag:version:minor
   ```
   or instead you can run
   ```sh
   ./scripts/git/INIT_TAG.sh --minor
   ```
3. To run major version
   ```sh
   npm run tag:version:major
   ```
   or instead you can run
   ```sh
   ./scripts/git/INIT_TAG.sh --major
   ```

## SEO Optimization

This website is built to be friendly with SEO engines. Below is list of optimization techniques this project utilizes.

1. **Manifest File**: is a simple file that tells the users browser about the website, and how it should be installed on the users mobile or desktop device. This makes it possible that this website to be installed on users mobile application as PWA website

2. **OpenGraph**: this allows us to set Open Graph and Twitter images for a route segment. They are useful for setting the images that appear on social networks and messaging apps when a user shares a link to sulala site.

3. **SiteMaps**: is a file that contains information about this site's pages, images, and other files and the relationships between them. Search engines like Google read this file to more intelligently crawl your site.

4. **Robots File**: is a file that tells search engine crawlers or bots which URLs they can access or not on your website. This help us to prevent search engines from indexing certain private pages

5. **MetaTags(title and description)**: this defines the application meta data dynamically (in arabic or in english dynamically) and help search enginer to index the page

6. **Canonical Tags**: this helps search engines understand which version of website page should be preferred version when multiple pages have similar or identical content. Since this website have only one version, the canonical url might not have usecase, but it is implemented incase this website going to have multiple versions in the future.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Running the app and going to the browser `localhost:3000`, you will see the landing page .

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Helpers

This project also utilize some helper `scripts` and `git hooks`.

1. Scripts:

- the `scripts` folder holds two types of scripts, for docker, and for git.
- the git scripts are used for tagging commits and pushing the tag to source code repository
- the docker scripts are used for building docker images and pushing it to docker registry
- the script increament the version based on args given.
- argument `--patch` or no argument increases the patch version of the app.
- argument `--minor` increases the minor version of the app.
- argument `--major` inceases the major version of the app.
- _semantic versioning_ strategy is used in this case. to create tag or version, use the following guidelines.
  - **patch**: Apply a patch for bug fixes, style improvements, and other minor changes.
  - **minor**: Apply a minor version for changes that go beyond bug fixes, including the addition of new features, without breaking existing functionality.
  - **major**: Apply a major version for features that introduce significant changes and may cause compatibility issues with previous versions of the app, potentially leading to crashes.

1. Hooks:

- This project utilizes Git hooks to perform various operations on Git actions, such as:
  - Linting and formatting code using Prettier, and checking commit messages before committing changes (`pre-commit`).
  - Standardizing commit messages (`commit-msg`).
  - Running tests before pushing changes (`pre-push`).
  - Automatically tagging code and installing packages after merging and pulling changes (`post-merge`).

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [x] Add meaningful commit message (eg `fix: fix issue with something`). Other wise husky will not let you continue.
- [x] Multi-language Support
  - [x] Arabic
  - [x] English
- [x] Theme Support
  - [x] Dark Mode
  - [x] Light Mode
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme

_For more examples, please refer to the [CHANGELOG](./CHANGELOG)_

See the [open issues](https://github.com/DevSulala/Sulala-ShopDashboard/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Started working on this project? Please follow the following guidline to get started on working on this project

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
   > when commiting message, use the git commit message conventions by prefixing you commit message with `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `revert`, `perf`, `vercel`
   > eg.
   ```bash
   git commit -m 'feat: added something'
   ```
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Sulala - [@sulala_twitter](https://twitter.com/your_username) - email@sulala.com

Project Link: [https://github.com/DevSulala/Sulala-ShopDashboard](https://github.com/DevSulala/Sulala-ShopDashboard)

[sulala.com](https://sulala.com/en)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/DevSulala/Sulala-ShopDashboard/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/DevSulala/Sulala-ShopDashboard/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/DevSulala/Sulala-ShopDashboard/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/DevSulala/Sulala-ShopDashboard/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/DevSulala/Sulala-ShopDashboard/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: /public/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwindcss]: https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
