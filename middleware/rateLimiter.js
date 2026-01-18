import redis from "../config/redis.js";

export const rateLimiter = async (req, res, next) => {
  try {
    // For now, identify user by IP
    const userKey = `rate:${req.ip}`;

    const requests = await redis.incr(userKey);

    // First request → set expiry
    if (requests === 1) {
      await redis.expire(userKey, 60); // 60 seconds window
    }

    if (requests > 5) {
      return res.status(429).json({
        message: "Too many requests. Please slow down.",
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    return res.status(500).json({ message: "Rate limiter failed" });
  }
};
