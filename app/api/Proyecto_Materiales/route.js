import { NextResponse } from "next/server";
import { getConnection, sql } from "@/lib/db";

export const runtime = "nodejs";
export async function OPTIONS() {
    return new Response(null, {
        status: 204
    });
    
}

export async function GET() {
    try {
        const pool = await getConnection();

        const resultado = await pool.request().query(
             'SELECT id_material, formula, microestructura, id_staging, id_estructura, id_metodo, id_fuente FROM dbo.Material ORDER BY id_material DESC'
            //'SELECT m.id_material, m.formula, m.microestructura, m.id_estructura, m.id_fuente, mp.id_metodo, mp.nombre_metodo FROM dbo.Material m INNER JOIN dbo.Metodo_Procesamiento mp ON m.id_metodo = mp.id_metodo ORDER BY m.id_material desc'
        );

        return NextResponse.json({
            status: "success",
            data: resultado.recordset
        });

    } catch (error) {
        console.error("Ocurrió un error al consultar Materiales");
        return NextResponse.json(
            {
                status: "error",
                message: "No fue posible consultar los registros de Materiales",
                detalle: error.message
            },
            { status: 500 }
        );
    }

}

export async function POST(request) {
    try{
        const datos = await request.json();
        const {
            formula,
            microestructura,
            id_estructura,
            id_fuente 
        } = datos;

        const pool = await getConnection();

        const resultado = await pool.request()
            .input("formula", sql.NVarChar(200), formula.trim())
            .input("microestructura", sql.NVarChar(500), microestructura.trim())
            .input("id_estructura", sql.Int, Number(id_estructura))
            .input("id_fuente", sql.Int, Number(id_fuente))
            .query(`INSERT INTO dbo.Material (
                    formula,
                    microestructura,
                    id_estructura,
                    id_fuente
                )
                OUTPUT
                    INSERTED.id_material,
                    INSERTED.formula,
                    INSERTED.microestructura,
                    INSERTED.id_estructura,
                    INSERTED.id_fuente
                VALUES
                    (
                    @formula,
                    @microestructura,
                    @id_estructura,
                    @id_fuente
                    )
                `
            );

        return NextResponse.json(
            {
                status: "success",
                message: "Se registró el material correctamente",
                data: resultado.recordset[0]
            },
            { status: 201 }
        );

    }catch(error){
        console.error(error);

        return NextResponse.json(
            {
                status: "error",
                message: "Ocurrió un error al insertar el material"
            }
        );
    }
    
}