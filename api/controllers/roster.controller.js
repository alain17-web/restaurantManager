const rosterService = require('../services/roster.service');
const rosterValidator = require('../validators/rosterValidator');
const bookingValidator = require("../validators/bookingValidator");

//See comments in booking.controller to understand the logic on this controller called in the router
const rosterController = {
    //CREATE
    addRoster: async (req, res) => {
        try{
            const validateRoster = await rosterValidator.validate(req.body);

            const {roster} = validateRoster;

            const rosterResult = await rosterService.addRoster({roster})

            res.status(200).json({message:"Roster created successfully.", rosterResult});

        }catch(error){
            if(error.name === 'ValidationError'){
                return res.status(400).json({error: error.message});
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

    //UPDATE
    updateRoster: async (req, res) => {
        try{
            const validateRoster = await rosterValidator.validate(req.body);

            const {roster} = validateRoster;

            const updatedRoster = await rosterService.updateRoster(req.params.id, roster)

            if(updatedRoster){
                res.status(200).json({message:"Roster updated successfully."});
            } else {
                res.status(404).json({error: 'Roster not found or no change made'});
            }
        } catch (error){
            console.error('Error updateRoster controller',error)
            res.status(500).json({message: 'Error updateRoster controller'});
        }
    },

    //DELETE
    deleteRoster: async (req, res) => {
        try{
           const rosterId = req.params.id;

           const deletedRoster = await rosterService.deleteRoster(rosterId);

           if(deletedRoster > 0){
               res.status(200).json({message:"Roster deleted successfully."});
           } else {
               res.status(404).json({error: 'Roster not found'});
           }
        } catch(error){
            console.error('Error deleteRoster controller',error)
            res.status(500).json({message: 'Error deleteRoster controller'});
        }
    }
}

module.exports = rosterController;