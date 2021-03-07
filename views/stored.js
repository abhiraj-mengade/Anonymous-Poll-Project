ques.findOne({}, function (err, adventure) {
    res.render('home',{"question": (adventure.ques)})
});

