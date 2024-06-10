const rosterService = require('../services/roster.service');
const rosterValidator = require('../validators/rosterValidator');

const rosterController = {
    //CREATE
    addRoster: async (req, res) => {
        try{
            const validateRoster = await rosterValidator.validate(req.body);

            const {roster} = validateRoster;

            const rosterResult = await rosterService.addRoster({roster})

            res.status(201).json({message:"Roster created successfully.", rosterResult});

        }catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({errors: error.errors});
            }
            res.status(500).json({message: "Error controller creating the roster"});
        }
    },

    //READ
    getAllRosters: async(req,res)=>{
        try{
            const rosters = await rosterService.getAllRosters();
            res.status(200).json(rosters);
        } catch(error){
            console.error('Error getAllRosters controller',error)
            res.status(500).json({message:"Error getAllRosters controller"});
        }
    },
}

module.exports = rosterController;