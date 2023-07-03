const customMiddleware = (req, res, next) => {
    // Add your custom middleware logic here
    console.log("Custom middleware executed");
    
    // Example: Check if the user is authenticated
    if (req.isAuthenticated()) {
      // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authenticated, redirect to the login page
      res.redirect("/login");
    }
  };
  
  module.exports = customMiddleware;
  