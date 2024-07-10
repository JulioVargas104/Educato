import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcrypt";

const Usuario = db.define('usuarios', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre no puede ir vacío'
        }
      }
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El apellido no puede ir vacío'
        }
      }
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "El correo ya está registrado."
        },
        validate: {
          isEmail: {
            msg: "El correo debe ser un correo válido."
          }
        }
      },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La contraseña no puede ir vacía'
            },
            len: {
                args: [8, 60], // Mínimo 8 caracteres, máximo 60
                msg: 'La contraseña debe tener entre 8 y 60 caracteres'
            }
        }
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'docente'),
        allowNull: false,
        defaultValue: 'docente', // Changed from 'cliente' to 'docente'
        validate: {
            isIn: {
                args: [['admin', 'docente']],
                msg: 'Rol no válido'
            }
        }
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
},
{
    hooks: {
        // Método para ocultar los password
        beforeCreate(usuario) {
            usuario.password = Usuario.prototype.hashPassword(usuario.password);
        }
    }
});

// Método para comparar los password
Usuario.prototype.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

Usuario.prototype.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default Usuario;