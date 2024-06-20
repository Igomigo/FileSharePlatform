# FileSharePlatform

A platform to upload, view, and manage files with user authentication, permission controls, and thumbnail generation. This project focuses on building a file management platform using technologies listed in the technologies section of this file. The platform allows users to upload and view files, with features like user authentication, file listing, uploading, permission changing, file viewing, and thumbnail generation. The project involves creating an API with Express, user authentication, data storage in MongoDB and Redis, and setting up a background worker. It also includes testing for various components and endpoints using tools like Mocha.

## Features

- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://www.redis.io/)
- [Image-thumbnail](https://www.npmjs.com/package/image-thumbnail)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Igomigo/FileSharePlatform.git
   ```
2. Install dependencies
   ```sh
   cd FileSharePlatform
   npm install
   ```
3. Start the server
   ```sh
   npm start
   ```
4. Start the server for development
   ```sh
   npm run devstart
   ```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Redis
- Kue
- Mongoose
- Image-thumbnail

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
