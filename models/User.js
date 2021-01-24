module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inkwords: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        matches: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        }
    });

    return User;
};