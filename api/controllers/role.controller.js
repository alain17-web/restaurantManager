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
    },
    //READ
    getAllRoles: async(req,res)=>{
        try{
            const roles = await roleService.getAllRoles();
            res.status(201).json(roles);
        } catch (error){
            console.error('Erreur getAllRoles controller',error)
            res.status(500).json({message: 'Erreur getAllRoles controller'});
        }
    },

    getRoleById: async(req,res)=>{
        try{
            const roleId = req.params.id;
            const role = await roleService.getRoleById(roleId);

            if(role){
                res.status(201).json(role);
            } else {
                res.status(404).json({error: 'Role not Found'});
            }
        } catch (error){
            console.error('Erreur getRoleById controller',error)
            res.status(500).json({message: 'Erreur getRoleById controller'});
        }
    }
}

module.exports = roleController;