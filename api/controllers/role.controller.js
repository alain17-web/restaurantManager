const roleService = require("../services/role.service");
const roleValidator = require("../validators/roleValidator")

const roleController = {
    //CREATE
    addRole: async (req, res) => {
        try{
            const validateRoleName = await roleValidator.validate(req.body);

            const {role_name} = validateRoleName;

            const roleResult = await roleService.addRole({role_name})

            res.status(201).json({message: "Role created successfully.", roleResult});

        } catch (error){
            if(error.name === "ValidationError"){
                return res.status(400).json({errors: error.errors});
            }
            res.status(500).json({message: "Error controller creating the role."});
        }
    }
}

module.exports = roleController;