import Redis from "ioredis"

const redisClient = new Redis({
    host: "redis-11257.c308.sa-east-1-1.ec2.redns.redis-cloud.com", // Endereço do servidor Redis
    port: 11257,
    password: "Cnm3g3kjF11BkEFxufup2DXDjHInl8Sq"
});

redisClient.on("connect", () => console.log("Redis conectado com sucesso."));
redisClient.on("error", (err) => console.error("Erro no Redis:", err));


async function getRedis(value: string): Promise<string | null> {
    return redisClient.get(value);
  }
  

export {redisClient,getRedis}