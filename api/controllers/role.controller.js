const roleService = require("../services/role.service");
const roleValidator = require("../validators/roleValidator")

const roleController = {
    //CREATE
    addRole: async (req, res) => {
        try{
            const validateRoleName = await roleValidator.validate(req.body);

            const {role_name} = validateRoleName;

            const roleResult = await roleService.addRole({role_name})

            res.status(200).json({message: "Role created successfully.", roleResult});

        } catch (error){
            if(error.name === "ValidationError"){
                return res.status(400).json({error: error.message});
            }
            res.status(500).json({message: "Error controller creating the role."});
        }
    },
    //READ
    getAllRoles: async(req,res)=>{
        try{
            const roles = await roleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error){
            console.error('Error getAllRoles controller',error)
            res.status(500).json({message: 'Error getAllRoles controller'});
        }
    },

    getRoleById: async(req,res)=>{
        try{
            const roleId = req.params.id;
            const role = await roleService.getRoleById(roleId);

            if(role){
                res.status(200).json(role);
            } else {
                res.status(404).json({error: 'Role not Found'});
            }
        } catch (error){
            console.error('Error getRoleById controller',error)
            res.status(500).json({message: 'Error getRoleById controller'});
        }
    },

    //UPDATE
    updateRole: async(req,res)=>{
        try{
            const validateRoleName = await roleValidator.validate(req.body);

            const {role_name} = validateRoleName;

            const updatedRole = await roleService.updateRole(req.params.id, role_name);

            if(updatedRole){
                res.status(200).json({message: "Role updated successfully."});
            } else {
                res.status(404).json({error: 'Role not Found or no change made'});
            }

        } catch (error){
            console.error('Error updateRole controller',error)
            res.status(500).json({message: 'Error updateRole controller'});
        }
    },

    //DELETE
    deleteRole: async(req,res)=>{
        try{
            const roleId = req.params.id;

            const deletedRole = await roleService.deleteRole(roleId);

            if(deletedRole > 0){
                res.status(200).json({message: "Role deleted successfully."});
            } else {
                res.status(404).json({error: 'Role not Found'});
            }
        } catch (error){
            console.error('Error deleteRole controller',error)
            res.status(500).json({message: 'Error deleteRole controller'});
        }
    }
}

module.exports = roleController;