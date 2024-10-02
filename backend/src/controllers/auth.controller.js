// src/controllers/auth.controller.js
const checkAuth = asyncHandler(async (req, res) => {
    return res.status(200).json({ message: 'User is authenticated', user: req.user });
});

// In your routes file
router.get('/check-auth', verifyJWT, checkAuth);
