// This is super convenient. All we need to do going forward is to create a view and a route. Our controller action will handle delivering the correct page everytime

exports.show = (req, res) => {
  // Check if our path is the root or a page
  const path = (req.path === '/') ? '/home' : req.path;

  // Render that path
  res.render(`pages${path}`);
}