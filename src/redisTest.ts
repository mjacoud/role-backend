import { redisClient } from "./redisConfig";

(async () => {
  try {
    await redisClient.set("testKey", "testValue");
    console.log("Valor armazenado no Redis com sucesso.");

    const value = await redisClient.get("testKey");
    console.log("Valor recuperado do Redis:", value);

    await redisClient.del("testKey");
    console.log("Chave removida com sucesso.");
  } catch (error) {
    console.error("Erro ao testar Redis:", error);
  } finally {
    redisClient.quit(); // Finaliza a conexão
  }
})();
