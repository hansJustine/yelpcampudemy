
const User = require('../models/user');

const usersControllers = {};

usersControllers.renderRegister = (req, res) => {
    res.render('users/register');
}

usersControllers.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        //Can't await it. Callback!!!
        req.login(registeredUser, (err) => {
            if(err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');       
        })
        
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

usersControllers.renderLogin = (req, res) => {
    res.render('users/login');
}

usersControllers.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo ;
    res.redirect(redirectUrl);
}

usersControllers.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!!!');
    res.redirect('/campgrounds');
}

module.exports = usersControllers;