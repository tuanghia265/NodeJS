'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RolePermissions.init({
    roleID:DataTypes.INTEGER,
    permissionID:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RolePermissions',
  });
  return RolePermissions;
};