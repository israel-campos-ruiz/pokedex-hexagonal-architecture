export interface BaseSendNotification<T> {
  sendEmail?(data: T): Promise<T>;
  sendText?(data: T): Promise<T>;
  sendWhatsapp?(data: T): Promise<T>;
}
