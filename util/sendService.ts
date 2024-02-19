import sgMail from '@sendgrid/mail';
import { EmailJSON } from '@sendgrid/helpers/classes/email-address';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailOptions {
    to: string;
    from: EmailJSON;
    subject: string;
    html: string;
}

export const createEmailData = async (applicationNumber: string, feeling: string, comment?: string, postcode?: string) => {
    return {
        to: process.env.FEEDBACK_TO_EMAIL!,
        from: {
            email: process.env.FEEDBACK_FROM_EMAIL!,
            name: 'Camden Digital Site Notice',
        },
        subject: `New feedback for planning application ${applicationNumber}`,
        html: `<h1>New feedback for planning application ${applicationNumber}</h1>
        <h2>Feeling</h2>
        <p>${feeling}</p>
        <h2>Feedback</h2>
        <p>${comment ? comment : 'Not provided'}</p>
        <h2>Postcode</h2>
        <p>${postcode ? postcode : 'Not provided'}</p>`
    };
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
    try {
        await sgMail.send(options);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
