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
        <li><a href="#built-with">Built With</a></li>
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

Discover Sulala, the premier Middle Eastern marketplace for animals, equipment, tools, foods, and products. Experience unrivaled selection, trusted sellers, and seamless transactions. Join a vibrant community dedicated to animal care and find everything you need in one place. Sulala: Your ultimate destination for all things animal-related in the Middle East.

Here's why:

- Unmatched selection: Explore an extensive range of animals, equipment, tools, foods, and products.
- Trusted sellers: Connect with reputable sellers who offer high-quality items.
- Seamless transactions: Enjoy a smooth and secure buying and selling experience.
- Vibrant community: Join a passionate community of animal enthusiasts and professionals.
- Convenience: Find everything you need in one place, saving you time and effort.
- Dedicated to animal care: Access a platform focused on providing the best care for animals.

Experience the excellence of Sulala and elevate your animal-related endeavors in the Middle East today!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The project is built with technologies:

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Tailwind][Tailwindcss]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is a comprehensive guild on how to get started on this project.

### Prerequisites

Make sure you have node and npm installed on your system. Node version `v20.12.2` and NPM version `10.5.0`

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an instruction of installing and setting up sulala app._

1. Setup git with token credential
2. Clone the repo
   ```sh
   git clone https://github.com/DevSulala/Sulala-ShopDashboard.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Configure your environmental variables (in `.env`) using `.env.example`

   ```sh
    BACKEND_BASE_URL = 'http://<url>/'
    FRONTEND_BASE_URL = 'http://<url>/'
    IMAGE_BASE_URL = 'http://<url>/'

    SENTRY_DNS = 'https://<api-key>.ingest.us.sentry.io/<secret-key>'
    SENTRY_AUTH_TOKEN = 'sntrys_<auth-token>'
    SENTRY_ORG = '<sentry-org>'
    SENTRY_PROJECT = '<sentry-project>'

    GOOGLE_ID='<google-id>.apps.googleusercontent.com'
    GOOGLE_SECRET='GOCSPX-<google-secret>'

    NEXT_PUBLIC_GOOGLE_MAPS_KEY='<google-geo-encoding-api-key>'
    NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE=20
    NEXT_PUBLIC_DEFAULT_LOCALE='AR'

    NEXT_PUBLIC_USE_MONITORING='<true | false>'
   ```

5. Run in development mode
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

6. There is also `Dockerfile` and `docker-compose.yml` for quick start for production
   ```sh
    docker compose up --build -d
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Running the app and going to the browser `localhost:3000` if you manually started it or `localhost` if you used docker compose, you will see the landing page .

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Helpers

This project also utilize some helper `scripts` and `git hooks`.

1. Scripts:

- the `scripts` folder holds two types of scripts, for docker, and for git.
- the git scripts are used for tagging images and pushing the tag to source code repository
- the script fetched the current tag from source code repo, and increament the version based on args given.
- argument `--patch` or no argument increases the patch version of the app.
- argument `--minor` increases the minor version of the app.
- argument `--major` inceases the major version of the app.
- _semantic versioning_ strategy is used in this case. to create tag or version, use the following guidelines.
  - **patch**: Apply a patch for bug fixes, style improvements, and other minor changes.
  - **minor**: Apply a minor version for changes that go beyond bug fixes, including the addition of new features, without breaking existing functionality.
  - **major**: Apply a major version for features that introduce significant changes and may cause compatibility issues with previous versions of the app, potentially leading to crashes.

2. Hooks:

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
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Add meaningful commit message (eg `fix: fix issue with something`). Other wise husky will not let you continue.
- [ ] Multi-language Support
  - [ ] Arabic
  - [ ] English
- [ ] Theme Support
  - [ ] Dark Mode
  - [ ] Light Mode

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
