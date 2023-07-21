const LonaDB = require("lonadb-client");

module.exports = class {
    constructor(QAZ) {
        this.QAZ = QAZ;
        this.permissions = new LonaDB(this.QAZ.config.database.host, this.QAZ.config.database.port, this.QAZ.config.database.user, this.QAZ.config.database.password);
        this.permList = ["operator", "kick", "ban", "mute", "clear", "roles"];
    }

    checkPermission = async function (user, permission) {
        await this._checkUser(user);

        if(await this.permissions.get("QAZbotPerms", user)["operator"] === true) return true;
        return await this.permissions.get("QAZbotPerms", user)[permission];
    }

    removePermission = async function (user, permission) {
        await this._checkUser(user);

        let tempUserRemovePerm = await this.permissions.get("QAZbotPerms", user);
        tempUserRemovePerm[permission] = false;
        await this.permissions.set("QAZbotPerms", user, tempUserRemovePerm);

        return;
    }

    addPermission = async function (user, permission) {
        await this._checkUser(user);

        let tempUserAddPerm = await this.permissions.get("QAZbotPerms", user);
        tempUserAddPerm[permission] = true;

        await this.permissions.set("QAZbotPerms", user, tempUserAddPerm);

        return;
    }

    getPermissions = async function (user) {
        await this._checkUser(user);
        let tempUserGetPerms = await this.permissions.get("QAZbotPerms", user);
        console.log(tempUserGetPerms)
        return tempUserGetPerms;
    }

    _checkUser = async function (user) {
        if(user === undefined) return;

        let permList = this.permList;
        let tempCheckup = await this.permissions.get("QAZbotPerms", user);
        if(tempCheckup === undefined) {
            tempCheckup = {};
            
            for(let i in permList){
                if(!tempCheckup[permList[i]]) tempCheckup[permList[i]] = false;
            }

            await this.permissions.set("QAZbotPerms", user, tempCheckup);
            console.log("Created Permissions for " + user);
        } else {
            tempCheckup = await this.permissions.get("QAZbotPerms", user)
            let fix = false;
            for(let i in permList){
                if(tempCheckup[permList[i]] === undefined) {
                    tempCheckup[permList[i]] = false;
                    console.log("Missing " + permList[i] + " in user " + user)
                    fix = true
                }
            }

            if(fix === false) return;

            await this.permissions.set("QAZbotPerms", user, tempCheckup);
            console.log(tempCheckup + "a")
            console.log("Fixed Permissions for " + user); 
        }
    }
}