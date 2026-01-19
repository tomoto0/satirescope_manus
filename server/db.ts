import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, twitterConfigs, InsertTwitterConfig, postedTweets, InsertPostedTweet } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getTwitterConfigsByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get twitter configs: database not available");
    return [];
  }

  try {
    const configs = await db
      .select()
      .from(twitterConfigs)
      .where(eq(twitterConfigs.userId, userId));
    return configs;
  } catch (error) {
    console.error("[Database] Failed to get twitter configs:", error);
    throw error;
  }
}

export async function getTwitterConfigById(configId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get twitter config: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(twitterConfigs)
      .where(eq(twitterConfigs.id, configId))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get twitter config:", error);
    throw error;
  }
}

export async function createTwitterConfig(config: InsertTwitterConfig) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(twitterConfigs).values(config);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create twitter config:", error);
    throw error;
  }
}

export async function updateTwitterConfig(
  configId: number,
  updates: Partial<InsertTwitterConfig>
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db
      .update(twitterConfigs)
      .set(updates)
      .where(eq(twitterConfigs.id, configId));
  } catch (error) {
    console.error("[Database] Failed to update twitter config:", error);
    throw error;
  }
}

export async function deleteTwitterConfig(configId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db
      .delete(twitterConfigs)
      .where(eq(twitterConfigs.id, configId));
  } catch (error) {
    console.error("[Database] Failed to delete twitter config:", error);
    throw error;
  }
}

export async function getActiveTwitterConfigs() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get active twitter configs: database not available");
    return [];
  }

  try {
    const configs = await db
      .select()
      .from(twitterConfigs)
      .where(eq(twitterConfigs.isActive, 1));
    return configs;
  } catch (error) {
    console.error("[Database] Failed to get active twitter configs:", error);
    throw error;
  }
}

export async function createPostedTweet(tweet: InsertPostedTweet) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(postedTweets).values(tweet);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create posted tweet:", error);
    throw error;
  }
}

export async function getPostedTweetsByConfigId(configId: number, limit = 50) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get posted tweets: database not available");
    return [];
  }

  try {
    const tweets = await db
      .select()
      .from(postedTweets)
      .where(eq(postedTweets.configId, configId))
      .orderBy((t) => t.postedAt)
      .limit(limit);
    return tweets;
  } catch (error) {
    console.error("[Database] Failed to get posted tweets:", error);
    throw error;
  }
}

export async function updateTweetEngagement(
  tweetDbId: number,
  engagement: {
    likeCount: number;
    retweetCount: number;
    replyCount: number;
    impressionCount: number;
  }
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db
      .update(postedTweets)
      .set({
        likeCount: engagement.likeCount,
        retweetCount: engagement.retweetCount,
        replyCount: engagement.replyCount,
        impressionCount: engagement.impressionCount,
        engagementUpdatedAt: new Date(),
      })
      .where(eq(postedTweets.id, tweetDbId));
  } catch (error) {
    console.error("[Database] Failed to update tweet engagement:", error);
    throw error;
  }
}

export async function getAllPostedTweetsWithEngagement(configId: number, limit = 100) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get posted tweets: database not available");
    return [];
  }

  try {
    const tweets = await db
      .select()
      .from(postedTweets)
      .where(eq(postedTweets.configId, configId))
      .orderBy(desc(postedTweets.postedAt))
      .limit(limit);
    return tweets;
  } catch (error) {
    console.error("[Database] Failed to get posted tweets with engagement:", error);
    throw error;
  }
}

export async function getEngagementSummary(configId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get engagement summary: database not available");
    return null;
  }

  try {
    const tweets = await db
      .select()
      .from(postedTweets)
      .where(eq(postedTweets.configId, configId));

    const totalLikes = tweets.reduce((sum, t) => sum + (t.likeCount || 0), 0);
    const totalRetweets = tweets.reduce((sum, t) => sum + (t.retweetCount || 0), 0);
    const totalReplies = tweets.reduce((sum, t) => sum + (t.replyCount || 0), 0);
    const totalImpressions = tweets.reduce((sum, t) => sum + (t.impressionCount || 0), 0);

    return {
      totalTweets: tweets.length,
      totalLikes,
      totalRetweets,
      totalReplies,
      totalImpressions,
      averageLikes: tweets.length > 0 ? Math.round(totalLikes / tweets.length * 10) / 10 : 0,
      averageRetweets: tweets.length > 0 ? Math.round(totalRetweets / tweets.length * 10) / 10 : 0,
      averageReplies: tweets.length > 0 ? Math.round(totalReplies / tweets.length * 10) / 10 : 0,
      averageImpressions: tweets.length > 0 ? Math.round(totalImpressions / tweets.length * 10) / 10 : 0,
    };
  } catch (error) {
    console.error("[Database] Failed to get engagement summary:", error);
    throw error;
  }
}

export async function getTweetsWithTweetId(configId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get tweets with tweet ID: database not available");
    return [];
  }

  try {
    const tweets = await db
      .select()
      .from(postedTweets)
      .where(eq(postedTweets.configId, configId));
    
    // Filter tweets that have a tweetId
    return tweets.filter(t => t.tweetId !== null && t.tweetId !== undefined);
  } catch (error) {
    console.error("[Database] Failed to get tweets with tweet ID:", error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.
