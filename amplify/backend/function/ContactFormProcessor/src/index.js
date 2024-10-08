const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    const { guestName, email, phone, messageTitle, message } = JSON.parse(event.body);

    const params = {
        Destination: {
            ToAddresses: ['lamthaithanhlong@gmail.com'] // Replace with your email
        },
        Message: {
            Body: {
                Text: { Data: `Name: ${guestName}\nEmail: ${email}\nPhone: ${phone}\nTitle: ${messageTitle}\nMessage: ${message}` }
            },
            Subject: { Data: `New Contact Form Submission: ${messageTitle}` }
        },
        Source: 'lamthaithanhlong@gmail.com' // Replace with your SES verified email
    };

    try {
        await ses.sendEmail(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
            headers: {
                'Access-Control-Allow-Origin': 'https://www.longltt-portfolio.com',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            }
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending email' }),
            headers: {
                'Access-Control-Allow-Origin': 'https://www.longltt-portfolio.com',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            }
        };
    }
};