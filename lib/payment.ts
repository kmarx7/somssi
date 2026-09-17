import { randomUUID } from "node:crypto";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type PaymentIntent = { id: string; amount: number; currency: "KRW"; status: PaymentStatus; provider: string };

export interface PaymentProvider {
  createPayment(input: { amount: number; currency: "KRW"; bookingReference: string }): Promise<PaymentIntent>;
  confirmPayment(paymentId: string): Promise<PaymentIntent>;
  refundPayment(paymentId: string): Promise<PaymentIntent>;
}

export class MockPaymentProvider implements PaymentProvider {
  private readonly payments = new Map<string, PaymentIntent>();
  async createPayment(input: { amount: number; currency: "KRW"; bookingReference: string }) {
    const payment: PaymentIntent = { id: `mock_${randomUUID()}`, amount: input.amount, currency: input.currency, status: "PENDING", provider: "mock" };
    this.payments.set(payment.id, payment);
    return payment;
  }
  async confirmPayment(paymentId: string) {
    const payment = this.payments.get(paymentId);
    if (!payment) throw new Error("Payment not found");
    const confirmed = { ...payment, status: "PAID" as const };
    this.payments.set(paymentId, confirmed);
    return confirmed;
  }
  async refundPayment(paymentId: string) {
    const payment = this.payments.get(paymentId);
    if (!payment) throw new Error("Payment not found");
    const refunded = { ...payment, status: "REFUNDED" as const };
    this.payments.set(paymentId, refunded);
    return refunded;
  }
}

export function getPaymentProvider(): PaymentProvider {
  if (process.env.NODE_ENV === "production" && process.env.SOMSSI_ALLOW_MOCK_PAYMENT !== "true") {
    throw new Error("A production payment provider must be configured.");
  }
  return new MockPaymentProvider();
}
