import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company",  },
  daysBeforeDue: { type: Number,  },  // Number of days before due date
  alertMessage: { type: String,  },   // Custom alert message
  isEnabled: { type: Boolean, default: true },      // Whether notifications are enabled
  notificationsSent: [
    {
      alertDate: { type: Date, default: Date.now },
      status: { type: String, enum: ['Sent', 'Failed'], default: 'Sent' },
    }
  ]
}, { timestamps: true });

const NotificationModel = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
export default NotificationModel;
