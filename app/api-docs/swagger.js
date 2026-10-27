
export const swaggerSpec = {
    openapi: "3.0.3",

    info: {
        title: "API de Materiales",
        version: "1.0.0",
        description: "API desarrollada con Next.js y SQL Server para IT-PRO para registrar materiales"
    },

    paths: {
        "/api/Proyecto_Materiales": {
            get: {
                summary: "Consultar materiales",
                tags: ["Materiales"],

                responses: {
                    "200": {
                        description: "Consulta exitosa"
                    },
                    "500": {
                        description: "Error de servidor"
                    }
                }
            },

            post: {
                summary: "Registrar materiales",
                tags: ["Materiales"],

                requestBody: {
                    required: true,

                    content: {
                        "application/json": {
                            schema: {
                                type: "object",

                                required: [
                                    "formula",
                                    "microestructura",
                                    "id_estructura",
                                    "id_fuente"
                                ],

                                properties: {
                                    formula: {
                                        type: "string",
                                        example: "Al0.25 Co1 Fe1 Ni1"
                                    },

                                    microestructura: {
                                        type: "string",
                                        example: "FCC+BCC"
                                    },

                                    id_estructura: {
                                        type: "int",
                                        example: 1
                                    },

                                    id_fuente: {
                                        type: "int",
                                        example: 1
                                    }
                                }
                            }
                        }
                    }
                },

                responses: {
                    "201": {
                        description: "Material registrado"
                    },
                    "400": {
                        description: "Datos inválidos"
                    },
                    "409": {
                        description: "Registro duplicado"
                    },
                    "500": {
                        description: "Error de servidor"
                    }
                }
            }
        }

        // "/api/Proyecto_Materiales/con-direccion": {
        //     post: {
        //         summary: "Registrar alumno con dirección",
        //         description:
        //             "Ejecuta el procedimiento almacenado sp_RegistrarAlumnoCompleto.",
        //         tags: ["Alumnos"],

        //         requestBody: {
        //             required: true,

        //             content: {
        //                 "application/json": {
        //                     schema: {
        //                         type: "object",

        //                         required: [
        //                             "numCuenta",
        //                             "nombre",
        //                             "apellidoPaterno",
        //                             "apellidoMaterno",
        //                             "calle",
        //                             "numeroExterior",
        //                             "codigoPostal"
        //                         ],

        //                         properties: {
        //                             numCuenta: {
        //                                 type: "string",
        //                                 example: "999999996"
        //                             },
        //                             nombre: {
        //                                 type: "string",
        //                                 example: "Laura"
        //                             },
        //                             apellidoPaterno: {
        //                                 type: "string",
        //                                 example: "Pérez"
        //                             },
        //                             apellidoMaterno: {
        //                                 type: "string",
        //                                 example: "López"
        //                             },
        //                             calle: {
        //                                 type: "string",
        //                                 example: "Av. Universidad"
        //                             },
        //                             numeroExterior: {
        //                                 type: "string",
        //                                 example: "300"
        //                             },
        //                             codigoPostal: {
        //                                 type: "string",
        //                                 example: "04360"
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         },

        //         responses: {
        //             "201": {
        //                 description: "Alumno y dirección registrados"
        //             },
        //             "400": {
        //                 description: "Datos inválidos"
        //             },
        //             "409": {
        //                 description: "Registro duplicado"
        //             },
        //             "500": {
        //                 description: "Error de servidor"
        //             }
        //         }
        //     }
        // }
    }
};