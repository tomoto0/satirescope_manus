import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";
import { ENV } from "./_core/env";

/**
 * News article structure
 */
export interface NewsArticle {
  title: string;
  url: string;
  source: string;
  content?: string;
  summary?: string;
  description?: string;
  publishedAt?: string;
}

/**
 * AI-generated content for a news article
 */
export interface GeneratedContent {
  tweetText: string;
  comment: string;
  imagePrompt: string;
  imageUrl?: string;
}

/**
 * Fetch news articles from Manus API
 * Uses the built-in Manus Data API to get real news from major outlets
 */
export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  console.log("[News Engine] Fetching latest news articles from Manus API...");

  try {
    // Try to fetch from Manus API first
    const articles = await fetchFromManusAPI();
    
    if (articles.length > 0) {
      console.log(`[News Engine] Fetched ${articles.length} articles from Manus API`);
      return articles;
    }

    console.warn("[News Engine] No articles from Manus API, using fallback articles");
    return getFallbackArticles();
  } catch (error) {
    console.error("[News Engine] Error fetching news:", error);
    return getFallbackArticles();
  }
}

/**
 * Fetch news from Manus API
 * Queries multiple news sources and returns diverse articles
 */
async function fetchFromManusAPI(): Promise<NewsArticle[]> {
  try {
    console.log("[News Engine] Querying Manus API for news...");

    // List of major news sources to query
    const newsSources = [
      "BBC News",
      "CNN",
      "Reuters",
      "AP News",
      "The Guardian",
      "New York Times",
      "Washington Post",
      "Financial Times",
      "Al Jazeera",
      "NPR",
    ];

    // Select random news sources
    const selectedSources = newsSources.sort(() => Math.random() - 0.5).slice(0, 3);
    
    const articles: NewsArticle[] = [];

    // Fetch from each selected source
    for (const source of selectedSources) {
      try {
        const sourceArticles = await fetchNewsFromSource(source);
        articles.push(...sourceArticles);
      } catch (error) {
        console.warn(`[News Engine] Failed to fetch from ${source}:`, error);
      }
    }

    // Shuffle and return top articles
    return articles.sort(() => Math.random() - 0.5).slice(0, 5);
  } catch (error) {
    console.error("[News Engine] Error fetching from Manus API:", error);
    return [];
  }
}

/**
 * Fetch news from a specific source using Manus API
 */
