module.exports = (req, res) => {
    console.log(req.session);
    if (req.session && req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(401).json({ message: 'No users logged' });
    }
};
