import Camp from "../models/camp.model.js";
import Log from "../models/log.model.js";

const scoreTrendingCamp = async () => {
  try {
    const camps = await Camp.find({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    })
      .sort({ totalUser: -1 })
      .limit(150);

    for (const camp of camps) {
      let user = 0,
        post = 0,
        message = 0;

      const logs = await Log.find({
        campId: camp._id,
        createdAt: { $gt: new Date(Date.now() - 60 * 60 * 1000) },
      });

      for (const log of logs) {
        if (log.log === "User") {
          user++;
        } else if (log.log === "Post") {
          post++;
        } else {
          message++;
        }
      }

      const score = post * 3 + user * 2 + message * 1;

      const minutesAgo =
        (Date.now() - camp.lastActivityAt.getTime()) / (1000 * 60);

      const decay = Math.pow(minutesAgo + 1, 0.8);

      camp.trendingScore = score / decay;

      await camp.save();
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { scoreTrendingCamp };
