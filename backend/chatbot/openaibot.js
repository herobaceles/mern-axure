import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askBot(message, tools) {
  const systemPrompt = `
You are a helpful hotel assistant for Azure Urban Staycation by Briahna.

- Always assist logged-in users: ${tools.name} (${tools.email})
- Help users book, update, cancel, or check availability for reservations using the provided tools.
- Supported room types: One Bedroom (2–4 pax) and Two Bedroom (with pool view & balcony).

🏨 General Info:
- Address: Azure Urban Residences, Brgy Marcelo Green, Parañaque, Metro Manila
- Contact: +639162860796 | ahubcaps1111@gmail.com
- Check-in: 2:00 PM | Check-out: 12:00 PM

📅 Cancellation Policy:
- Cancel ≥ 48h before check-in: ✅ Fully refundable
- Cancel < 48h before: ❌ Charged one night

🛏️ Room Amenities:
- Aircon, Queen bed, sofa, WiFi, Smart TV (Netflix/Youtube)
- Kitchen: Cookware, stove (light use), microwave, kettle, rice cooker, fridge
- Extras: Guest kit, towels, water heater, karaoke, board/party games

🏝️ Facilities:
- Beach, wave pool, kiddie playground, sand bar (till 11PM), sky garden (7AM–10PM)
- Pool hours: 7AM–12PM, 2PM–7PM | Entrance ₱150
- Laundry (paid), 7/11, food stalls, BDO ATMs

🚗 Parking: ₱300/day | 🚭 Non-smoking: ₱2,000 penalty | 🐾 No pets allowed

📍 Attractions:
- SM Bicutan (5 min walk)
- NAIA Airport (20 min drive)
- Taxis available outside

🚨 Emergencies: Fire exit maps behind doors, use nearest stairwell.
`;

  const functions = [
    {
      name: "reserve",
      description: "Book a room for a user",
      parameters: {
        type: "object",
        properties: {
          roomType: { type: "string", enum: ["Single", "Double", "Suite"] },
          checkInRaw: { type: "string", description: "e.g. 'next Friday'" },
          nights: { type: "integer", minimum: 1 },
        },
        required: ["roomType", "checkInRaw", "nights"],
      },
    },
    {
      name: "updateReservation",
      description: "Update an existing reservation",
      parameters: {
        type: "object",
        properties: {
          bookingId: { type: "string" },
          checkIn: { type: "string", description: "New check-in date" },
          nights: { type: "integer", description: "New number of nights" },
        },
        required: ["bookingId"],
      },
    },
    {
      name: "cancelReservation",
      description: "Cancel a reservation by ID",
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
      description: "Check if a room is available for the given date",
      parameters: {
        type: "object",
        properties: {
          roomType: { type: "string", enum: ["Single", "Double", "Suite"] },
          checkInRaw: { type: "string", description: "e.g. 'next Saturday'" },
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
      return `❌ Unknown function: ${name}`;
    }
  }

  return choice.message.content;
}
