const Campground = require('../models/campground');

const campgroundsControllers = {}

campgroundsControllers.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

campgroundsControllers.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

campgroundsControllers.createCampground = async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

campgroundsControllers.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    .populate({ 
        path: 'reviews',
        populate: { path: 'author' }
    }).populate('author');
    if(!campground){
        req.flash('error', 'Can\'t find that campground!');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

campgroundsControllers.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}

campgroundsControllers.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

campgroundsControllers.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}

module.exports = campgroundsControllers;