import { INotification, NOTIFICATION_TYPE, ResultWithError } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import logger from "../logger";

const notifications: INotification[] = [];

export class NotificationService {
    static async createNotification(
        userId: string,
        title: string,
        message: string,
        type: NOTIFICATION_TYPE,
        options: Partial<INotification> = {}
    ): Promise<ResultWithError<INotification>> {
        try {
            const newNotification: INotification = {
                id: uuidv4(),
                userId,
                title,
                message,
                type,
                challengeId: options.challengeId,
                tournamentId: options.tournamentId,
                status: options.status,
                currency: options.currency,
                createdAt: new Date(),
                isRead: false,
            };
            notifications.push(newNotification);
            logger.info(`Notification created for user ${userId}: ${title}`);
            return { data: newNotification, error: null };
        } catch (error) {
            logger.error(`Error creating notification: ${error}`);
            return { data: null, error: String(error) };
        }
    }

    static async getNotificationsByUserId(userId: string): Promise<ResultWithError<INotification[]>> {
        try {
            const userNotifications = notifications.filter(n => n.userId === userId);
            return { data: userNotifications, error: null };
        } catch (error) {
            logger.error(`Error fetching notifications for user ${userId}: ${error}`);
            return { data: null, error: String(error) };
        }
    }

    static async markNotificationAsRead(notificationId: string): Promise<ResultWithError<null>> {
        try {
            const notification = notifications.find(n => n.id === notificationId);
            if (!notification) {
                return { data: null, error: "Notification not found." };
            }
            notification.isRead = true;
            logger.info(`Notification ${notificationId} marked as read.`);
            return { data: null, error: null };
        } catch (error) {
            logger.error(`Error marking notification as read: ${error}`);
            return { data: null, error: String(error) };
        }
    }

    // Удаление уведомления
    static async deleteNotification(notificationId: string): Promise<ResultWithError<null>> {
        try {
            const index = notifications.findIndex(n => n.id === notificationId);
            if (index === -1) {
                return { data: null, error: "Notification not found." };
            }
            notifications.splice(index, 1);
            logger.info(`Notification ${notificationId} deleted.`);
            return { data: null, error: null };
        } catch (error) {
            logger.error(`Error deleting notification: ${error}`);
            return { data: null, error: String(error) };
        }
    }
}
