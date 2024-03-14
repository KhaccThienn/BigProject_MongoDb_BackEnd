const UserController = require('../controllers/UserController');
const CategoryController = require('../controllers/CategoryController');
const BookController = require('../controllers/BookController');
const AuthController = require('../controllers/AuthController');

const verifyToken = require("../middlewares/verifyToken")
const upload = require('../configs/FileUpload');

const api_routes = (app) => {
    // Auth routes
    app.post('/api/auth/login', AuthController.login);
    app.post('/api/auth/register', upload.single('profileImg'), AuthController.register);

    // User routes
    app.get('/api/users', UserController.getAll);
    app.get('/api/user/:id', UserController.getOne);

    app.post('/api/user', upload.single('profileImg'), UserController.create);
    app.put('/api/user/:id', upload.single('profileImg'), UserController.update);
    app.delete('/api/user/:id', UserController.deleted);

    // Category routes
    app.get('/api/categories', CategoryController.getAll);
    app.get('/api/category/:id', CategoryController.getOne);
    
    app.post('/api/category', CategoryController.create);
    app.put('/api/category/:id', CategoryController.update);
    app.delete('/api/category/:id', CategoryController.deleted);
    
    // Book routes
    app.get('/api/books', BookController.getAll);
    app.get('/api/book/:id', BookController.getOne);
    app.get('/api/books/search/:name', BookController.searching);
    app.get('/api/books/limit', BookController.getAllByLimit);

    app.post('/api/book', upload.single('image'), BookController.create);
    app.put('/api/book/:id', upload.single('image'), BookController.update);
    app.delete('/api/book/:id', BookController.deleted);

};

module.exports = api_routes;