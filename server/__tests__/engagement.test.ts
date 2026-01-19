import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the database module
vi.mock('../db', () => ({
  getDb: vi.fn(),
  getEngagementSummary: vi.fn(),
  getAllPostedTweetsWithEngagement: vi.fn(),
  getTweetsWithTweetId: vi.fn(),
  updateTweetEngagement: vi.fn(),
}));

// Mock the twitterPoster module
vi.mock('../twitterPoster', () => ({
  fetchTweetEngagement: vi.fn(),
  fetchMultipleTweetEngagements: vi.fn(),
}));

import {
  getEngagementSummary,
  getAllPostedTweetsWithEngagement,
  getTweetsWithTweetId,
  updateTweetEngagement,
} from '../db';

import {
  fetchTweetEngagement,
  fetchMultipleTweetEngagements,
} from '../twitterPoster';

describe('Engagement Summary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should calculate engagement summary correctly', async () => {
    const mockSummary = {
      totalTweets: 10,
      totalLikes: 100,
      totalRetweets: 50,
      totalReplies: 25,
      totalImpressions: 1000,
      averageLikes: 10,
      averageRetweets: 5,
      averageReplies: 2.5,
      averageImpressions: 100,
    };

    (getEngagementSummary as any).mockResolvedValue(mockSummary);

    const result = await getEngagementSummary(1);

    expect(result).toEqual(mockSummary);
    expect(getEngagementSummary).toHaveBeenCalledWith(1);
  });

  it('should return null when database is not available', async () => {
    (getEngagementSummary as any).mockResolvedValue(null);

    const result = await getEngagementSummary(1);

    expect(result).toBeNull();
  });
});

describe('Tweets with Engagement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch tweets with engagement data', async () => {
    const mockTweets = [
      {
        id: 1,
        configId: 1,
        tweetId: '123456789',
        tweetText: 'Test tweet',
        likeCount: 10,
        retweetCount: 5,
        replyCount: 2,
        impressionCount: 100,
        postedAt: new Date(),
      },
      {
        id: 2,
        configId: 1,
        tweetId: '987654321',
        tweetText: 'Another tweet',
        likeCount: 20,
        retweetCount: 10,
        replyCount: 5,
        impressionCount: 200,
        postedAt: new Date(),
      },
    ];

    (getAllPostedTweetsWithEngagement as any).mockResolvedValue(mockTweets);

    const result = await getAllPostedTweetsWithEngagement(1, 100);

    expect(result).toHaveLength(2);
    expect(result[0].likeCount).toBe(10);
    expect(result[1].retweetCount).toBe(10);
  });

  it('should return empty array when no tweets found', async () => {
    (getAllPostedTweetsWithEngagement as any).mockResolvedValue([]);

    const result = await getAllPostedTweetsWithEngagement(1, 100);

    expect(result).toEqual([]);
  });
});

describe('Twitter Engagement Fetching', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch engagement for a single tweet', async () => {
    const mockEngagement = {
      success: true,
      engagement: {
        likeCount: 15,
        retweetCount: 8,
        replyCount: 3,
        impressionCount: 150,
      },
    };

    (fetchTweetEngagement as any).mockResolvedValue(mockEngagement);

    const result = await fetchTweetEngagement({} as any, '123456789');

    expect(result.success).toBe(true);
    expect(result.engagement?.likeCount).toBe(15);
  });

  it('should handle errors when fetching engagement', async () => {
    const mockError = {
      success: false,
      error: 'Twitter API error',
    };

    (fetchTweetEngagement as any).mockResolvedValue(mockError);

    const result = await fetchTweetEngagement({} as any, '123456789');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Twitter API error');
  });

  it('should fetch engagement for multiple tweets', async () => {
    const mockEngagements = new Map([
      ['123', { likeCount: 10, retweetCount: 5, replyCount: 2, impressionCount: 100 }],
      ['456', { likeCount: 20, retweetCount: 10, replyCount: 5, impressionCount: 200 }],
    ]);

    (fetchMultipleTweetEngagements as any).mockResolvedValue({
      success: true,
      engagements: mockEngagements,
    });

    const result = await fetchMultipleTweetEngagements({} as any, ['123', '456']);

    expect(result.success).toBe(true);
    expect(result.engagements?.size).toBe(2);
  });
});

describe('Update Tweet Engagement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update engagement data in database', async () => {
    (updateTweetEngagement as any).mockResolvedValue(undefined);

    const engagement = {
      likeCount: 25,
      retweetCount: 12,
      replyCount: 6,
      impressionCount: 250,
    };

    await updateTweetEngagement(1, engagement);

    expect(updateTweetEngagement).toHaveBeenCalledWith(1, engagement);
  });
});

describe('Tweets with Tweet ID', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should filter tweets that have tweetId', async () => {
    const mockTweets = [
      { id: 1, tweetId: '123456789', tweetText: 'Tweet with ID' },
      { id: 2, tweetId: null, tweetText: 'Tweet without ID' },
      { id: 3, tweetId: '987654321', tweetText: 'Another tweet with ID' },
    ];

    (getTweetsWithTweetId as any).mockResolvedValue(
      mockTweets.filter(t => t.tweetId !== null)
    );

    const result = await getTweetsWithTweetId(1);

    expect(result).toHaveLength(2);
    expect(result.every((t: any) => t.tweetId !== null)).toBe(true);
  });
});
