const Collection = require('json-collection');

module.exports = class {
    constructor(QAZ) {
        this.QAZ = QAZ;
        this.permissions = new Collection;
        this.loadPermissions();
        this.permList = ["operator", "kick", "ban", "mute", "clear", "roles"];
    }

    loadPermissions = async function () {
        await this.permissions.load(__dirname + "/../Data/permissions.json");
        return;
    }

    checkPermission = async function (user, permission) {
        await this._checkUser(user);

        if(await this.permissions.get(user)["operator"] === true) return true;
        return this.permissions.get(user)[permission];
    }

    removePermission = async function (user, permission) {
        await this._checkUser(user);

        let tempUserRemovePerm = await this.permissions.get(user);
        tempUserRemovePerm[permission] = false;
        this.permissions.data[user] = tempUserRemovePerm;

        return;
    }

    addPermission = async function (user, permission) {
        await this._checkUser(user);

        let tempUserAddPerm = await this.permissions.get(user);
        tempUserAddPerm[permission] = true;

        this.permissions.data[user] = tempUserAddPerm;
        this.permissions.save(__dirname + "/../Data/permissions.json");

        return;
    }

    getPermissions = async function (user) {
        await this._checkUser(user);
        let tempUserGetPerms = await this.permissions.get(user);
        return tempUserGetPerms;
    }

    _checkUser = async function (user) {
        if(user === undefined) return;

        let permList = this.permList;
        let tempCheckup = await this.permissions.get(user);
        if(tempCheckup === undefined) {
            tempCheckup = {};
            
            for(let i in permList){
                if(!tempCheckup[permList[i]]) tempCheckup[permList[i]] = false;
            }

            this.permissions.data[user] = tempCheckup;
            console.log("Created Permissions for " + user);
            this.permissions.save(__dirname + "/../Data/permissions.json");
        } else {
            tempCheckup = await this.permissions.get(user)
            let fix = false;
            for(let i in permList){
                if(tempCheckup[permList[i]] === undefined) {
                    tempCheckup[permList[i]] = false;
                    console.log("Missing " + permList[i] + " in user " + user)
                    fix = true
                }
            }

            if(fix === false) return;

            this.permissions.data[user] = tempCheckup;
            console.log("Fixed Permissions for " + user);
            this.permissions.save(__dirname + "/../Data/permissions.json");   
        }
    }
}