"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Song extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Song.belongsTo(models.User, { foreignKey: "userId" });
        }
    }
    Song.init(
        {
            title: { type: DataTypes.STRING(40), allowNull: false },
            audio: { type: DataTypes.STRING, allowNull: false },
            artwork: { type: DataTypes.STRING },
            userId: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            sequelize,
            modelName: "Song",
        }
    );
    return Song;
};
