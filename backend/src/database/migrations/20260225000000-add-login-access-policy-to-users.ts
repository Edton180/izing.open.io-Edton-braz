import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("Users", "loginAllowedStartTime", {
      type: DataTypes.TIME,
      allowNull: true
    });

    await queryInterface.addColumn("Users", "loginAllowedEndTime", {
      type: DataTypes.TIME,
      allowNull: true
    });

    await queryInterface.addColumn("Users", "allowedIpList", {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: null
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("Users", "allowedIpList");
    await queryInterface.removeColumn("Users", "loginAllowedEndTime");
    await queryInterface.removeColumn("Users", "loginAllowedStartTime");
  }
};
