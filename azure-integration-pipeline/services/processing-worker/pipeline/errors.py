"""Storage failures the worker maps onto Service Bus dispositions."""


class TransientStorageError(Exception):
    """The write can be retried. The broker should redeliver the message."""


class PermanentStorageError(Exception):
    """The write will not succeed on retry. The message should be dead-lettered."""
