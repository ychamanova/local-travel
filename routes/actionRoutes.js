module.exports = app => {
    app.post(
        '/save',
        async (request, response) => {
            let saved = request.body.facility;
            //you can access the current user with request.user
            request.user.savedPlaces.push(saved);
            const user = await request.user.save();
            response.send(user);
        }
    )

    app.get(
        '/savedPlaces',
        async (request, response) => {
            response.send(user.savedPlaces);
        }
    )
}