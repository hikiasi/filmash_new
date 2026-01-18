import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// Helper to send Telegram notifications
async function sendTelegramNotification(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("Telegram notification skipped (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set):", text);
    return;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to send Telegram notification:", error);
    }
  } catch (err) {
    console.error("Error sending Telegram notification:", err);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // --- Inquiries ---
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      
      // Notify Telegram
      const message = `<b>🔔 Новая заявка (Консультация)</b>\n\n` +
                      `<b>Имя:</b> ${inquiry.name}\n` +
                      `<b>Телефон:</b> ${inquiry.phone}\n` +
                      `<b>Вопрос:</b> ${inquiry.message || "Не указан"}`;
      
      // Fire and forget (don't wait for TG to respond to client)
      sendTelegramNotification(message);

      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // --- Orders ---
  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);

      // Notify Telegram
      const message = `<b>🚘 Новый заказ автомобиля</b>\n\n` +
                      `<b>Имя:</b> ${order.name}\n` +
                      `<b>Телефон:</b> ${order.phone}\n` +
                      `<b>Марка:</b> ${order.carMake}\n` +
                      `<b>Модель:</b> ${order.carModel}\n` +
                      `<b>Год:</b> ${order.year || "-"}\n` +
                      `<b>Бюджет:</b> ${order.budget || "-"}\n` +
                      `<b>Комментарий:</b> ${order.comments || "-"}`;

      sendTelegramNotification(message);

      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}
