import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

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
            // 'SELECT id_material, formula, microestructura, id_staging, id_estructura, id_metodo, id_fuente FROM dbo.Material ORDER BY id_material'
            'SELECT m.id_material, m.formula, m.microestructura, m.id_estructura, m.id_fuente, mp.id_metodo, mp.nombre_metodo FROM dbo.Material m INNER JOIN dbo.Metodo_Procesamiento mp ON m.id_metodo = mp.id_metodo ORDER BY m.id_material'
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