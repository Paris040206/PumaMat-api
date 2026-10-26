import sql from 'mssql/msnodesqlv8';

const config = {
    connectionString:
        `Driver={ODBC Driver 18 for SQL Server};` +
        `Server=${process.env.DB_SERVER};` +
        `Database=${process.env.DB_NAME};` +
        `Trusted_Connection=yes;` +
        `TrustServerCertificate=yes;`
};

let poolPromise;

export async function getConnection(){
    if(!poolPromise){
        poolPromise = sql.connect(config).catch(error => {
            poolPromise=null;
            throw error;
        })
    }
    return poolPromise;
}

export { sql };


