import Redis from "ioredis"

const redisClient = new Redis({
    host: process.env.REDIS_URL, // Endereço do servidor Redis
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
});

redisClient.on("connect", () => console.log("Redis conectado com sucesso."));
redisClient.on("error", (err) => console.error("Erro no Redis:", err));


async function getRedis(value: string): Promise<string | null> {
    return redisClient.get(value);
  }
  

export {redisClient,getRedis}