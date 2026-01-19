import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Heart, Repeat2, MessageCircle, Eye, TrendingUp, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function Analytics() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedConfigId, setSelectedConfigId] = useState<number | null>(null);

  // Fetch configs
  const { data: configs, isLoading: configsLoading } = trpc.twitter.getConfigs.useQuery(undefined, {
    enabled: !!user,
  });

  // Set default config when configs are loaded
  useEffect(() => {
    if (configs && configs.length > 0 && !selectedConfigId) {
      setSelectedConfigId(configs[0].id);
    }
  }, [configs, selectedConfigId]);

  // Fetch engagement summary
  const { data: summary, isLoading: summaryLoading, refetch: refetchSummary } = trpc.twitter.getEngagementSummary.useQuery(
    { configId: selectedConfigId! },
    { enabled: !!selectedConfigId }
  );

  // Fetch tweets with engagement
  const { data: tweets, isLoading: tweetsLoading, refetch: refetchTweets } = trpc.twitter.getTweetsWithEngagement.useQuery(
    { configId: selectedConfigId!, limit: 50 },
    { enabled: !!selectedConfigId }
  );

  // Refresh engagement mutation
  const refreshMutation = trpc.twitter.refreshEngagement.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      refetchSummary();
      refetchTweets();
    },
    onError: (error) => {
      toast.error(`Failed to refresh engagement: ${error.message}`);
    },
  });

  const handleRefresh = () => {
    if (selectedConfigId) {
      refreshMutation.mutate({ configId: selectedConfigId });
    }
  };

  // Set page title
  useEffect(() => {
    document.title = "Analytics - SatireScope";
  }, []);

  if (authLoading || configsLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700 max-w-md">
          <CardHeader>
            <CardTitle className="text-white">Authentication Required</CardTitle>
            <CardDescription className="text-slate-400">
              Please log in to view your analytics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")} className="bg-amber-500 hover:bg-amber-600">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!configs || configs.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="text-slate-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">No Twitter Configuration</CardTitle>
              <CardDescription className="text-slate-400">
                Please set up your Twitter API credentials first to view analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setLocation("/settings")} className="bg-amber-500 hover:bg-amber-600">
                Configure Twitter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-amber-500" />
              Engagement Analytics
            </h1>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={refreshMutation.isPending}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshMutation.isPending ? "animate-spin" : ""}`} />
            {refreshMutation.isPending ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>

        {/* Config Selector */}
        {configs.length > 1 && (
          <div className="mb-6">
            <label className="text-slate-400 text-sm mb-2 block">Select Configuration</label>
            <select
              value={selectedConfigId || ""}
              onChange={(e) => setSelectedConfigId(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2"
            >
              {configs.map((config) => (
                <option key={config.id} value={config.id}>
                  Configuration #{config.id}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Summary Cards */}
        {summaryLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-slate-800 border-slate-700 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 bg-slate-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : summary ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Likes */}
            <Card className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-300 text-sm font-medium">Total Likes</p>
                    <p className="text-3xl font-bold text-white mt-1">{summary.totalLikes.toLocaleString()}</p>
                    <p className="text-pink-300/70 text-xs mt-1">Avg: {summary.averageLikes}/tweet</p>
                  </div>
                  <Heart className="w-10 h-10 text-pink-400" />
                </div>
              </CardContent>
            </Card>

            {/* Total Retweets */}
            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">Total Retweets</p>
                    <p className="text-3xl font-bold text-white mt-1">{summary.totalRetweets.toLocaleString()}</p>
                    <p className="text-green-300/70 text-xs mt-1">Avg: {summary.averageRetweets}/tweet</p>
                  </div>
                  <Repeat2 className="w-10 h-10 text-green-400" />
                </div>
              </CardContent>
            </Card>

            {/* Total Replies */}
            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Total Replies</p>
                    <p className="text-3xl font-bold text-white mt-1">{summary.totalReplies.toLocaleString()}</p>
                    <p className="text-blue-300/70 text-xs mt-1">Avg: {summary.averageReplies}/tweet</p>
                  </div>
                  <MessageCircle className="w-10 h-10 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            {/* Total Impressions */}
            <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-300 text-sm font-medium">Total Impressions</p>
                    <p className="text-3xl font-bold text-white mt-1">{summary.totalImpressions.toLocaleString()}</p>
                    <p className="text-amber-300/70 text-xs mt-1">Avg: {summary.averageImpressions}/tweet</p>
                  </div>
                  <Eye className="w-10 h-10 text-amber-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Overview Stats */}
        {summary && (
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-500">{summary.totalTweets}</p>
                  <p className="text-slate-400 text-sm">Total Tweets</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-pink-500">
                    {summary.totalTweets > 0
                      ? ((summary.totalLikes + summary.totalRetweets + summary.totalReplies) / summary.totalTweets).toFixed(1)
                      : "0"}
                  </p>
                  <p className="text-slate-400 text-sm">Avg Engagement</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-500">
                    {summary.totalImpressions > 0
                      ? (((summary.totalLikes + summary.totalRetweets + summary.totalReplies) / summary.totalImpressions) * 100).toFixed(2)
                      : "0"}%
                  </p>
                  <p className="text-slate-400 text-sm">Engagement Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-500">
                    {summary.totalTweets > 0
                      ? Math.round(summary.totalImpressions / summary.totalTweets).toLocaleString()
                      : "0"}
                  </p>
                  <p className="text-slate-400 text-sm">Avg Reach</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tweets Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Tweet Performance</CardTitle>
            <CardDescription className="text-slate-400">
              Individual tweet engagement metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tweetsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-slate-700 rounded animate-pulse"></div>
                ))}
              </div>
            ) : tweets && tweets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left text-slate-400 font-medium py-3 px-4">Tweet</th>
                      <th className="text-center text-slate-400 font-medium py-3 px-2">
                        <Heart className="w-4 h-4 inline text-pink-400" />
                      </th>
                      <th className="text-center text-slate-400 font-medium py-3 px-2">
                        <Repeat2 className="w-4 h-4 inline text-green-400" />
                      </th>
                      <th className="text-center text-slate-400 font-medium py-3 px-2">
                        <MessageCircle className="w-4 h-4 inline text-blue-400" />
                      </th>
                      <th className="text-center text-slate-400 font-medium py-3 px-2">
                        <Eye className="w-4 h-4 inline text-amber-400" />
                      </th>
                      <th className="text-right text-slate-400 font-medium py-3 px-4">Posted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tweets.map((tweet) => (
                      <tr key={tweet.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="py-3 px-4">
                          <p className="text-white text-sm line-clamp-2 max-w-md">
                            {tweet.tweetText.substring(0, 100)}
                            {tweet.tweetText.length > 100 ? "..." : ""}
                          </p>
                          {tweet.tweetId && (
                            <a
                              href={`https://twitter.com/i/web/status/${tweet.tweetId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-500 text-xs hover:underline"
                            >
                              View on X
                            </a>
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-pink-400 font-medium">{tweet.likeCount}</span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-green-400 font-medium">{tweet.retweetCount}</span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-blue-400 font-medium">{tweet.replyCount}</span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-amber-400 font-medium">{tweet.impressionCount}</span>
                        </td>
                        <td className="text-right py-3 px-4">
                          <span className="text-slate-400 text-sm">
                            {new Date(tweet.postedAt).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400">No tweets found. Start posting to see engagement data!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">
            <strong className="text-amber-500">Note:</strong> Engagement data is fetched from the Twitter API.
            Click "Refresh Data" to update the metrics. Impressions may require elevated API access to retrieve.
          </p>
        </div>
      </div>
    </div>
  );
}
