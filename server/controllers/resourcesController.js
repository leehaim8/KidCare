const Resources = require('../models/resourcesModel');

const resourceController = {
    async getResources(req, res) {
        try {
            const resources = await Resources.find();
            res.status(200).json(resources);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
module.exports = { resourceController };