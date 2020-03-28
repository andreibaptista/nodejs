const axios = require('axios');
const Dev = require('../models/Dev');


//index, show, store, update, destroy
module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
 
        return response.json(devs);
    },

    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
       
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

             dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
        return response.json(dev);
    },

    //atualiza um dev - name, bio, localizacao, techs
    async update(request, response) {
        const { github } = request.params;
        const dev = await Dev.findOne({github});
        const { latitude, longitude, techs, ...responset} = req.body;
        responset.github = github;
        if (latitude && longitude)
            var newLocation = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        if (techs)
            var techsArray = str2array(techs);
        const newDev = await Dev.updateOne({ github }, {
            location: (latitude&&longitude) ? newLocation : dev.location,
            techs: techs ? techsArray : dev.techs,
            ...rest
        });

        return res.json({
            modifiedCount: newDev.nModified,
            ok: newDev.ok
        });
    },

    //deleta um unico dev
    // async destroy() {

    // },

}