import { NextApiRequest, NextApiResponse } from "next";
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sms = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == 'POST'){
        const twilioMessage = await req.body.Body;
        const senderPhoneNumber = await req.body.From;

        const responseMessage = "Our demo to receiving the text: " + twilioMessage;
        
        await sendText (senderPhoneNumber, responseMessage);

        res.setHeader('Content-Type', 'application/xml');
        res.status(200).end('')
    }
}

const sendText = async (to: string, message: string) => {
    try {
        await client.messages.create({
            body: message,
            to, // The recipient's phone number
            from: '+18559620462', // Your Twilio phone number
          })
         

    } catch (error){
        console.log('Error sending text:', error);
      
    }
};

export default sms;