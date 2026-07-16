/** Shared contact details for marketing site. */
export const CONTACT_EMAIL = "info@bonero.tr";
export const CONTACT_PHONE_DISPLAY = "+90 531 961 43 48";
export const CONTACT_PHONE_TEL = "+905319614348";
export const CONTACT_CITY_TR = "İzmir, Konak";
export const CONTACT_CITY_EN = "Izmir, Konak";

/** Opens a compose window in the browser (mailto often does nothing without a mail app). */
export const CONTACT_EMAIL_HREF = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;

/** WhatsApp chat link for marketing CTAs and phone actions. */
export const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_TEL.replace("+", "")}`;
