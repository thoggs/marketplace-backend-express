import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/database";

type ProductAttributes = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare stock: number;
  declare category: string;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: {
          args: 4,
          msg: 'Please enter a valid UUID.',
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a product name.',
        },
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Please enter a valid price.',
        },
        min: {
          args: [ 0 ],
          msg: 'Price must be greater than or equal to zero.',
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Please enter a valid stock quantity.',
        },
        min: {
          args: [ 0 ],
          msg: 'Stock must be greater than or equal to zero.',
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a category.',
        },
      }
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  }
);

export default Product;