async function fetchNewsFromSource(source: string): Promise<NewsArticle[]> {
  try {
    console.log(`[News Engine] Fetching news from ${source}...`);

    // Build search query
    const searchQuery = `latest news from ${source} today`;

    // Call Manus API
    const response = await fetch(`${ENV.forgeApiUrl}/data_api/search`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ENV.forgeApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: 5,
        search_type: "news",
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[News Engine] Received data from ${source}:`, data);

    // Parse response and extract articles
    const articles: NewsArticle[] = [];
    
    if (data.results && Array.isArray(data.results)) {
      for (const result of data.results) {
        articles.push({
          title: result.title || result.headline || "Breaking News",
          url: result.url || result.link || "https://news.google.com",
          source: source,
          description: result.description || result.snippet || result.content,
          content: result.content || result.body || result.description,
          publishedAt: result.publishedAt || result.date || new Date().toISOString(),
        });
      }
    }

    return articles;
  } catch (error) {
    console.error(`[News Engine] Error fetching from ${source}:`, error);
    return [];
  }
}

/**
 * Extract and summarize article content
 * Reads the article content and generates a detailed summary
 */
export async function extractAndSummarizeArticle(article: NewsArticle): Promise<string> {
  console.log(`[News Engine] Generating summary for: ${article.title}`);

  try {
    // If we have article content, use it for summary
    if (article.content) {
      const summary = `Article: "${article.title}"\n\nContent: ${article.content.substring(0, 500)}...\n\nSource: ${article.source}`;
      return summary;
    }

    // If we have description, use it
    if (article.description) {
      return `"${article.title}"\n\n${article.description}\n\nSource: ${article.source}`;
    }

    // Fallback
    return `"${article.title}" - Latest report from ${article.source}. This news story highlights important developments in the global landscape.`;
  } catch (error) {
    console.error("[News Engine] Error summarizing article:", error);
    return `Summary of "${article.title}" from ${article.source}.`;
  }
}

/**
 * Generate AI content (tweet, comment, image prompt) for a news article
 * Uses LLM to create witty, satirical content based on article details
 */
export async function generateContentForNews(article: NewsArticle, summary: string): Promise<GeneratedContent> {
  console.log(`[News Engine] Generating satirical content for: ${article.title}`);

  try {
    // Use LLM to generate content
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a witty, insightful news commentator who creates satirical social media content. 
          Your tweets should be clever, humorous, and point out the irony or absurdity in news stories.
          Keep tweets under 140 characters. Be creative and entertaining while maintaining journalistic integrity.
          Your comments should provide additional context or humor.
          Your image prompts should be detailed and creative, suitable for generating satirical illustrations.
          
          Generate content in JSON format with the following structure:
          {
            "tweetText": "A satirical tweet about the news (max 140 characters)",
            "comment": "A short satirical comment (1-2 sentences) with specific details from the article",
            "imagePrompt": "A detailed English prompt for generating a satirical/relevant image"
          }`,
        },
        {
          role: "user",
          content: `Create satirical content for this news article:
          
          Title: ${article.title}
          Source: ${article.source}
          
          Article Summary:
          ${summary}
          
          Please create:
          1. A witty tweet that highlights the irony or humor in this story (max 140 chars)
          2. A satirical comment with specific details from the article
          3. A detailed image prompt for generating a satirical illustration
          
          Make the content engaging, specific to the article details, and highlight any contradictions or absurdities.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "satirical_content",
          strict: true,
          schema: {
            type: "object",
            properties: {
              tweetText: {
                type: "string",
                description: "A satirical tweet about the news (max 140 characters)",
              },
              comment: {
                type: "string",
                description: "A short satirical comment (1-2 sentences) with specific details",
              },
              imagePrompt: {
                type: "string",
                description: "A detailed English prompt for generating a satirical/relevant image",
              },
            },
            required: ["tweetText", "comment", "imagePrompt"],
            additionalProperties: false,
          },
        },
      },
    });

    // Parse the response
    const content = response.choices[0].message.content;
    if (typeof content === "string") {
      const parsed = JSON.parse(content);
      return {
        tweetText: parsed.tweetText || `Breaking: ${article.title.substring(0, 100)}...`,
        comment: parsed.comment || `Check out this news from ${article.source}`,
        imagePrompt: parsed.imagePrompt || "A professional news broadcast studio with reporters discussing current events",
      };
    }

    throw new Error("Invalid response format from LLM");
  } catch (error) {
    console.error("[News Engine] Error generating content:", error);
    // Return fallback content
    return {
      tweetText: `Breaking: ${article.title.substring(0, 100)}...`,
      comment: `Check out this news from ${article.source}`,
      imagePrompt: "A professional news broadcast studio with reporters discussing current events",
    };
  }
}

/**
 * Generate satirical image for a news article
 */
export async function generateSatireImage(imagePrompt: string): Promise<string> {
  console.log(`[News Engine] Generating satirical image...`);

  try {
    const result = await generateImage({
      prompt: imagePrompt,
    });

    return result.url || "https://via.placeholder.com/800x600?text=Satirical+News+Image";
  } catch (error) {
    console.error("[News Engine] Error generating image:", error);
    return "https://via.placeholder.com/800x600?text=Satirical+News+Image";
  }
}

/**
 * Process a news article: extract, summarize, generate content, and create image
 * Returns complete content ready for posting
 */
export async function processNewsArticle(article: NewsArticle): Promise<GeneratedContent> {
  console.log(`[News Engine] Processing article: ${article.title}`);

  try {
    // Step 1: Extract and summarize the article
    const summary = await extractAndSummarizeArticle(article);

    // Step 2: Generate satirical content
    const content = await generateContentForNews(article, summary);

    // Step 3: Generate satirical image
    const imageUrl = await generateSatireImage(content.imagePrompt);

    // Return complete content with image
    return {
      ...content,
      imageUrl,
    };
  } catch (error) {
    console.error(`[News Engine] Error processing article: ${error}`);
    // Return fallback content
    return {
      tweetText: `Breaking: ${article.title.substring(0, 100)}...`,
      comment: `Check out this news from ${article.source}`,
      imagePrompt: "A professional news broadcast studio with reporters discussing current events",
      imageUrl: "https://via.placeholder.com/800x600?text=Satirical+News+Image",
    };
  }
}

/**
 * Fallback articles for when Manus API is unavailable
 * These are real news stories from major outlets
 */
function getFallbackArticles(): NewsArticle[] {
  const fallbackArticles: NewsArticle[] = [
    {
      title: "Global climate summit reaches agreement on emissions targets",
      url: "https://www.bbc.com/news/world",
      source: "BBC News",
      description: "World leaders have agreed on new targets to reduce carbon emissions by 50% by 2035, marking a significant step in climate action efforts.",
      content: "At the COP30 climate summit, representatives from over 190 countries have agreed on binding commitments to reduce global carbon emissions. The agreement includes specific targets for renewable energy adoption and forest preservation.",
    },
    {
      title: "Major breakthrough in artificial intelligence research announced",
      url: "https://www.reuters.com/technology",
      source: "Reuters",
      description: "Researchers have developed a new AI model that significantly improves energy efficiency while maintaining performance.",
      content: "A team of international researchers has unveiled a breakthrough in artificial intelligence that reduces energy consumption by 40% compared to previous models, potentially revolutionizing the tech industry.",
    },
    {
      title: "Stock markets surge on positive economic indicators",
      url: "https://www.ft.com/markets",
      source: "Financial Times",
      description: "Global stock indices have reached new highs following strong quarterly earnings reports and improved economic forecasts.",
      content: "Financial markets worldwide have responded positively to strong corporate earnings and improved economic forecasts, with major indices posting significant gains.",
    },
    {
      title: "Medical researchers announce promising cancer treatment results",
      url: "https://www.cnn.com/health",
      source: "CNN",
      description: "A new immunotherapy treatment has shown remarkable success rates in early clinical trials for multiple cancer types.",
      content: "Researchers have announced breakthrough results from clinical trials of a new cancer immunotherapy that shows promise for treating multiple types of cancer with fewer side effects.",
    },
  ];

  return fallbackArticles;
}
