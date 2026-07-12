import prisma from '../../config/db.js';

export async function getNotifications(req, res, next) {
  try {
    const { limit } = req.query;
    const take = limit ? parseInt(limit) : 20;

    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
      take,
    });

    const unreadCount = await prisma.notification.count({
      where: { isRead: false },
    });

    res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(req, res, next) {
  try {
    const { id } = req.params;
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    next(error);
  }
}

export async function markAllAsRead(req, res, next) {
  try {
    await prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
}
