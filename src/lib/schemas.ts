import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  tourType: z.enum(['gem-explorer-day-tour', 'sapphire-trails-deluxe'], {
    required_error: "You need to select a tour type.",
  }),
  guests: z.coerce.number().int().min(1, { message: "Please enter at least 1 guest." }),
  date: z.date({
    required_error: "A date for your tour is required.",
  }),
  message: z.string().optional(),
});


const iconEnum = z.enum(['Leaf', 'Mountain', 'Bird', 'Home', 'Clock', 'CalendarDays', 'Ticket', 'Users', 'AlertTriangle', 'Gem', 'Waves', 'Landmark', 'Camera', 'Tent', 'Thermometer']);

export const locationFormSchema = z.object({
  // Basic info
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z.string().min(3, "Slug is required and must be unique (e.g., location-name).").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  cardDescription: z.string().min(10, "Card description must be at least 10 characters."),
  cardImage: z.string().url("Please enter a valid URL."),
  imageHint: z.string().min(2, "Image hint is required."),
  distance: z.string().min(2, "Distance is required."),

  // Hero
  subtitle: z.string().min(3, "Subtitle is required."),
  heroImage: z.string().url("Please enter a valid URL for the hero image."),
  heroImageHint: z.string().min(2, "Hero image hint is required."),

  // Intro
  introTitle: z.string().min(3, "Intro title is required."),
  introDescription: z.string().min(10, "Intro description is required."),
  introImageUrl: z.string().url("Please enter a valid URL for the intro image."),
  introImageHint: z.string().min(2, "Intro image hint is required."),
  
  // Gallery (4 images)
  galleryImages: z.array(z.object({
    src: z.string().url("Please enter a valid URL."),
    alt: z.string().min(3, "Alt text is required."),
    hint: z.string().min(2, "Hint is required."),
  })).length(4, "Please provide exactly 4 gallery images."),

  // Highlights (4 items)
  highlights: z.array(z.object({
    icon: iconEnum,
    title: z.string().min(3, "Highlight title is required."),
    description: z.string().min(10, "Highlight description is required."),
  })).length(4, "Please provide exactly 4 highlights."),

  // Visitor Info (4 items)
  visitorInfo: z.array(z.object({
    icon: iconEnum,
    title: z.string().min(3, "Visitor info title is required."),
    line1: z.string().min(3, "Line 1 is required."),
    line2: z.string().min(3, "Line 2 is required."),
  })).length(4, "Please provide exactly 4 visitor info items."),

  // Map & Nearby
  mapEmbedUrl: z.string().url("Please enter a valid map embed URL."),
  nearbyAttractions: z.array(z.object({
      icon: iconEnum,
      name: z.string().min(3, "Attraction name is required."),
      distance: z.string().min(2, "Distance is required."),
  })).length(3, "Please provide exactly 3 nearby attractions."),
});
