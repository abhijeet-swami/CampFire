import Log from "../models/log.model.js";

const addLog = async (campId, type) => {
  const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  const log = new Log({
    campId,
    log: type,
    expiresAt,
  });

  void log.save().catch((error) => {
    console.error("Log save failed:", error.message);
  });
};

export default addLog;
