module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    },
    publishedDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return Book;
};
