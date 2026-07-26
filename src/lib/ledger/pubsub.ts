/** Minimal Redis Pub/Sub / Kafka-style broker for ledger fan-out. */

export type MessageHandler<T> = (message: T) => void

export class EventBroker<T> {
  private subscribers = new Map<string, Set<MessageHandler<T>>>()

  subscribe(channel: string, handler: MessageHandler<T>): () => void {
    const set = this.subscribers.get(channel) ?? new Set()
    set.add(handler)
    this.subscribers.set(channel, set)
    return () => {
      set.delete(handler)
      if (set.size === 0) this.subscribers.delete(channel)
    }
  }

  publish(channel: string, message: T): number {
    const set = this.subscribers.get(channel)
    if (!set) return 0
    for (const handler of set) handler(message)
    return set.size
  }

  channels(): string[] {
    return [...this.subscribers.keys()]
  }
}

export const TICKET_CHANNEL = 'tickets.state'
