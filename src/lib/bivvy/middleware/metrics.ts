import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

const METRICS_PREFIX = 'metrics:';

export async function trackMetrics(req: Request) {
  const start = Date.now();
  const url = new URL(req.url);
  const path = url.pathname;
  
  try {
    const response = await NextResponse.next();
    const duration = Date.now() - start;
    
    // Track request metrics
    await Promise.all([
      redis.incr(`${METRICS_PREFIX}requests:${path}`),
      redis.incr(`${METRICS_PREFIX}requests:total`),
      redis.incrBy(`${METRICS_PREFIX}duration:${path}`, duration),
      redis.incrBy(`${METRICS_PREFIX}duration:total`, duration)
    ]);
    
    // Track status codes
    await redis.incr(`${METRICS_PREFIX}status:${response.status}`);
    
    // Track AI usage if it's a generate request
    if (path === '/api/generate') {
      await Promise.all([
        redis.incr(`${METRICS_PREFIX}ai:portraits`),
        redis.incr(`${METRICS_PREFIX}ai:images`)
      ]);
    }
    
    return response;
  } catch (error) {
    const duration = Date.now() - start;
    
    // Track error metrics
    await Promise.all([
      redis.incr(`${METRICS_PREFIX}errors:${path}`),
      redis.incr(`${METRICS_PREFIX}errors:total`),
      redis.incrBy(`${METRICS_PREFIX}duration:errors`, duration)
    ]);
    
    throw error;
  }
} 