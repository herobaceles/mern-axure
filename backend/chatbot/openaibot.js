import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askBot(message, tools) {
  const systemPrompt = `
You are AzureHUB's friendly hotel assistant, here to help our valued guests.

- You are always assisting logged-in users: ${tools.name} (${tools.email})
- Your main job is to help with booking, updating, canceling, or checking room availability.
- Available rooms: One Bedroom (fits 2–4 people) and Two Bedroom (with pool view & balcony).

Here’s some important info to keep in mind:

🏨 Location & Contact:
Azure Urban Residences, Brgy Marcelo Green, Parañaque, Metro Manila  
Phone: +639162860796 | Email: ahubcaps1111@gmail.com

⏰ Check-in & Check-out:
Check-in: 2:00 PM  
Check-out: 12:00 PM

prices or rates:
one bedroom : 2500
two bedroom: 3500 
🛏️ Room Amenities:
- Aircon, queen bed, comfy sofa, WiFi, Smart TV with Netflix & YouTube  
- Kitchen: cookware, stove (light use), microwave, kettle, rice cooker, fridge  
- Extras: guest kit, towels, water heater, karaoke machine, board & party games

🏝️ Facilities & Nearby Attractions:
- Beach, wave pool, kiddie playground, sand bar (open till 11PM), sky garden (7AM–10PM)  
- Pool hours: 7AM–12PM and 2PM–7PM (entrance ₱150)  
- Laundry (paid), 7/11 convenience store, food stalls, BDO ATMs  
- Parking fee: ₱300/day  
- Non-smoking policy with ₱2,000 penalty  
- Sorry, no pets allowed

Nearby spots:  
- SM Bicutan (5 min walk)  
- NAIA Airport (20 min drive)  
- Taxis available right outside the building

🚨 In case of emergency, fire exits are behind the doors—please use the nearest stairwell.

Feel free to assist with any booking or room-related questions!

`;

  const functions = [
    {
      name: "reserve",
      description: "Help the user book a room",
      parameters: {
        type: "object",
        properties: {
          roomType: { type: "string", enum: ["One Bedroom", "Two Bedroom"] },
          checkInRaw: { type: "string", description: "Example: 'next Friday'" },
          nights: { type: "integer", minimum: 1 },
        },
        required: ["roomType", "checkInRaw", "nights"],
      },
    },
    {
      name: "updateReservation",
      description: "Modify an existing reservation",
      parameters: {
        type: "object",
        properties: {
          bookingId: { type: "string" },
          checkIn: { type: "string", description: "New check-in date" },
          nights: { type: "integer", description: "Number of nights to stay" },
        },
        required: ["bookingId"],
      },
    },
    {
      name: "cancelReservation",
      description: "Cancel a booking by its ID",
      parameters: {
        type: "object",
        properties: {
          bookingId: { type: "string" },
        },
        required: ["bookingId"],
      },
    },
    {
      name: "checkAvailability",
      description: "Check if a room is free for the requested dates",
      parameters: {
        type: "object",
        properties: {
          roomType: { type: "string", enum: ["One Bedroom", "Two Bedroom"] },
          checkInRaw: { type: "string", description: "Example: 'next Saturday'" },
          nights: { type: "integer", minimum: 1 },
        },
        required: ["roomType", "checkInRaw", "nights"],
      },
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    functions,
    function_call: "auto",
  });

  const choice = response.choices[0];

  if (choice.finish_reason === "function_call") {
    const { name, arguments: argsJson } = choice.message.function_call;
    const args = JSON.parse(argsJson);

    if (typeof tools[name] === "function") {
      return await tools[name](...Object.values(args));
    } else {
      return `❌ Sorry, I don’t know how to do that yet.`;
    }
  }

  return choice.message.content;
}
