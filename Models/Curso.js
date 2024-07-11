import { DataTypes } from "sequelize";
import db from "../config/db.js"; 
import Usuario from "./Usuario.js";

const Curso = db.define('cursos', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El título no puede ir vacío'
            }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción no puede ir vacía'
            }
        }
    },
    url_imagen:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La URL de la imagen no puede ir vacía'
            }
        }
    },
    url_video: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La URL del video no puede ir vacía'
            }
        }
    },
    url_formulario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La URL del formulario no puede ir vacía'
            }
        }
    },
    url_pdf:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La URL del PDF no puede ir vacía'
            }
        }
    },
    usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
});

Curso.belongsTo(Usuario, { // Esto define la relación y agrega una clave foránea `usuarioId` a `Curso`
    foreignKey: 'usuarioId',
    as: 'usuario', // Alias opcional para la relación
});

export default Curso;