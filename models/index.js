const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.MARIADB_STRING,
    {
        // logging of SQL queries to terminal
        logging: true,
        define: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            timestamps: true,
        }
    }
);
    
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize)
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;