import { Op } from "sequelize";
import sequelize from "../database";
import AutoReplyLogs from "../models/AutoReplyLogs";
import UserMessagesLog from "../models/UserMessagesLog";
import LogTicket from "../models/LogTicket";
import { logger } from "../utils/logger";

const retentionDays = Number(process.env.LOG_RETENTION_DAYS || 30);

const cleanupLogs = async (): Promise<void> => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

  const [autoReplyDeleted, userMessagesDeleted, ticketLogsDeleted] = await Promise.all([
    AutoReplyLogs.destroy({
      where: {
        createdAt: { [Op.lt]: cutoffDate }
      }
    }),
    UserMessagesLog.destroy({
      where: {
        createdAt: { [Op.lt]: cutoffDate }
      }
    }),
    LogTicket.destroy({
      where: {
        createdAt: { [Op.lt]: cutoffDate }
      }
    })
  ]);

  logger.info(
    `cleanupLogs finished. retentionDays=${retentionDays} AutoReplyLogs=${autoReplyDeleted} UserMessagesLog=${userMessagesDeleted} LogTicket=${ticketLogsDeleted}`
  );
};

cleanupLogs()
  .catch(error => {
    logger.error(`cleanupLogs error: ${error?.message || error}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
