---
sidebar_position: 3
---

# Send Webhook

Send webhook notifications with automatic retries.

## Basic Usage

```typescript
const job = await client.sendWebhook({
  url: "https://your-app.com/webhook",
  payload: {
    event: "user.created",
    data: { userId: "123" },
  },
});
```

## Parameters

| Parameter | Type              | Description                 |
| --------- | ----------------- | --------------------------- |
| `url`     | `string`          | Webhook endpoint URL        |
| `payload` | `object`          | JSON payload to send        |
| `method`  | `'POST' \| 'PUT'` | HTTP method (default: POST) |
| `headers` | `object`          | Custom headers (optional)   |

## Examples

### Basic Webhook

```typescript
await client.sendWebhook({
  url: "https://api.example.com/notifications",
  payload: {
    type: "payment.completed",
    amount: 49.99,
    currency: "USD",
  },
});
```

### Custom Headers

```typescript
await client.sendWebhook({
  url: "https://api.example.com/webhook",
  payload: { event: "test" },
  headers: {
    "X-Custom-Header": "value",
    Authorization: "Bearer token",
  },
});
```

### PUT Request

```typescript
await client.sendWebhook({
  url: "https://api.example.com/resource/123",
  method: "PUT",
  payload: {
    status: "completed",
  },
});
```

## Retry Logic

NotifyHub automatically retries failed webhooks:

- **3 retry attempts**
- **Exponential backoff** (1s, 5s, 15s)
- **Success on 2xx status codes**
- **Failure on 4xx/5xx codes**

## Response

```typescript
{
  jobId: 'job_xyz789',
  status: 'pending'
}
```

## Checking Status

```typescript
const status = await client.getJob(job.jobId);
console.log(status);
// {
//   id: 'job_xyz789',
//   type: 'webhook',
//   status: 'completed',
//   attempts: 1,
//   completedAt: '2026-01-07T...'
// }
```

## Error Handling

```typescript
try {
  await client.sendWebhook({ ... });
} catch (error) {
  if (error.isStatus(400)) {
    // Invalid URL or payload
  } else if (error.isStatus(429)) {
    // Rate limit exceeded
  }
}
```

## Next Steps

- [Job Management](/docs/api-reference/job-status)
- [Webhook Examples](/docs/examples/webhooks)
