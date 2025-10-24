import dotenv from "dotenv"

dotenv.config();


interface EnvConfig {
    PORT: number,
    DB_URL: string,
    NODE_ENV: "devolopment" | "production",
    JWT_ACCES_SECRET: string,
    JWT_ACCES_EXPIRE: string,
    BCRYPT_SALT_ROUNDE: string,
    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CLIENT_ID: string,
    EXPRESS_SESSION_SECRECT: string,
    GOOGLE_CALL_BACK_URL: string,
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariable: string[] = ["PORT",
        "DB_URL",
        "NODE_ENV",
        "JWT_ACCES_SECRET",
        "JWT_ACCES_EXPIRE",
        "BCRYPT_SALT_ROUNDE",
        "GOOGLE_CLIENT_SECRET",
        "GOOGLE_CLIENT_ID",
        "EXPRESS_SESSION_SECRECT",
        "GOOGLE_CALL_BACK_URL",
    ];

    requiredEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`missing required environment variable ${key}`)
        }
    })

    return {
        PORT: Number(process.env.PORT),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "devolopment",
        BCRYPT_SALT_ROUNDE: process.env.BCRYPT_SALT_ROUNDE as string,
        JWT_ACCES_EXPIRE: process.env.JWT_ACCES_EXPIRE as string,
        JWT_ACCES_SECRET: process.env.JWT_ACCES_SECRET as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        EXPRESS_SESSION_SECRECT: process.env.EXPRESS_SESSION_SECRECT as string,
        GOOGLE_CALL_BACK_URL: process.env.GOOGLE_CALL_BACK_URL as string,


    }
}

export const envVarse = loadEnvVariables();
