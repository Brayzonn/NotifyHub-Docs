---
sidebar_position: 1
---

# Introduction

Welcome to NotifyHub - a simple, affordable notification infrastructure for developers.

## What is NotifyHub?

NotifyHub provides reliable email and webhook delivery with queue management, domain verification, and a powerful TypeScript SDK. Built as an affordable alternative to services like Knock and Courier.

## Key Features

- **Email Delivery** - Send emails via SendGrid with custom domains
- **Webhook Notifications** - Reliable webhook delivery with retries
- **Queue Management** - Built on Bull/BullMQ with Redis
- **Domain Verification** - Verify custom domains for email sending
- **TypeScript SDK** - Type-safe client library
- **Developer-Friendly** - Clean API and extensive documentation

## Quick Example

```typescript
import { NotifyHubClient } from "@notifyhub/sdk";

const client = new NotifyHubClient({
  apiKey: "your-api-key",
});

await client.sendEmail({
  to: "user@example.com",
  subject: "Welcome!",
  body: "<h1>Hello World</h1>",
});
```

## Next Steps

- [Installation](/docs/getting-started/installation) - Install the SDK
- [Quick Start](/docs/getting-started/quickstart) - Send your first notification
- [API Reference](/docs/api-reference/authentication) - Explore the API
