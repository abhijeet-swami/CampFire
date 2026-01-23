import Log from "../models/log.model.js";
import Camp from "../models/camp.model.js";

const addLog = async (campId, type) => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const log = new Log({
    campId,
    log: type,
    expiresAt,
  });

  await Camp.updateOne(
    { _id: campId },
    { $set: { lastActivityAt: new Date() } },
  );

  void log.save().catch((error) => {
    console.error("Log save failed:", error.message);
  });
};

export default addLog;
