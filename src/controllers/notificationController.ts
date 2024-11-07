import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/notificationService';
import { NOTIFICATION_TYPE } from '../types/types';

export const createNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, title, message, type, challengeId, tournamentId, status, currency } = req.body;
        const notification = await NotificationService.createNotification(
            userId,
            title,
            message,
            type as NOTIFICATION_TYPE,
            { challengeId, tournamentId, status, currency }
        );
        res.status(201).json(notification);
    } catch (error) {
        next(error);
    }
};

export const getNotificationsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const notifications = await NotificationService.getNotificationsByUserId(userId);
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

export const markNotificationAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { notificationId } = req.params;
        const result = await NotificationService.markNotificationAsRead(notificationId);
        if (result.error) {
            res.status(404).json({ message: result.error });
        } else {
            res.status(200).json({ message: 'Notification marked as read' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { notificationId } = req.params;
        const result = await NotificationService.deleteNotification(notificationId);
        if (result.error) {
            res.status(404).json({ message: result.error });
        } else {
            res.status(200).json({ message: 'Notification deleted successfully' });
        }
    } catch (error) {
        next(error);
    }
};
