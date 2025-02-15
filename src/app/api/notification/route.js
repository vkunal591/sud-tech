import { NextResponse } from 'next/server';
import { dbConnect } from '../../lib/config/db';
import InvoiceModel from '../../lib/models/InvoiceModel';
import NotificationModel from '../../lib/models/NotificationModel';
import nodemailer from 'nodemailer';  // Email sender (example using nodemailer)

// Helper function to send email alerts
async function sendEmailAlert(companyEmail, alertMessage) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: companyEmail,
    subject: 'Invoice Due Date Alert',
    text: alertMessage,
  };

  return transporter.sendMail(mailOptions);
}

export async function POST(req) {
  await dbConnect();

  try {
    const notifications = await NotificationModel.find({ isEnabled: true });

    for (const notification of notifications) {
      // Find invoices for the company
      const invoices = await InvoiceModel.find({
        company: notification.company,
        dueDate: { $lte: new Date() }, // Invoices that are overdue
        status: { $in: ['Unpaid', 'Pending'] }
      });

      for (const invoice of invoices) {
        // Check if the invoice is due in the specified number of days
        const daysBeforeDue = Math.ceil((invoice.dueDate - new Date()) / (1000 * 3600 * 24));

        if (daysBeforeDue <= notification.daysBeforeDue && daysBeforeDue >= 0) {
          // Send alert email
          const company = await CompanyModel.findById(notification.company);
          await sendEmailAlert(company.email, notification.alertMessage);

          // Log the notification
          await NotificationModel.findByIdAndUpdate(notification._id, {
            $push: { notificationsSent: { status: 'Sent' } },
          });
        }
      }
    }

    return NextResponse.json({ message: 'Notifications checked and sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error checking and sending notifications' }, { status: 500 });
  }
}
